import { Event } from "@/types/event";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockEvents } from "@/data/mockEvents";
import { cleanupEventStorage } from "@/utils/storageCleanup";

const isUserCreatedEvent = (id: string): boolean => {
    const mockPattern = /^event-(\d+)$/;
    const match = id.match(mockPattern);
    if (match) {
        const num = parseInt(match[1], 10);
        return num >= 1000000000000;
    }
    return true;
};

interface EventsStore {
    userCreatedEvents: Event[];
    addEvent: (event: Event) => void;
    updateEvent: (id: string, event: Partial<Event>) => void;
    deleteEvent: (id: string) => void;
    getEvent: (id: string) => Event | null;
    getAllEvents: () => Event[];
    getEventsByFilters: (filters: EventsFilters) => Event[];
    updateEventAttendees: (
        eventId: string,
        userId: string,
        quantity?: number
    ) => void;
    updateEventBookingCount: (eventId: string, quantity: number) => void;
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

export const useEventsStore = create<EventsStore>()(
    persist(
        (set, get) => ({
            userCreatedEvents: [],
            initialized: false,
            initializeMockData: () => {
                if (get().initialized) return;
                set({ initialized: true });
            },
            addEvent: event => {
                if (isUserCreatedEvent(event.id)) {
                    set(state => ({ 
                        userCreatedEvents: [...state.userCreatedEvents, event] 
                    }));
                }
            },
            updateEvent: (id, updatedEvent) => {
                if (isUserCreatedEvent(id)) {
                    set(state => ({
                        userCreatedEvents: state.userCreatedEvents.map(event =>
                            event.id === id ? { ...event, ...updatedEvent } : event
                        ),
                    }));
                }
            },
            deleteEvent: id => {
                if (isUserCreatedEvent(id)) {
                    set(state => ({
                        userCreatedEvents: state.userCreatedEvents.filter(event => event.id !== id),
                    }));
                }
            },
            getEvent: id => {
                const mockEvent = mockEvents.find(e => e.id === id);
                if (mockEvent) return mockEvent;
                
                const userCreated = get().userCreatedEvents;
                return userCreated.find(event => event.id === id) || null;
            },
            getAllEvents: () => {
                return [...mockEvents, ...get().userCreatedEvents];
            },
            getEventsByFilters: filters => {
                const allEvents = get().getAllEvents();
                return allEvents.filter(event => {
                    return Object.entries(filters).every(([key, value]) => {
                        if (key === "startDate" || key === "endDate") {
                            return event[key]?.getTime() === value?.getTime();
                        }
                        return event[key as keyof Event] === value;
                    });
                });
            },
            updateEventAttendees: (eventId, userId, quantity = 1) => {
                const allEvents = get().getAllEvents();
                const event = allEvents.find(e => e.id === eventId);
                if (!event) return;
                
                const newAttendees = [...event.attendees];
                for (let i = 0; i < quantity; i++) {
                    if (!newAttendees.includes(userId)) {
                        newAttendees.push(userId);
                    }
                }
                
                if (isUserCreatedEvent(eventId)) {
                    set(state => ({
                        userCreatedEvents: state.userCreatedEvents.map(event =>
                            event.id === eventId
                                ? { ...event, attendees: newAttendees }
                                : event
                        ),
                    }));
                }
            },
            updateEventBookingCount: (eventId, quantity) => {
                const allEvents = get().getAllEvents();
                const event = allEvents.find(e => e.id === eventId);
                if (!event) return;
                
                if (isUserCreatedEvent(eventId)) {
                    set(state => ({
                        userCreatedEvents: state.userCreatedEvents.map(event =>
                            event.id === eventId
                                ? {
                                      ...event,
                                      bookingCount:
                                          (event.bookingCount || 0) + quantity,
                                  }
                                : event
                        ),
                    }));
                }
            },
        }),
        {
            name: "events-storage",
            partialize: state => ({
                userCreatedEvents: state.userCreatedEvents,
            }),

            storage: {
                getItem: name => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    try {
                        const parsed = JSON.parse(str);
                        return cleanupEventStorage(parsed);
                    } catch (error) {
                        console.error(
                            "Error parsing events from localStorage:",
                            error
                        );
                        return null;
                    }
                },
                setItem: (name, value) => {
                    try {
                        const cleaned = cleanupEventStorage(JSON.parse(JSON.stringify(value)));
                        localStorage.setItem(name, JSON.stringify(cleaned));
                    } catch (error) {
                        console.error(
                            "Error saving events to localStorage:",
                            error
                        );
                    }
                },
                removeItem: name => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);
