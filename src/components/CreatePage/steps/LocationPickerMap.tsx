"use client";

import { useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    useMap,
    useMapEvents,
    Marker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LocationPickerMapProps {
    center: [number, number];
    selectedPosition: [number, number] | null;
    onPositionSelect: (position: [number, number]) => void;
    onCenterChange?: (center: [number, number]) => void;
}

function UpdateMapCenter({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, map.getZoom());
        }
    }, [center, map]);

    return null;
}

function MapClickHandler({
    onPositionSelect,
    onCenterChange,
    center,
}: {
    onPositionSelect: (position: [number, number]) => void;
    onCenterChange?: (center: [number, number]) => void;
    center: [number, number];
}) {
    const prevCenterRef = useRef(center);
    const map = useMap();

    useEffect(() => {
        prevCenterRef.current = center;
    }, [center]);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onPositionSelect([lat, lng]);
        },
        moveend(e) {
            if (onCenterChange) {
                const newCenter = e.target.getCenter();
                const prevCenter = prevCenterRef.current;
                const distance = map.distance(
                    L.latLng(prevCenter[0], prevCenter[1]),
                    L.latLng(newCenter.lat, newCenter.lng)
                );

                if (distance > 10) {
                    const newCenterTuple: [number, number] = [
                        newCenter.lat,
                        newCenter.lng,
                    ];
                    prevCenterRef.current = newCenterTuple;
                    onCenterChange(newCenterTuple);
                }
            }
        },
    });

    return null;
}

export default function LocationPickerMap({
    center,
    selectedPosition,
    onPositionSelect,
    onCenterChange,
}: LocationPickerMapProps) {
    return (
        <MapContainer
            center={center}
            zoom={17}
            className="h-full w-full z-0"
            style={{
                filter: "brightness(1.05) saturate(1.4) contrast(0.9)",
            }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <UpdateMapCenter center={center} />
            <MapClickHandler
                onPositionSelect={onPositionSelect}
                onCenterChange={onCenterChange}
                center={center}
            />
            {selectedPosition && (
                <Marker
                    position={selectedPosition}
                    icon={L.icon({
                        iconUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
                        iconRetinaUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
                        shadowUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                    })}
                />
            )}
        </MapContainer>
    );
}

