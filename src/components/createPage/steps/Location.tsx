"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormikProps } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import dynamic from "next/dynamic";
import { useLocationStore } from "@/store/locationStore";
import { EventFormValues } from "@/types/formValues";
import { BusinessFormValues } from "@/types/formValues";

const Map = dynamic(() => import("../../mainPage/Map"), { ssr: false });

interface LocationProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues | BusinessFormValues>;
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

    useEffect(() => {
        if (selectedPosition) {
            setFieldValue("position", selectedPosition);
        }
    }, [selectedPosition, setFieldValue]);

    const handleMapClick = (lat: number, lng: number) => {
        const newPosition: [number, number] = [lat, lng];
        setSelectedPosition(newPosition);
        setFieldValue("position", newPosition);
    };

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Местоположение</SectionTitle>
                <p className="mb-4 text-[14px] text-gray-text">
                    Нажмите на карте, чтобы выбрать местоположение события
                </p>
                {selectedPosition && (
                    <div className="mb-4">
                        <p className="text-[12px] text-gray-placeholder">
                            Выбрано: {selectedPosition[0].toFixed(4)},{" "}
                            {selectedPosition[1].toFixed(4)}
                        </p>
                    </div>
                )}
                <div className="h-[300px] w-full rounded-[16px] overflow-hidden mb-4">
                    {selectedPosition && (
                        <Map
                            center={selectedPosition}
                            onCenterChange={center => {
                                setMapCenter(center);
                                handleMapClick(center[0], center[1]);
                            }}
                            markers={[]}
                        />
                    )}
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
