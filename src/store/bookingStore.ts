import { Booking } from "@/types/booking";
import { create } from "zustand";

interface BookingStore {
    bookings: Booking[];
    initialized: boolean;
    
    addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking;
    getBooking: (id: string) => Booking | null;
    getBookingsByEvent: (eventId: string) => Booking[];
    getBookingsByUser: (userId: string) => Booking[];
    getAllBookings: () => Booking[];
    deleteBooking: (id: string) => void;
    initializeMockData: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
    bookings: [],
    initialized: false,
    
    addBooking: (bookingData) => {
        const newBooking: Booking = {
            ...bookingData,
            id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
        };
        set(state => ({ bookings: [...state.bookings, newBooking] }));
        return newBooking;
    },
    
    getBooking: (id) => {
        const bookings = get().bookings;
        return bookings.find(booking => booking.id === id) || null;
    },
    
    getBookingsByEvent: (eventId) => {
        const bookings = get().bookings;
        return bookings.filter(booking => booking.eventId === eventId);
    },
    
    getBookingsByUser: (userId) => {
        const bookings = get().bookings;
        return bookings.filter(booking => booking.userId === userId);
    },
    
    getAllBookings: () => get().bookings,
    
    deleteBooking: (id) => {
        set(state => ({ 
            bookings: state.bookings.filter(booking => booking.id !== id) 
        }));
    },
    
    initializeMockData: () => {
        if (get().initialized) return;
        // Initialize with empty array, bookings will be added through the UI
        set({ initialized: true });
    },
}));

