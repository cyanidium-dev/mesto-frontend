"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocateIcon from "../shared/icons/LocateIcon";

interface MapProps {
  center: [number, number];
  onCenterChange: (center: [number, number]) => void;
  userLocation: [number, number] | null;
}

function MapEventsHandler({
  onCenterChange,
}: {
  onCenterChange: (center: [number, number]) => void;
}) {
  useMapEvents({
    moveend(e) {
      const map = e.target;
      const center = map.getCenter();
      console.log("moveend", center);
      onCenterChange([center.lat, center.lng]);
    },
  });
  return null;
}

export default function Map({ center, onCenterChange }: MapProps) {
  
  // Кнопка "геолокація"
  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const position: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        onCenterChange(position);
      });
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
        key={center.join(",")}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEventsHandler onCenterChange={onCenterChange} />
      </MapContainer>

      <div className="pointer-events-none absolute inset-0 bg-[rgba(173,216,230,0.5)] mix-blend-multiply z-[1]" />

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
