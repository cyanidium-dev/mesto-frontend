"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import List from "./List";

const Map = dynamic(() => import("./Map"), {
  ssr: false, // виключає серверний рендеринг для цього компонента
});

export default function Main() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    41.5463, 2.1086,
  ]);

  // Отримати геолокацію при першому завантаженні, встановити userLocation і лише якщо mapCenter дефолтний — оновити його
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setUserLocation(coords);

        setMapCenter((currentCenter) => {
          // Якщо центр карти ще дефолтний, оновлюємо на userLocation
          // Інакше залишаємо як є (щоб не скидати, якщо користувач уже змінив центр)
          const defaultCenter = [41.5463, 2.1086];
          const isDefaultCenter =
            currentCenter[0] === defaultCenter[0] &&
            currentCenter[1] === defaultCenter[1];

          return isDefaultCenter ? coords : currentCenter;
        });
      });
    }
  }, []);

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
