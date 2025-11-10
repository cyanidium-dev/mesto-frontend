import { Event } from "@/types/event";
import { create } from "zustand";
import { mockEvents } from "@/data/mockEvents";

interface EventsStore {
    events: Event[];
    addEvent: (event: Event) => void;
    deleteEvent: (id: string) => void;
    getEvent: (id: string) => Event | null;
    getAllEvents: () => Event[];
    getEventsByFilters: (filters: EventsFilters) => Event[];
    initialized: boolean;
    initializeMockData: () => void;
}

interface EventsFilters {
    category?: string;
    languages?: string[];
    tags?: string[];
    startDate?: Date;
    endDate?: Date;
    startTime?: string;
    endTime?: string;
}

export const useEventsStore = create<EventsStore>((set, get) => ({
    events: [],
    initialized: false,
    initializeMockData: () => {
        if (get().initialized) return;
        set({ events: mockEvents, initialized: true });
    },
    addEvent: event => set(state => ({ events: [...state.events, event] })),
    deleteEvent: id => set(state => ({ events: state.events.filter(event => event.id !== id) })),
    getEvent: id => {
        const events = get().events;
        return events.find(event => event.id === id) || null;
    },
    getAllEvents: () => get().events,
    getEventsByFilters: filters => {
        const events = get().events;
        return events.filter(event => {
            return Object.entries(filters).every(([key, value]) => {
                if (key === "startDate" || key === "endDate") {
                    return event[key]?.getTime() === value?.getTime();
                }
                return event[key as keyof Event] === value;
            });
        });
    },
}));
