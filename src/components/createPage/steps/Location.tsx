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
import LocationIcon from "@/components/shared/icons/LocationIcon";
import LocationMapIcon from "@/components/shared/icons/LocationMapIcon";

const LocationPickerMap = dynamic(
    () => import("@/components/createPage/steps/LocationPickerMap"),
    {
        ssr: false,
    }
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

const description = {
    event: "Уточните где будет проходить событие",
    company: "Уточните где находиться ваша компания",
    individual: "Уточните откуда или где вы работаете",
};

export const Location = ({ setCurrentStep, formProps }: LocationProps) => {
    const { errors, values, setFieldValue } = formProps;
    const userLocation = useLocationStore(s => s.userLocation);
    const mapCenter = useLocationStore(s => s.mapCenter);
    const setMapCenter = useLocationStore(s => s.setMapCenter);

    let type: "event" | "company" | "individual";
    if ("userType" in values && values.userType) {
        type = values.userType === "individual" ? "individual" : "company";
    } else {
        type = "event";
    }

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
    const [selectedLocationName, setSelectedLocationName] =
        useState<string>("");
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const lastReverseGeocodedPosition = useRef<[number, number] | null>(null);

    const initialCenter = getPositionAsTuple() ||
        mapCenter || [50.0755, 14.4378];
    const [mapCenterState, setMapCenterState] =
        useState<[number, number]>(initialCenter);

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
    const searchLocation = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `/api/geocode/search?q=${encodeURIComponent(query)}`
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
    }, []);

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
        lastReverseGeocodedPosition.current = position;
        // Open map if not already open
        if (!isMapOpen) {
            setIsMapOpen(true);
        }
    };

    const handleMapClick = async (position: [number, number]) => {
        setSelectedPosition(position);
        setFieldValue("position", position);
        setMapCenterState(position);
        lastReverseGeocodedPosition.current = position;

        // Reverse geocode to get location name
        try {
            const response = await fetch(
                `/api/geocode/reverse?lat=${position[0]}&lon=${position[1]}`
            );

            if (response.ok) {
                const data = await response.json();
                const locationName = data.display_name || "";
                setSelectedLocationName(locationName);
                setSearchQuery(locationName);
            } else {
                setSelectedLocationName("");
                setSearchQuery("");
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            setSelectedLocationName("");
            setSearchQuery("");
        }
    };

    const handleMapCenterChange = (center: [number, number]) => {
        setMapCenter(center);
        setMapCenterState(center);
    };

    // Sync input value with map position when position changes
    useEffect(() => {
        if (values.position && Array.isArray(values.position)) {
            const position = values.position as [number, number];
            setSelectedPosition(position);
            setMapCenterState(position);

            // Check if we need to reverse geocode (only if position changed and we don't have a name)
            const positionChanged =
                !lastReverseGeocodedPosition.current ||
                lastReverseGeocodedPosition.current[0] !== position[0] ||
                lastReverseGeocodedPosition.current[1] !== position[1];

            if (positionChanged && !selectedLocationName) {
                lastReverseGeocodedPosition.current = position;
                fetch(
                    `/api/geocode/reverse?lat=${position[0]}&lon=${position[1]}`
                )
                    .then(res => res.json())
                    .then(data => {
                        const locationName = data.display_name || "";
                        setSelectedLocationName(locationName);
                        setSearchQuery(prev => prev || locationName);
                    })
                    .catch(err =>
                        console.error("Reverse geocoding error:", err)
                    );
            }
        }
    }, [values.position, selectedLocationName]);

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Место</SectionTitle>
                <p className="text-[14px] text-gray-text mb-6">
                    {description[type]}
                </p>
                {/* Search Input */}
                <div className="relative mb-4" ref={searchContainerRef}>
                    <label
                        htmlFor="location"
                        className="text-[14px] text-gray-text mb-2"
                    >
                        Локация
                    </label>
                    <div className="relative">
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
                            className="w-full pl-4 pr-12 h-[37px] text-[16px] font-normal leading-none text-dark bg-white placeholder-placeholder border border-gray-light rounded-full outline-none transition duration-300 ease-out focus:border-primary"
                        />
                        {isSearching ? (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <LocationMapIcon className="w-5 h-5 text-gray-placeholder" />
                            </div>
                        )}
                    </div>

                    {/* Search Results Dropdown */}
                    {showResults && searchResults.length > 0 && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-light rounded-[16px] shadow-lg max-h-[200px] overflow-y-auto">
                            {searchResults.map(result => (
                                <button
                                    key={result.place_id}
                                    type="button"
                                    onClick={() =>
                                        handleSearchResultSelect(result)
                                    }
                                    className="w-full px-4 py-3 text-left text-[14px] hover:bg-gray-ultra-light transition-colors border-b border-gray-light last:border-b-0"
                                >
                                    {result.display_name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {!isMapOpen ? (
                    <div className="h-[168px] w-[343px] rounded-[16px] overflow-hidden mb-4 relative bg-gray-ultra-light border border-gray-light flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setIsMapOpen(true)}
                                className="px-6 py-3 bg-primary text-white rounded-full text-[14px] font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
                            >
                                Выбрать на карте
                                <div className="ml-2 w-[20px] h-[20px] flex items-center justify-center">
                                    <LocationIcon className="w-[20px] h-[20px] text-white" />
                                </div>
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="mb-4 text-[14px] text-gray-text">
                            Нажмите на карте, чтобы выбрать местоположение
                            события
                        </p>

                        {selectedPosition && (
                            <div className="mb-4">
                                {selectedLocationName ? (
                                    <p className="text-[12px] text-gray-placeholder">
                                        Выбрано: {selectedLocationName}
                                    </p>
                                ) : (
                                    <p className="text-[12px] text-gray-placeholder">
                                        Выбрано:{" "}
                                        {selectedPosition[0].toFixed(4)},{" "}
                                        {selectedPosition[1].toFixed(4)}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="h-[168px] w-[343px] rounded-[16px] overflow-hidden mb-4 relative">
                            <LocationPickerMap
                                center={mapCenterState}
                                selectedPosition={selectedPosition}
                                onPositionSelect={handleMapClick}
                                onCenterChange={handleMapCenterChange}
                            />
                        </div>
                    </>
                )}
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
