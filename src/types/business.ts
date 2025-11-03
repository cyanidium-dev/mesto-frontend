import { LatLngExpression } from "leaflet";

export interface Business {
    id: string;
    userType: "business" | "individual";
    title?: string;
    description: string;
    imageUrls: string[];
    position: LatLngExpression;
    category: string;
    languages: string[];
    tags: string[];
    workingHours: {
        start: string;
        end: string;
    }[];
    socialMediaUrls?: string[];
    creatorId: string;
    services?: string[];
    siteLink?: string;
}
