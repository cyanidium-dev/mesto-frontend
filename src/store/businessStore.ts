import { Business } from "@/types/business";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockBusinesses } from "@/data/mockBusinesses";
import { cleanupBusinessStorage } from "@/utils/storageCleanup";

const getBusinessServerSnapshot = () => ({
    userCreatedBusinesses: [],
});

const businessServerSnapshot = getBusinessServerSnapshot();

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

interface BusinessStore {
    userCreatedBusinesses: Business[];
    addBusiness: (business: Business) => void;
    updateBusiness: (id: string, business: Partial<Business>) => void;
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
            userCreatedBusinesses: [],
            initialized: false,
            initializeMockData: () => {
                if (get().initialized) return;
                set({ initialized: true });
            },
            addBusiness: business => {
                if (isUserCreatedBusiness(business.id)) {
                    set(state => ({ 
                        userCreatedBusinesses: [...state.userCreatedBusinesses, business] 
                    }));
                }
            },
            updateBusiness: (id, updatedBusiness) => {
                if (isUserCreatedBusiness(id)) {
                    set(state => ({
                        userCreatedBusinesses: state.userCreatedBusinesses.map(business =>
                            business.id === id
                                ? { ...business, ...updatedBusiness }
                                : business
                        ),
                    }));
                }
            },
            deleteBusiness: id => {
                if (isUserCreatedBusiness(id)) {
                    set(state => ({
                        userCreatedBusinesses: state.userCreatedBusinesses.filter(
                            business => business.id !== id
                        ),
                    }));
                }
            },
            getBusiness: id => {
                const mockBusiness = mockBusinesses.find(b => b.id === id);
                if (mockBusiness) return mockBusiness;
                
                const userCreated = get().userCreatedBusinesses;
                return userCreated.find(business => business.id === id) || null;
            },
            getAllBusinesses: () => {
                return [...mockBusinesses, ...get().userCreatedBusinesses];
            },
            getBusinessesByFilters: filters => {
                const allBusinesses = get().getAllBusinesses();
                return allBusinesses.filter(business => {
                    return Object.entries(filters).every(([key, value]) => {
                        return business[key as keyof Business] === value;
                    });
                });
            },
        }),
        {
            name: "business-storage",
            partialize: (state: BusinessStore) => ({
                userCreatedBusinesses: state.userCreatedBusinesses,
            }),
            getServerSnapshot: () => businessServerSnapshot,
            storage: {
                getItem: (name: string) => {
                    if (typeof window === "undefined") return null;
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    try {
                        const parsed = JSON.parse(str);
                        return cleanupBusinessStorage(parsed);
                    } catch (error) {
                        console.error("Error parsing businesses from localStorage:", error);
                        return null;
                    }
                },
                setItem: (name: string, value: unknown) => {
                    if (typeof window === "undefined") return;
                    try {
                        const cleaned = cleanupBusinessStorage(JSON.parse(JSON.stringify(value)));
                        localStorage.setItem(name, JSON.stringify(cleaned));
                    } catch (error) {
                        console.error("Error saving businesses to localStorage:", error);
                    }
                },
                removeItem: (name: string) => {
                    if (typeof window === "undefined") return;
                    localStorage.removeItem(name);
                },
            },
        } as unknown as Parameters<typeof persist<BusinessStore, [["zustand/persist", unknown]]>>[1]
    )
);
