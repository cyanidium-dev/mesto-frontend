"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import SearchBar, { FilterValues } from "./SearchBar";
import dynamic from "next/dynamic";
import List from "./List";
import { useLocationStore } from "@/store/locationStore";
import { useNearbyBusinesses } from "@/hooks/useNearbyBusinesses";
import { useEventsStore } from "@/store/eventsStore";
import { useBusinessStore } from "@/store/businessStore";
import { useUserStore } from "@/store/userStore";
import { Business } from "@/types/business";
import { Event } from "@/types/event";
import { calculateDistance, getCoordinates } from "@/utils/distance";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Main() {
    const [viewMode, setViewMode] = useState<"map" | "list">("map");
    const [filters, setFilters] = useState<FilterValues>({
        search: "",
        languages: [],
        cities: [],
        categories: [],
        distance: null,
    });

    const userLocation = useLocationStore(s => s.userLocation);
    const setUserLocation = useLocationStore(s => s.setUserLocation);
    const mapCenter = useLocationStore(s => s.mapCenter);
    const setMapCenter = useLocationStore(s => s.setMapCenter);

    const initialized = useRef(false);

    const fakeBusinesses = useNearbyBusinesses();
    const savedBusinesses = useBusinessStore(s => s.getAllBusinesses());
    const savedEvents = useEventsStore(s => s.getAllEvents());
    const initializeBusinessMockData = useBusinessStore(
        s => s.initializeMockData
    );
    const initializeEventsMockData = useEventsStore(s => s.initializeMockData);
    const initializeUserMockData = useUserStore(s => s.initializeMockData);

    // Initialize mock data on mount
    useEffect(() => {
        initializeBusinessMockData();
        initializeEventsMockData();
        initializeUserMockData();
    }, [
        initializeBusinessMockData,
        initializeEventsMockData,
        initializeUserMockData,
    ]);

    // Combine fake businesses with saved businesses
    const allBusinesses = useMemo(() => {
        const combined = [...fakeBusinesses, ...savedBusinesses];
        console.log("🗺️ Map - Businesses:", combined.length);
        console.log("🗺️ Saved businesses:", savedBusinesses);
        console.log(
            "🗺️ Saved businesses with images:",
            savedBusinesses.map(b => ({
                id: b.id,
                title: b.title,
                imageUrls: b.imageUrls,
                imageCount: b.imageUrls?.length || 0,
            }))
        );
        return combined;
    }, [fakeBusinesses, savedBusinesses]);

    // Filter businesses and events based on filters
    const businesses = useMemo(() => {
        return filterItems(
            allBusinesses,
            savedEvents,
            filters,
            userLocation || mapCenter
        );
    }, [allBusinesses, savedEvents, filters, userLocation, mapCenter]);

    const events = useMemo(() => {
        return filterItems(
            savedEvents,
            allBusinesses,
            filters,
            userLocation || mapCenter
        );
    }, [savedEvents, allBusinesses, filters, userLocation, mapCenter]);

    useEffect(() => {
        console.log("🗺️ Map - Events:", savedEvents.length);
        console.log(
            "🗺️ Saved events with images:",
            savedEvents.map(e => ({
                id: e.id,
                title: e.title,
                imageUrls: e.imageUrls,
                imageCount: e.imageUrls?.length || 0,
            }))
        );
    }, [savedEvents]);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Якщо вже маємо userLocation — ставимо його як центр
        if (
            mapCenter[0] === 50.0755 &&
            mapCenter[1] === 14.4378 &&
            userLocation
        ) {
            setMapCenter(userLocation);
        }

        if (
            mapCenter[0] === 50.0755 &&
            mapCenter[1] === 14.4378 &&
            !userLocation
        ) {
            // Отримуємо геолокацію
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        const coords: [number, number] = [
                            pos.coords.latitude,
                            pos.coords.longitude,
                        ];
                        setUserLocation(coords);
                        setMapCenter(coords);
                    },
                    () => {
                        // Якщо не вдалося — ставимо Прагу
                        setMapCenter([50.0755, 14.4378]);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 10000,
                    }
                );
            } else {
                // Якщо браузер не підтримує геолокацію — теж ставимо Прагу
                setMapCenter([50.0755, 14.4378]);
            }
        }
    }, [userLocation, mapCenter, setMapCenter, setUserLocation]);

    return (
        <>
            <SearchBar
                viewMode={viewMode}
                setViewMode={setViewMode}
                onFiltersChange={setFilters}
            />
            {viewMode === "map" ? (
                <Map
                    center={mapCenter}
                    onCenterChange={setMapCenter}
                    markers={businesses}
                    events={events}
                />
            ) : (
                <List businesses={businesses} events={events} />
            )}
        </>
    );
}

// Filter function for businesses and events
function filterItems<T extends Business | Event>(
    items: T[],
    otherItems: (Business | Event)[],
    filters: FilterValues,
    centerLocation: [number, number]
): T[] {
    return items.filter(item => {
        // Search filter - check title and description
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const titleMatch = (item.title || "")
                .toLowerCase()
                .includes(searchLower);
            const descriptionMatch = (item.description || "")
                .toLowerCase()
                .includes(searchLower);
            if (!titleMatch && !descriptionMatch) {
                return false;
            }
        }

        // Language filter
        if (filters.languages.length > 0) {
            const hasMatchingLanguage = filters.languages.some(lang =>
                item.languages.includes(lang)
            );
            if (!hasMatchingLanguage) {
                return false;
            }
        }

        // Category filter
        if (filters.categories.length > 0) {
            if (!filters.categories.includes(item.category)) {
                return false;
            }
        }

        // Distance filter
        if (filters.distance) {
            const itemCoords = getCoordinates(item.location);
            if (itemCoords) {
                const distance = calculateDistance(
                    centerLocation[0],
                    centerLocation[1],
                    itemCoords[0],
                    itemCoords[1]
                );
                const maxDistance = parseFloat(filters.distance);
                if (distance > maxDistance) {
                    return false;
                }
            } else {
                return false; // If we can't get coordinates, exclude the item
            }
        }

        // City filter - for now, we'll skip this as it requires reverse geocoding
        // which would be expensive. This can be implemented later with caching.
        // if (filters.cities.length > 0) {
        //   // Would need to reverse geocode to get city name
        // }

        return true;
    });
}
