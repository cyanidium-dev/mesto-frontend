"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { getCoordinates } from "@/utils/distance";
import { isItemOpenNow } from "@/utils/openNow";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Main() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<"map" | "list">("map");
    const [filters, setFilters] = useState<FilterValues>({
        search: "",
        languages: [],
        cities: [],
        categories: [],
        openNow: false,
    });

    const userLocation = useLocationStore(s => s.userLocation);
    const setUserLocation = useLocationStore(s => s.setUserLocation);
    const mapCenter = useLocationStore(s => s.mapCenter);
    const setMapCenter = useLocationStore(s => s.setMapCenter);

    const initialized = useRef(false);
    const isUpdatingFromUrl = useRef(false);
    const getEvent = useEventsStore(s => s.getEvent);
    const getBusiness = useBusinessStore(s => s.getBusiness);

    const fakeBusinesses = useNearbyBusinesses();
    const savedBusinesses = useBusinessStore(s => s.getAllBusinesses());
    const savedEvents = useEventsStore(s => s.getAllEvents());
    const initializeBusinessMockData = useBusinessStore(
        s => s.initializeMockData
    );
    const initializeEventsMockData = useEventsStore(s => s.initializeMockData);
    const initializeUserMockData = useUserStore(s => s.initializeMockData);

    useEffect(() => {
        initializeBusinessMockData();
        initializeEventsMockData();
        initializeUserMockData();
    }, [
        initializeBusinessMockData,
        initializeEventsMockData,
        initializeUserMockData,
    ]);

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

    const businesses = useMemo(() => {
        return filterItems(allBusinesses, savedEvents, filters);
    }, [allBusinesses, savedEvents, filters]);

    const events = useMemo(() => {
        return filterItems(savedEvents, allBusinesses, filters);
    }, [savedEvents, allBusinesses, filters]);

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
                        setMapCenter([50.0755, 14.4378]);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 10000,
                    }
                );
            } else {
                setMapCenter([50.0755, 14.4378]);
            }
        }
    }, [userLocation, mapCenter, setMapCenter, setUserLocation]);

    useEffect(() => {
        const viewParam = searchParams.get("view");
        if (viewParam === "map" || viewParam === "list") {
            setViewMode(prev => {
                if (prev === viewParam) return prev;
                isUpdatingFromUrl.current = true;
                setTimeout(() => {
                    isUpdatingFromUrl.current = false;
                }, 0);
                return viewParam;
            });
        }
    }, [searchParams]);

    useEffect(() => {
        if (isUpdatingFromUrl.current) {
            return; // Don't update URL if we're updating from URL
        }

        const viewParam = searchParams.get("view");
        if (viewMode !== viewParam) {
            const newParams = new URLSearchParams(searchParams.toString());
            if (viewMode === "map") {
                newParams.set("view", "map");
            } else {
                newParams.delete("view");
            }
            router.push(`/main?${newParams.toString()}`, { scroll: false });
        }
    }, [viewMode, router, searchParams]);

    useEffect(() => {
        const focusId = searchParams.get("focus");

        if (focusId && viewMode === "map") {
            const event = getEvent(focusId);
            const business = getBusiness(focusId);
            const item = event || business;

            if (item) {
                const coords = getCoordinates(item.location);
                if (coords) {
                    setMapCenter(coords);
                }
            }
        }
    }, [searchParams, viewMode, getEvent, getBusiness, setMapCenter]);

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
                    selectedItemId={searchParams.get("focus")}
                />
            ) : (
                <List businesses={businesses} events={events} />
            )}
        </>
    );
}

function filterItems<T extends Business | Event>(
    items: T[],
    otherItems: (Business | Event)[],
    filters: FilterValues
): T[] {
    return items.filter(item => {
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

        if (filters.languages.length > 0) {
            const hasMatchingLanguage = filters.languages.some(lang =>
                item.languages.includes(lang)
            );
            if (!hasMatchingLanguage) {
                return false;
            }
        }

        if (filters.categories.length > 0) {
            if (!filters.categories.includes(item.category)) {
                return false;
            }
        }

        if (filters.openNow) {
            if (!isItemOpenNow(item)) {
                return false;
            }
        }

        return true;
    });
}
