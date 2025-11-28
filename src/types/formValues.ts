import { LatLngExpression } from "leaflet";

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

export interface EventFormValues extends Omit<BaseFormValues, "title"> {
    type: string;
    title: string;
    startDate: string;
    startTime: string;
    hasEndDate: boolean;
    endDate: string;
    hasEndTime: boolean;
    endTime: string;
}

export interface BusinessFormValues extends BaseFormValues {
    type: string;
    userType: "business" | "individual";
    workingHours: {
        start: string;
        end: string;
    }[];
    services: string[];
}
