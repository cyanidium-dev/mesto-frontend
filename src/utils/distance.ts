import { LatLngExpression } from "leaflet";

export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371;
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

export function getCoordinates(
    location: LatLngExpression | null | undefined
): [number, number] | null {
    if (!location) return null;

    if (Array.isArray(location)) {
        return [location[0], location[1]];
    }

    if (typeof location === "object") {
        if ("lat" in location && "lng" in location) {
            return [location.lat, location.lng];
        }
        if ("toArray" in location && typeof (location as unknown as { toArray: () => [number, number] }).toArray === "function") {
            const arr = (location as unknown as { toArray: () => [number, number] }).toArray();
            return [arr[0], arr[1]];
        }
    }

    return null;
}
