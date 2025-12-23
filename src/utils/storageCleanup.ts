import { Business } from "@/types/business";
import { Event } from "@/types/event";

const isUserCreatedBusiness = (id: string): boolean => {
    const mockPattern = /^business-(\d+)$|^business-individual-\d+$/;
    if (mockPattern.test(id)) {
        const match = id.match(/^business-(\d+)$/);
        if (match) {
            const num = parseInt(match[1], 10);
            return num >= 1000000000000;
        }
        return false;
    }
    return true;
};

const isUserCreatedEvent = (id: string): boolean => {
    const mockPattern = /^event-(\d+)$/;
    const match = id.match(mockPattern);
    if (match) {
        const num = parseInt(match[1], 10);
        return num >= 1000000000000;
    }
    return true;
};

export const cleanupBusinessStorage = (parsed: any): any => {
    if (!parsed || !parsed.state) return parsed;

    if (parsed.state.businesses && Array.isArray(parsed.state.businesses)) {
        const userCreated = parsed.state.businesses.filter((business: Business) => 
            isUserCreatedBusiness(business.id)
        );
        parsed.state.userCreatedBusinesses = userCreated;
        delete parsed.state.businesses;
    }

    if (parsed.state.userCreatedBusinesses && Array.isArray(parsed.state.userCreatedBusinesses)) {
        parsed.state.userCreatedBusinesses = parsed.state.userCreatedBusinesses.filter(
            (business: Business) => isUserCreatedBusiness(business.id)
        );
    }

    return parsed;
};

export const cleanupEventStorage = (parsed: any): any => {
    if (!parsed || !parsed.state) return parsed;

    if (parsed.state.events && Array.isArray(parsed.state.events)) {
        const userCreated = parsed.state.events.filter((event: Event) => 
            isUserCreatedEvent(event.id)
        );
        parsed.state.userCreatedEvents = userCreated.map(
            (event: Event & { startDate?: string | Date; endDate?: string | Date }) => {
                return {
                    ...event,
                    startDate: event.startDate
                        ? new Date(event.startDate as string)
                        : undefined,
                    endDate: event.endDate
                        ? new Date(event.endDate as string)
                        : undefined,
                } as Event;
            }
        );
        delete parsed.state.events;
    }

    if (parsed.state.userCreatedEvents && Array.isArray(parsed.state.userCreatedEvents)) {
        parsed.state.userCreatedEvents = parsed.state.userCreatedEvents
            .filter((event: Event) => isUserCreatedEvent(event.id))
            .map(
                (event: Event & { startDate?: string | Date; endDate?: string | Date }) => {
                    return {
                        ...event,
                        startDate: event.startDate
                            ? new Date(event.startDate as string)
                            : undefined,
                        endDate: event.endDate
                            ? new Date(event.endDate as string)
                            : undefined,
                    } as Event;
                }
            );
    }

    return parsed;
};

