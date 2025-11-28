import { Event } from "@/types/event";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockEvents } from "@/data/mockEvents";

interface EventsStore {
    events: Event[];
    addEvent: (event: Event) => void;
    deleteEvent: (id: string) => void;
    getEvent: (id: string) => Event | null;
    getAllEvents: () => Event[];
    getEventsByFilters: (filters: EventsFilters) => Event[];
    updateEventAttendees: (eventId: string, userId: string, quantity?: number) => void;
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
            events: [],
            initialized: false,
            initializeMockData: () => {
                if (get().initialized) return;
                const state = get();
                // Only initialize if there's no persisted data
                if (state.events.length === 0) {
                    set({ events: mockEvents, initialized: true });
                } else {
                    set({ initialized: true });
                }
            },
            addEvent: event => set(state => ({ events: [...state.events, event] })),
            deleteEvent: id =>
                set(state => ({
                    events: state.events.filter(event => event.id !== id),
                })),
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
            updateEventAttendees: (eventId, userId, quantity = 1) => {
                set(state => ({
                    events: state.events.map(event => {
                        if (event.id === eventId) {
                            const newAttendees = [...event.attendees];
                            for (let i = 0; i < quantity; i++) {
                                if (!newAttendees.includes(userId)) {
                                    newAttendees.push(userId);
                                }
                            }
                            return { ...event, attendees: newAttendees };
                        }
                        return event;
                    }),
                }));
            },
        }),
        {
            name: "events-storage",
            partialize: state => ({
                events: state.events,
            }),
            // Handle Date serialization/deserialization
            storage: {
                getItem: name => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    try {
                        const parsed = JSON.parse(str);
                        if (parsed.state?.events && Array.isArray(parsed.state.events)) {
                            // Convert date strings back to Date objects
                            parsed.state.events = parsed.state.events.map(
                                (event: any) => ({
                                    ...event,
                                    startDate: event.startDate
                                        ? new Date(event.startDate)
                                        : undefined,
                                    endDate: event.endDate
                                        ? new Date(event.endDate)
                                        : undefined,
                                })
                            );
                        }
                        return parsed;
                    } catch (error) {
                        console.error("Error parsing events from localStorage:", error);
                        return null;
                    }
                },
                setItem: (name, value) => {
                    try {
                        localStorage.setItem(name, JSON.stringify(value));
                    } catch (error) {
                        console.error("Error saving events to localStorage:", error);
                    }
                },
                removeItem: name => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);
