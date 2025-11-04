"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import List from "./List";
import { useLocationStore } from "@/store/locationStore";
import { useNearbyBusinesses } from "@/hooks/useNearbyBusinesses";
import { useEventsStore } from "@/store/eventsStore";
import { useBusinessStore } from "@/store/businessStore";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Main() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const userLocation = useLocationStore((s) => s.userLocation);
  const setUserLocation = useLocationStore((s) => s.setUserLocation);
  const mapCenter = useLocationStore((s) => s.mapCenter);
  const setMapCenter = useLocationStore((s) => s.setMapCenter);

  const initialized = useRef(false);

  const fakeBusinesses = useNearbyBusinesses();
  const savedBusinesses = useBusinessStore(s => s.getAllBusinesses());
  const savedEvents = useEventsStore(s => s.getAllEvents());
  const initializeBusinessMockData = useBusinessStore(s => s.initializeMockData);
  const initializeEventsMockData = useEventsStore(s => s.initializeMockData);

  // Initialize mock data on mount
  useEffect(() => {
    initializeBusinessMockData();
    initializeEventsMockData();
  }, [initializeBusinessMockData, initializeEventsMockData]);

  // Combine fake businesses with saved businesses
  const businesses = useMemo(() => {
    const combined = [...fakeBusinesses, ...savedBusinesses];
    console.log("🗺️ Map - Businesses:", combined.length);
    console.log("🗺️ Saved businesses:", savedBusinesses);
    console.log("🗺️ Saved businesses with images:", savedBusinesses.map(b => ({
      id: b.id,
      title: b.title,
      imageUrls: b.imageUrls,
      imageCount: b.imageUrls?.length || 0
    })));
    return combined;
  }, [fakeBusinesses, savedBusinesses]);

  useEffect(() => {
    console.log("🗺️ Map - Events:", savedEvents.length);
    console.log("🗺️ Saved events with images:", savedEvents.map(e => ({
      id: e.id,
      title: e.title,
      imageUrls: e.imageUrls,
      imageCount: e.imageUrls?.length || 0
    })));
  }, [savedEvents]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Якщо вже маємо userLocation — ставимо його як центр
    if (mapCenter[0] === 50.0755 && mapCenter[1] === 14.4378 && userLocation) {
      setMapCenter(userLocation);
    }

    if (mapCenter[0] === 50.0755 && mapCenter[1] === 14.4378 && !userLocation) {
      // Отримуємо геолокацію
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords: [number, number] = [
              pos.coords.latitude,
              pos.coords.longitude,
            ];
            setUserLocation(coords);
            setMapCenter(coords);
          },
          () => {
            // Якщо не вдалося — ставимо Прагу
            setMapCenter([50.0755, 14.4378]);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 10000,
          }
        );
      } else {
        // Якщо браузер не підтримує геолокацію — теж ставимо Прагу
        setMapCenter([50.0755, 14.4378]);
      }
    }
  }, [userLocation, mapCenter, setMapCenter, setUserLocation]);

  return (
    <>
      <SearchBar viewMode={viewMode} setViewMode={setViewMode} />
      {viewMode === "map" ? (
        <Map
          center={mapCenter}
          onCenterChange={setMapCenter}
          markers={businesses}
          events={savedEvents}
        />
      ) : (
        <List businesses={businesses} events={savedEvents} />
      )}
    </>
  );
}
