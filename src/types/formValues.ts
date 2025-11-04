import { LatLngExpression } from "leaflet";

// Base form values that are common to both events and businesses
export interface BaseFormValues {
    category: string;
    languages: string[];
    tags: string[];
    title?: string;
    position: LatLngExpression | null;
    description: string;
    socialMediaUrls: string[];
    siteLink: string;
    imageUrls: string[];
}

// Event-specific form values
export interface EventFormValues extends Omit<BaseFormValues, "title"> {
    type: string;
    title: string; // Required for events
    startDate: string;
    startTime: string;
    hasEndDate: boolean;
    endDate: string;
    hasEndTime: boolean;
    endTime: string;
}

// Business-specific form values
export interface BusinessFormValues extends BaseFormValues {
    type: string;
    userType: "business" | "individual";
    workingHours: {
        start: string;
        end: string;
    }[];
    services: string[];
}
