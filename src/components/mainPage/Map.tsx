"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocateIcon from "../shared/icons/LocateIcon";

interface MapProps {
  center: [number, number];
  onCenterChange: (center: [number, number]) => void;
  userLocation: [number, number] | null;
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

  useMapEvents({
    moveend(e) {
      const map = e.target;
      const newCenter = map.getCenter();

      const prevCenter = prevCenterRef.current;
      const distance = map.distance(
        L.latLng(prevCenter[0], prevCenter[1]),
        L.latLng(newCenter.lat, newCenter.lng)
      );

      // Оновлюємо центр, тільки якщо зміна більше 10 метрів
      if (distance > 10) {
        prevCenterRef.current = [newCenter.lat, newCenter.lng];
        onCenterChange([newCenter.lat, newCenter.lng]);
        console.log(center);
      }
    },
  });

  return null;
}

export default function Map({ center, onCenterChange }: MapProps) {
  // Кнопка "геолокація"
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
        zoom={14}
        className="h-[100dvh] w-full z-0"
        style={{
          filter: "brightness(1.05) saturate(1.4) contrast(0.9)",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UpdateMapCenter center={center} />
        <MapEventsHandler onCenterChange={onCenterChange} center={center} />
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
