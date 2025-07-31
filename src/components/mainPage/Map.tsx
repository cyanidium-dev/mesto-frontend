"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocateIcon from "../shared/icons/LocateIcon";
import { Business } from "@/types/business";

interface MapProps {
  center: [number, number];
  onCenterChange: (center: [number, number]) => void;
  userLocation: [number, number] | null;
  markers: Business[];
}

// Компонент, що плавно оновлює центр карти через API leaflet
function UpdateMapCenter({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

// Обробник подій карти з фільтрацією оновлень центру
function MapEventsHandler({
  onCenterChange,
  center,
}: {
  onCenterChange: (center: [number, number]) => void;
  center: [number, number];
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
      map.closePopup(); // Закриває відкриті попапи при кліку на карту
    },
    dragstart() {
      map.closePopup(); // Закриває відкриті попапи при переміщенні карти
    },
  });

  return null;
}

export default function Map({
  center,
  onCenterChange,
  userLocation,
  markers,
}: MapProps) {
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

  return (
    <div className="relative max-w-[440px]">
      <MapContainer
        center={center}
        zoom={15}
        className="h-[100dvh] w-full z-0"
        style={{
          filter: "brightness(1.05) saturate(1.4) contrast(0.9)",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <UpdateMapCenter center={center} />
        <MapEventsHandler onCenterChange={onCenterChange} center={center} />

        {/* Маркери бізнесів */}
        {markers.map((business) => {
          const icon = L.divIcon({
            className: "", // прибираємо базові класи leaflet
            html: `
      <div class="relative">
        <svg width="46" height="53" viewBox="0 0 46 53" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path d="M18.6699 42.5L27.3301 42.5L23 50.001L18.6699 42.5Z" fill="#155DFC" stroke="#155DFC" stroke-width="3"/>
        <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" stroke="#155DFC" stroke-width="3"/>
        <rect x="3" y="3" width="40" height="40" rx="20" fill="url(#pattern0_410_17547)"/>
        <defs>
        <img src="${business.imageUrl}" alt="business" class="absolute top-[3px] left-[3px] object-cover w-10 h-10 rounded-full" />
        <pattern id="pattern0_410_17547" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_410_17547" transform="scale(0.00333333)"/>
        </pattern>
        </defs>
        </svg>
      </div>
    `,
            iconSize: [40, 40],
            iconAnchor: [20, 40], // точка, яка буде на координаті
            popupAnchor: [0, -40],
          });

          return (
            <Marker key={business.id} position={business.position} icon={icon}>
              <Popup>
                <div className="text-sm">
                  <strong>{business.title}</strong>
                  <p>{business.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="pointer-events-none absolute inset-0 bg-[rgba(173,216,230,0.3)] mix-blend-multiply z-[1]" />

      <button
        onClick={handleGeolocate}
        aria-label="Locate my position"
        className="absolute bottom-[72px] right-4 z-[50] flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-md border-none p-0 cursor-pointer active:brightness-125 transition duration-300 ease-in-out"
      >
        <LocateIcon />
      </button>
    </div>
  );
}
