import { LatLngExpression } from "leaflet";

// Calculate distance between two coordinates using Haversine formula
// Returns distance in kilometers
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

// Extract coordinates from LatLngExpression
// LatLngExpression can be: [number, number] | [number, number, number] | { lat: number; lng: number } | LatLng
export function getCoordinates(
    location: LatLngExpression | null | undefined
): [number, number] | null {
    if (!location) return null;

    if (Array.isArray(location)) {
        // Handle tuple format [lat, lng] or [lat, lng, alt]
        return [location[0], location[1]];
    }

    if (typeof location === "object") {
        // Handle { lat: number; lng: number } or LatLng object
        if ("lat" in location && "lng" in location) {
            return [location.lat, location.lng];
        }
        // Handle LatLng class instance (has methods like toArray)
        if (typeof location.toArray === "function") {
            const arr = location.toArray();
            return [arr[0], arr[1]];
        }
    }

    return null;
}
