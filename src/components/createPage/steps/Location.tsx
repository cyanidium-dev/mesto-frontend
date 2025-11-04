"use client";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useCallback,
    useRef,
} from "react";
import { FormikProps } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import dynamic from "next/dynamic";
import { useLocationStore } from "@/store/locationStore";
import { EventFormValues } from "@/types/formValues";
import { BusinessFormValues } from "@/types/formValues";

const LocationPickerMap = dynamic(
    () => import("./LocationPickerMap"),
    { ssr: false }
);

interface LocationProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues | BusinessFormValues>;
}

interface GeocodingResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

export const Location = ({ setCurrentStep, formProps }: LocationProps) => {
    const { errors, values, setFieldValue } = formProps;
    const userLocation = useLocationStore(s => s.userLocation);
    const mapCenter = useLocationStore(s => s.mapCenter);
    const setMapCenter = useLocationStore(s => s.setMapCenter);

    // Convert position to tuple format if needed
    const getPositionAsTuple = (): [number, number] | null => {
        if (values.position) {
            if (Array.isArray(values.position)) {
                return values.position as [number, number];
            } else if (
                typeof values.position === "object" &&
                "lat" in values.position &&
                "lng" in values.position
            ) {
                // Handle LatLngLiteral or LatLng class case
                const pos = values.position as { lat: number; lng: number };
                return [pos.lat, pos.lng];
            }
        }
        return userLocation || mapCenter;
    };

    const [selectedPosition, setSelectedPosition] = useState<
        [number, number] | null
    >(getPositionAsTuple());
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedLocationName, setSelectedLocationName] = useState<string>("");
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const initialCenter = getPositionAsTuple() || mapCenter || [50.0755, 14.4378];
    const [mapCenterState, setMapCenterState] = useState<[number, number]>(initialCenter);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (selectedPosition) {
            setFieldValue("position", selectedPosition);
            setMapCenterState(selectedPosition);
        }
    }, [selectedPosition, setFieldValue]);

    // Debounced search function
    const searchLocation = useCallback(
        async (query: string) => {
            if (!query.trim()) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        query
                    )}&limit=5&addressdetails=1`,
                    {
                        headers: {
                            "User-Agent": "Mesto App",
                        },
                    }
                );

                if (response.ok) {
                    const data: GeocodingResult[] = await response.json();
                    setSearchResults(data);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Geocoding error:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        },
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchLocation(searchQuery);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, searchLocation]);

    const handleSearchResultSelect = (result: GeocodingResult) => {
        const position: [number, number] = [
            parseFloat(result.lat),
            parseFloat(result.lon),
        ];
        setSelectedPosition(position);
        setFieldValue("position", position);
        setMapCenterState(position);
        setSelectedLocationName(result.display_name);
        setSearchQuery(result.display_name);
        setShowResults(false);
    };

    const handleMapClick = (position: [number, number]) => {
        setSelectedPosition(position);
        setFieldValue("position", position);
        setMapCenterState(position);
        setSelectedLocationName("");
        setSearchQuery("");
    };

    const handleMapCenterChange = (center: [number, number]) => {
        setMapCenter(center);
        setMapCenterState(center);
    };

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Место</SectionTitle>
                <p>Уточните где будет проходить событие</p>
                {/* Search Input */}
                <div className="relative mb-4" ref={searchContainerRef}>
                    <label htmlFor="location" className="text-[14px] text-gray-text">Локация</label>
                    <input
                        id="location"
                        type="text"
                        value={searchQuery}
                        onChange={e => {
                            setSearchQuery(e.target.value);
                            setShowResults(true);
                        }}
                        onFocus={() => setShowResults(true)}
                        placeholder="Выбирите локацию"
                        className="w-full px-4 h-[37px] text-[16px] font-normal leading-none text-dark bg-white placeholder-placeholder border border-gray-light rounded-full outline-none transition duration-300 ease-out focus:border-primary"
                    />
                    {isSearching && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    
                    {/* Search Results Dropdown */}
                    {showResults && searchResults.length > 0 && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-light rounded-[16px] shadow-lg max-h-[200px] overflow-y-auto">
                            {searchResults.map(result => (
                                <button
                                    key={result.place_id}
                                    type="button"
                                    onClick={() => handleSearchResultSelect(result)}
                                    className="w-full px-4 py-3 text-left text-[14px] hover:bg-gray-ultra-light transition-colors border-b border-gray-light last:border-b-0"
                                >
                                    {result.display_name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <p className="mb-4 text-[14px] text-gray-text">
                    Нажмите на карте, чтобы выбрать местоположение события
                </p>
                
                {selectedPosition && (
                    <div className="mb-4">
                        {selectedLocationName ? (
                            <p className="text-[12px] text-gray-placeholder">
                                Выбрано: {selectedLocationName}
                            </p>
                        ) : (
                            <p className="text-[12px] text-gray-placeholder">
                                Выбрано: {selectedPosition[0].toFixed(4)},{" "}
                                {selectedPosition[1].toFixed(4)}
                            </p>
                        )}
                    </div>
                )}
                
                <div className="h-[300px] w-full rounded-[16px] overflow-hidden mb-4 relative">
                    <LocationPickerMap
                        center={mapCenterState}
                        selectedPosition={selectedPosition}
                        onPositionSelect={handleMapClick}
                        onCenterChange={handleMapCenterChange}
                    />
                </div>
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={!values.position || !!errors.position}
            >
                Продолжить
            </MainButton>
        </div>
    );
};
