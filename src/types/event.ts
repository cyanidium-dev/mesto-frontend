import { LatLngExpression } from "leaflet";

export interface Event {
    id: string;
    category: string;
    languages: string[];
    tags: string[];
    title: string;
    description?: string;
    imageUrls?: string[];
    socialMediaUrls?: string[];
    position: LatLngExpression;
    startDate: Date;
    startTime?: string;
    endDate?: Date;
    endTime?: string;
    creatorId: string;
    attendees: string[];
    maxAttendees?: number;
    isRepetitive?: boolean;
    repeatedTimes?: number;
    siteLink?: string;
}
