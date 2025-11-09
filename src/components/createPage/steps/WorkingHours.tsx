"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import { BusinessFormValues } from "@/types/formValues";

interface WorkingHoursProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BusinessFormValues>;
}

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const dayFullNames = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
];

const WorkingHoursInput = () => {
    const { values, setFieldValue } = useFormikContext<BusinessFormValues>();
    const workingHours = values.workingHours ?? [];

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedDays, setSelectedDays] = useState<boolean[]>(
        new Array(7).fill(false)
    );

    // Initialize from existing workingHours (only once on mount)
    useEffect(() => {
        if (workingHours.length > 0) {
            // Find a day with hours to use as default
            const dayWithHours = workingHours.findIndex(
                hours => hours && hours.start && hours.end
            );
            if (dayWithHours >= 0) {
                setStartTime(workingHours[dayWithHours].start);
                setEndTime(workingHours[dayWithHours].end);
                // Mark days that have the same hours
                workingHours.forEach((hours, index) => {
                    if (
                        hours &&
                        hours.start === workingHours[dayWithHours].start &&
                        hours.end === workingHours[dayWithHours].end
                    ) {
                        setSelectedDays(prev => {
                            const updated = [...prev];
                            updated[index] = true;
                            return updated;
                        });
                    }
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update workingHours when time range or selected days change
    useEffect(() => {
        // Skip if no times are set yet
        if (!startTime || !endTime) return;

        const currentWorkingHours = values.workingHours ?? [];
        const updated = new Array(7).fill(null).map((_, index) => {
            if (selectedDays[index] && startTime && endTime) {
                return { start: startTime, end: endTime };
            }
            // Keep existing hours for unselected days
            return currentWorkingHours[index] || null;
        });

        // Check if the updated array is different from current
        const hasChanged = updated.some((hours, index) => {
            const current = currentWorkingHours[index];
            if (selectedDays[index]) {
                // If day is selected, check if hours match
                return (
                    !current ||
                    current.start !== startTime ||
                    current.end !== endTime
                );
            }
            // If day is not selected, check if it's different
            return hours !== current;
        });

        // Only update if there are selected days with times and something changed
        const hasSelectedDays = selectedDays.some(selected => selected);
        if (hasSelectedDays && hasChanged) {
            setFieldValue("workingHours", updated);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTime, endTime, selectedDays, setFieldValue]);

    const toggleDay = (index: number) => {
        setSelectedDays(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    return (
        <div>
            <p className="mb-4 text-[14px]">Рабочие часы</p>

            {/* Time Range Input */}
            <div className="mb-6">
                <label className="block text-[12px] font-normal leading-[120%] mb-2">
                    Уточните в какие дни и часы работает компания, эта
                    информация будет показываться в вашей бизнес точке
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        placeholder="Начало"
                        className="flex-1 px-4 h-[37px] text-[16px] font-normal leading-none text-dark bg-white placeholder-placeholder border border-gray-light rounded-full outline-none transition duration-300 ease-out focus:border-primary"
                    />
                    <span className="text-[14px] text-gray-text">-</span>
                    <input
                        type="time"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        placeholder="Конец"
                        className="flex-1 px-4 h-[37px] text-[16px] font-normal leading-none text-dark bg-white placeholder-placeholder border border-gray-light rounded-full outline-none transition duration-300 ease-out focus:border-primary"
                    />
                </div>
            </div>

            {/* Day Selection Buttons */}
            <div>
                <p className="mb-3 text-[12px] text-gray-text">
                    Выберите дни недели
                </p>
                <div className="flex gap-2 flex-wrap">
                    {days.map((day, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => toggleDay(index)}
                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                                selectedDays[index]
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-gray-ultra-light text-gray-text hover:bg-gray-light"
                            }`}
                            title={dayFullNames[index]}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const WorkingHours = ({ setCurrentStep }: WorkingHoursProps) => {
    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Рабочие часы</SectionTitle>
                <WorkingHoursInput />
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
            >
                Продолжить
            </MainButton>
        </div>
    );
};
