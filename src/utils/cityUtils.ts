import { CITIES } from "@/constants/filters";
import { getCoordinates } from "./distance";
import { LatLngExpression } from "leaflet";

export const CITY_COORDINATES: Record<string, [number, number]> = {
    Barcelona: [41.3851, 2.1734],
    Madrid: [40.4168, -3.7038],
    Prague: [50.0755, 14.4378],
    Berlin: [52.52, 13.405],
    Paris: [48.8566, 2.3522],
    London: [51.5074, -0.1278],
    Amsterdam: [52.3676, 4.9041],
    Vienna: [48.2082, 16.3738],
    Rome: [41.9028, 12.4964],
    Lisbon: [38.7223, -9.1393],
    Warsaw: [52.2297, 21.0122],
    Budapest: [47.4979, 19.0402],
};

const CITY_RADIUS_KM = 30;

function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function getCityFromCoordinates(
    location: LatLngExpression | null | undefined
): string | null {
    const coords = getCoordinates(location);
    if (!coords) return null;

    const [lat, lon] = coords;

    for (const cityKey of CITIES.map(c => c.key)) {
        const cityCoords = CITY_COORDINATES[cityKey];
        if (!cityCoords) continue;

        const distance = calculateDistance(
            lat,
            lon,
            cityCoords[0],
            cityCoords[1]
        );

        if (distance <= CITY_RADIUS_KM) {
            return cityKey;
        }
    }

    return null;
}

export function isLocationInCities(
    location: LatLngExpression | null | undefined,
    cityKeys: string[]
): boolean {
    if (cityKeys.length === 0) return true;

    const itemCity = getCityFromCoordinates(location);
    if (!itemCity) return false;

    return cityKeys.includes(itemCity);
}

