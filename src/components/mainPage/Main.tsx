"use client";

import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import List from "./List";
import { useLocationStore } from "@/store/locationStore";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Main() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const userLocation = useLocationStore((s) => s.userLocation);
  const setUserLocation = useLocationStore((s) => s.setUserLocation);
  const mapCenter = useLocationStore((s) => s.mapCenter);
  const setMapCenter = useLocationStore((s) => s.setMapCenter);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Якщо userLocation вже є в сторі (persisted), то просто встановлюємо центр карти
    if (userLocation) {
      // Встановлюємо центр карти лише, якщо він ще дефолтний
      const defaultCenter: [number, number] = [50.0755, 14.4378];
      const isDefaultCenter =
        mapCenter[0] === defaultCenter[0] && mapCenter[1] === defaultCenter[1];

      if (isDefaultCenter) {
        setMapCenter(userLocation);
      }
      return; // немає потреби заново запитувати геолокацію
    }

    // Якщо userLocation відсутній, запитуємо геолокацію
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setUserLocation(coords);

          const defaultCenter: [number, number] = [50.0755, 14.4378];
          const isDefaultCenter =
            mapCenter[0] === defaultCenter[0] &&
            mapCenter[1] === defaultCenter[1];

          if (isDefaultCenter) {
            setMapCenter(coords);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        }
      );
    }
  }, [userLocation, mapCenter, setMapCenter, setUserLocation]);

  return (
    <>
      <SearchBar viewMode={viewMode} setViewMode={setViewMode} />
      {viewMode === "map" ? (
        <Map
          center={mapCenter}
          onCenterChange={setMapCenter}
          userLocation={userLocation}
        />
      ) : (
        <List />
      )}
    </>
  );
}
