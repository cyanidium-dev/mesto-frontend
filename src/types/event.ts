import { LatLngExpression } from "leaflet";

export interface Event {
    id: string;
    category: string;
    subcategory?: string;
    languages: string[];
    tags?: string[];
    title: string;
    description?: string;
    imageUrls?: string[];
    socialMediaUrls?: string[];
    location: LatLngExpression;
    startDate: Date;
    startTime: string;
    endDate?: Date;
    endTime?: string;
    creatorId: string;
    attendees: string[];
    maxAttendees?: number;
    bookingCount?: number;
    isRepetitive?: boolean;
    repeatedTimes?: number;
    siteLink?: string;
}
