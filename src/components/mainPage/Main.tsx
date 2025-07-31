"use client";

import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import List from "./List";
import { useLocationStore } from "@/store/locationStore";
import { useNearbyBusinesses } from "@/hooks/useNearbyBusinesses";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Main() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const userLocation = useLocationStore((s) => s.userLocation);
  const setUserLocation = useLocationStore((s) => s.setUserLocation);
  const mapCenter = useLocationStore((s) => s.mapCenter);
  const setMapCenter = useLocationStore((s) => s.setMapCenter);

  const initialized = useRef(false);

  const businesses = useNearbyBusinesses();

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
          (error) => {
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
  }, [userLocation]);

  return (
    <>
      <SearchBar viewMode={viewMode} setViewMode={setViewMode} />
      {viewMode === "map" ? (
        <Map
          center={mapCenter}
          onCenterChange={setMapCenter}
          markers={businesses}
        />
      ) : (
        <List />
      )}
    </>
  );
}
