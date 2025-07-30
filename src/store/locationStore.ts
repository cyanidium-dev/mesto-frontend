import { create } from "zustand";
import { persist } from "zustand/middleware";

type LocationStore = {
  userLocation: [number, number] | null;
  setUserLocation: (loc: [number, number]) => void;

  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
};

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      userLocation: null,
      setUserLocation: (loc) => set({ userLocation: loc }),

      mapCenter: [50.0755, 14.4378], // Прага
      setMapCenter: (center) => set({ mapCenter: center }),
    }),
    {
      name: "user-location-storage", // ключ у localStorage
      partialize: (state) => ({ userLocation: state.userLocation }), // тільки userLocation зберігається
    }
  )
);
