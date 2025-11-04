import { Business } from "@/types/business";
import { create } from "zustand";
import { mockBusinesses } from "@/data/mockBusinesses";

interface BusinessStore {
    businesses: Business[];
    addBusiness: (business: Business) => void;
    getBusiness: (id: string) => Business | null;
    getAllBusinesses: () => Business[];
    getBusinessesByFilters: (filters: BusinessFilters) => Business[];
    initialized: boolean;
    initializeMockData: () => void;
}

interface BusinessFilters {
    category?: string;
    languages?: string[];
    tags?: string[];
    userType?: "business" | "individual";
}

export const useBusinessStore = create<BusinessStore>((set, get) => ({
    businesses: [],
    initialized: false,
    initializeMockData: () => {
        if (get().initialized) return;
        set({ businesses: mockBusinesses, initialized: true });
    },
    addBusiness: business => set(state => ({ businesses: [...state.businesses, business] })),
    getBusiness: id => {
        const businesses = get().businesses;
        return businesses.find(business => business.id === id) || null;
    },
    getAllBusinesses: () => get().businesses,
    getBusinessesByFilters: filters => {
        const businesses = get().businesses;
        return businesses.filter(business => {
            return Object.entries(filters).every(([key, value]) => {
                return business[key as keyof Business] === value;
            });
        });
    },
}));

