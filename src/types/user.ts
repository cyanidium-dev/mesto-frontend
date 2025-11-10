export interface User {
    id: string;
    email: string;
    name: string;
    title?: string; // category
    description?: string;
    imageUrls?: string[];
    socialMediaUrls?: string[];
    siteLink?: string;
    tags?: string[];
    profilePictureUrl?: string;
    birthDay: Date;
    city: string;
    gender: string;
    interests: string[];
    photoUrl: string;
}
