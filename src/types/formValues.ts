import { LatLngExpression } from "leaflet";

// Base form values that are common to both events and businesses
export interface BaseFormValues {
    [key: string]: unknown;
    category: string;
    languages: string[];
    tags: string[];
    title: string;
    position: LatLngExpression | null;
    description: string;
    socialLinks: string[];
    siteLink: string;
    imageUrls: string[];
}

// Event-specific form values
export interface EventFormValues extends BaseFormValues {
    type: string;
    startDate: string;
    startTime: string;
    hasEndDate: boolean;
    endDate: string;
    endTime: string;
}

// Business-specific form values
export interface BusinessFormValues extends BaseFormValues {
    type: string;
    userType: "company" | "individual";
    workingHours: {
        start: string;
        end: string;
    }[];
    services: string[];
}
