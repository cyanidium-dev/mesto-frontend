export interface Booking {
    id: string;
    eventId: string;
    userId: string;
    quantity: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    preferences: {
        otherEvents: boolean;
        similarEvents: boolean;
        termsAccepted: boolean;
    };
}

