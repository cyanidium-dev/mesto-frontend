import { Business } from "@/types/business";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockBusinesses } from "@/data/mockBusinesses";

interface BusinessStore {
    businesses: Business[];
    addBusiness: (business: Business) => void;
    deleteBusiness: (id: string) => void;
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

export const useBusinessStore = create<BusinessStore>()(
    persist(
        (set, get) => ({
            businesses: [],
            initialized: false,
            initializeMockData: () => {
                if (get().initialized) return;
                const state = get();
                // Only initialize if there's no persisted data
                if (state.businesses.length === 0) {
                    set({ businesses: mockBusinesses, initialized: true });
                } else {
                    set({ initialized: true });
                }
            },
            addBusiness: business =>
                set(state => ({ businesses: [...state.businesses, business] })),
            deleteBusiness: id =>
                set(state => ({
                    businesses: state.businesses.filter(
                        business => business.id !== id
                    ),
                })),
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
        }),
        {
            name: "business-storage",
            partialize: state => ({
                businesses: state.businesses,
            }),
        }
    )
);
