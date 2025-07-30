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
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setUserLocation(coords);

          alert(`User location ${coords}`);

          setMapCenter((currentCenter) => {
            const defaultCenter = [41.5463, 2.1086];
            const isDefaultCenter =
              currentCenter[0] === defaultCenter[0] &&
              currentCenter[1] === defaultCenter[1];

            return isDefaultCenter ? coords : currentCenter;
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Можна додати UI повідомлення користувачу, якщо потрібно
        },
        {
          enableHighAccuracy: false, // зменшуємо точність для швидшого визначення
          timeout: 15000, // збільшуємо таймаут до 15 секунд
          maximumAge: 60000, // дозволяємо використовувати кешовану позицію до 1 хвилини
        }
      );
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
