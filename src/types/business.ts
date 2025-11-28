import { LatLngExpression } from "leaflet";

export interface Business {
    id: string;
    userType: "business" | "individual";
    title?: string;
    description: string;
    imageUrls?: string[];
    location: LatLngExpression;
    category: string;
    languages: string[];
    tags: string[];
    workingHours?: ({
        start: string;
        end: string;
    } | null)[];
    socialMediaUrls?: string[];
    creatorId: string;
    services?: string[];
    siteLink?: string;
    calendlyUrl?: string;
}
