import { create } from "zustand";
import { persist } from "zustand/middleware";

const getLocationServerSnapshot = () => ({
    userLocation: null,
    mapCenter: [50.0755, 14.4378] as [number, number],
});

const locationServerSnapshot = getLocationServerSnapshot();

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
      name: "user-location-storage",
      partialize: (state) => ({ 
        userLocation: state.userLocation,
        mapCenter: state.mapCenter,
      }),
      getServerSnapshot: () => locationServerSnapshot,
    } as unknown as Parameters<typeof persist<LocationStore, [["zustand/persist", unknown]]>>[1]
  )
);
