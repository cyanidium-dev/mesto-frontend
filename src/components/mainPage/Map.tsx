"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import type { MarkerCluster } from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";

import MarkerClusterGroup from "react-leaflet-markercluster";

import LocateIcon from "../shared/icons/LocateIcon";
import MapBottomSheet from "./MapBottomSheet";
import { Business } from "@/types/business";
import { Event } from "@/types/event";

interface MapProps {
  center: [number, number];
  onCenterChange: (center: [number, number]) => void;
  markers: Business[];
  events?: Event[];
  selectedItemId?: string | null;
}

function UpdateMapCenter({ center, zoom }: { center: [number, number]; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom ?? map.getZoom());
    }
  }, [center, zoom, map]);

  return null;
}

function MapEventsHandler({
  onCenterChange,
  center,
  onMapClick,
}: {
  onCenterChange: (center: [number, number]) => void;
  center: [number, number];
  onMapClick?: () => void;
}) {
  const prevCenterRef = useRef(center);
  const map = useMap();

  useEffect(() => {
    prevCenterRef.current = center;
  }, [center]);

  useMapEvents({
    moveend(e) {
      const newCenter = e.target.getCenter();
      const prevCenter = prevCenterRef.current;

      const distance = map.distance(
        L.latLng(prevCenter[0], prevCenter[1]),
        L.latLng(newCenter.lat, newCenter.lng)
      );

      if (distance > 10) {
        prevCenterRef.current = [newCenter.lat, newCenter.lng];
        onCenterChange([newCenter.lat, newCenter.lng]);
      }
    },
    click() {
      onMapClick?.();
    },
    dragstart() {
      onMapClick?.();
    },
  });

  return null;
}

export default function Map({ center, onCenterChange, markers, events = [], selectedItemId }: MapProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<Business | Event | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Handle selected item from props (e.g., from "show on map" button)
  useEffect(() => {
    if (selectedItemId) {
      const allItems = [...markers, ...events];
      const item = allItems.find(i => i.id === selectedItemId);
      if (item) {
        if (item.id !== selectedItem?.id) {
          // Only update if it's a different item
          setSelectedItem(item);
        }
        // Always open the sheet if selectedItemId is set
        setIsBottomSheetOpen(true);
      }
    } else if (!selectedItemId && selectedItem) {
      // If selectedItemId is cleared, close the bottom sheet
      setIsBottomSheetOpen(false);
      setSelectedItem(null);
    }
  }, [selectedItemId, markers, events, selectedItem]);

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const position: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          onCenterChange(position);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Не вдалося визначити вашу позицію.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  };

  const handleMarkerClick = (item: Business | Event) => {
    setSelectedItem(item);
    setIsBottomSheetOpen(true);
    // Update URL to include focus parameter for consistency
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("focus", item.id);
    if (!newParams.has("view")) {
      newParams.set("view", "map");
    }
    router.push(`/main?${newParams.toString()}`, { scroll: false });
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedItem(null);
    // Clear the focus parameter from URL when closing
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("focus");
    router.push(`/main?${newParams.toString()}`, { scroll: false });
  };

  const handleMapClick = () => {
    handleCloseBottomSheet();
  };

  return (
    <div className="relative max-w-[440px]">
      <MapContainer
        center={center}
        zoom={17}
        className="h-[100dvh] w-full z-0"
        style={{
          filter: "brightness(1.05) saturate(1.4) contrast(0.9)",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <UpdateMapCenter center={center} />
        <MapEventsHandler 
          onCenterChange={onCenterChange} 
          center={center} 
          onMapClick={handleMapClick}
        />

        {/* Використовуємо MarkerClusterGroup для кластеризації */}
        <MarkerClusterGroup
          iconCreateFunction={(cluster: MarkerCluster) => {
            const count = cluster.getChildCount();

            return L.divIcon({
              html: `
         <div class="relative">
                  <svg width="46" height="53" viewBox="0 0 46 53" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M18.6699 42.5L27.3301 42.5L23 50.001L18.6699 42.5Z" fill="#155DFC" stroke="#155DFC" stroke-width="3"/>
                    <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" stroke="#155DFC" stroke-width="3"/>
                    <rect x="3" y="3" width="40" height="40" rx="20" fill="url(#pattern0_410_17547)"/>
                    <defs>
           <div class="absolute top-[3px] left-[3px] flex items-center justify-center w-10 h-10 bg-primary rounded-full text-white text-[16px] font-medium"> 
              ${count}
           </div>
                      <pattern id="pattern0_410_17547" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_410_17547" transform="scale(0.00333333)"/>
                      </pattern>
                    </defs>
                  </svg>
                </div>
      `,
              className: "",
              iconSize: [46, 53],
              iconAnchor: [23, 53],
              popupAnchor: [0, -46],
            });
          }}
        >
          {markers.map((business) => {
            // Get first available image from array (user can upload to any of 8 slots)
            const businessImageUrl = business.imageUrls?.find(url => 
              url && (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/"))
            );
            const hasValidImage = businessImageUrl && 
              (businessImageUrl.startsWith("http") || 
               businessImageUrl.startsWith("data:") || 
               businessImageUrl.startsWith("/"));
            const imageUrl = hasValidImage ? businessImageUrl : "/images/mockedData/girl.jpg";
            
            // Debug logging
            if (business.id.startsWith("business-")) {
              console.log(`🗺️ Business ${business.id}:`, {
                imageUrls: business.imageUrls,
                foundUrl: businessImageUrl?.substring(0, 50) + "...",
                usingUrl: imageUrl.substring(0, 50) + "...",
                isDataUrl: imageUrl.startsWith("data:")
              });
            }
            
            // Escape image URL for use in HTML/SVG
            const escapedImageUrl = imageUrl.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            const patternId = `pattern-business-${business.id}`;
            
            const icon = L.divIcon({
              className: "",
              html: `
                <div style="position: relative; width: 46px; height: 53px;">
                  <svg width="46" height="53" viewBox="0 0 46 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6699 42.5L27.3301 42.5L23 50.001L18.6699 42.5Z" fill="#155DFC" stroke="#155DFC" stroke-width="3"/>
                    <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" stroke="#155DFC" stroke-width="3"/>
                    <rect x="3" y="3" width="40" height="40" rx="20" fill="url(#${patternId})"/>
                    <defs>
                      <pattern id="${patternId}" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <image href="${escapedImageUrl}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" onerror="this.href='/images/mockedData/girl.jpg'"/>
                      </pattern>
                    </defs>
                  </svg>
                </div>
              `,
              iconSize: [46, 53],
              iconAnchor: [23, 53],
              popupAnchor: [0, -53],
            });

            return (
              <Marker
                key={business.id}
                position={business.location as [number, number]}
                icon={icon}
                eventHandlers={{
                  click: () => handleMarkerClick(business),
                }}
              />
            );
          })}
          {events.map((event) => {
            // Get first available image from array (user can upload to any of 8 slots)
            const eventImageUrl = event.imageUrls?.find(url => 
              url && (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/"))
            );
            const hasValidImage = eventImageUrl && 
              (eventImageUrl.startsWith("http") || 
               eventImageUrl.startsWith("data:") || 
               eventImageUrl.startsWith("/"));
            const imageUrl = hasValidImage ? eventImageUrl : "/images/mockedData/girl.jpg";
            
            // Debug logging
            console.log(`🗺️ Event ${event.id}:`, {
              imageUrls: event.imageUrls,
              foundUrl: eventImageUrl?.substring(0, 50) + "...",
              usingUrl: imageUrl.substring(0, 50) + "...",
              isDataUrl: imageUrl.startsWith("data:")
            });
            
            // Escape image URL for use in HTML/SVG
            const escapedImageUrl = imageUrl.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            const patternId = `pattern-event-${event.id}`;
            
            const icon = L.divIcon({
              className: "",
              html: `
                <div style="position: relative; width: 46px; height: 53px;">
                  <svg width="46" height="53" viewBox="0 0 46 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6699 42.5L27.3301 42.5L23 50.001L18.6699 42.5Z" fill="#FF6B35" stroke="#FF6B35" stroke-width="3"/>
                    <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" stroke="#FF6B35" stroke-width="3"/>
                    <rect x="3" y="3" width="40" height="40" rx="20" fill="url(#${patternId})"/>
                    <defs>
                      <pattern id="${patternId}" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <image href="${escapedImageUrl}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice" onerror="this.href='/images/mockedData/girl.jpg'"/>
                      </pattern>
                    </defs>
                  </svg>
                </div>
              `,
              iconSize: [46, 53],
              iconAnchor: [23, 53],
              popupAnchor: [0, -53],
            });

            const eventDate = event.startDate
              ? new Date(event.startDate).toLocaleDateString("ru-RU")
              : "";
            const eventTime = event.startTime || "";

            return (
              <Marker
                key={event.id}
                position={event.location as [number, number]}
                icon={icon}
                eventHandlers={{
                  click: () => handleMarkerClick(event),
                }}
              />
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      <div className="pointer-events-none absolute inset-0 bg-[rgba(173,216,230,0.1)] mix-blend-multiply z-[1]" />

      <button
        onClick={handleGeolocate}
        aria-label="Locate my position"
        className="absolute bottom-[72px] right-4 z-[50] flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-md border-none p-0 cursor-pointer active:brightness-125 transition duration-300 ease-in-out"
      >
        <LocateIcon />
      </button>

      {/* Bottom Sheet */}
      <MapBottomSheet
        item={selectedItem}
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
    </div>
  );
}
