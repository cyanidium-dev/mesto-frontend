"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import { BusinessFormValues } from "@/types/formValues";
import ClockIcon from "../../shared/icons/ClockIcon";

interface WorkingHoursProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BusinessFormValues>;
}

const days = ["Пон", "Вт", "Ср", "Чт", "Пят", "Сб", "Вс"];

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
    const [timeInputValue, setTimeInputValue] = useState("");
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
                const start = workingHours[dayWithHours].start;
                const end = workingHours[dayWithHours].end;
                setStartTime(start);
                setEndTime(end);
                setTimeInputValue(`${start} - ${end}`);
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

    // Format digits into time mask "HH:MM - HH:MM" with real-time validation
    const formatTimeMask = (inputValue: string): string => {
        // Remove all non-digit characters
        const cleanDigits = inputValue.replace(/\D/g, "");

        if (cleanDigits.length === 0) return "";

        // Limit to 8 digits (HHMMHHMM)
        const limitedDigits = cleanDigits.slice(0, 8);

        let formatted = "";

        if (limitedDigits.length <= 2) {
            // Just hours for start time
            const hours = limitedDigits;
            // Validate hours immediately when 2 digits are entered
            if (hours.length === 2) {
                const h = parseInt(hours, 10);
                if (h > 23) {
                    formatted = "23";
                } else {
                    formatted = hours;
                }
            } else {
                formatted = hours;
            }
        } else if (limitedDigits.length <= 4) {
            // Hours and minutes for start time
            const startH = limitedDigits.slice(0, 2);
            const startM = limitedDigits.slice(2);

            // Validate hours
            let hours = parseInt(startH, 10) || 0;
            if (startH.length === 2 && hours > 23) {
                hours = 23;
            }
            const formattedHours = hours.toString().padStart(2, "0");

            if (startM.length > 0) {
                // Validate minutes - but allow partial input while typing
                let minutes = parseInt(startM, 10) || 0;
                if (startM.length === 2) {
                    // Only validate when complete
                    if (minutes > 59) {
                        minutes = 59;
                    }
                    const formattedMinutes = minutes
                        .toString()
                        .padStart(2, "0");
                    formatted = `${formattedHours}:${formattedMinutes}`;
                } else {
                    // Partial minutes - show as is, but validate first digit
                    if (startM.length === 1 && parseInt(startM, 10) > 5) {
                        formatted = `${formattedHours}:5`;
                    } else {
                        formatted = `${formattedHours}:${startM}`;
                    }
                }
            } else {
                // No minutes yet
                formatted = `${formattedHours}:`;
            }
        } else if (limitedDigits.length <= 6) {
            // Start time complete, starting end time
            const startH = limitedDigits.slice(0, 2);
            const startM = limitedDigits.slice(2, 4);
            const endH = limitedDigits.slice(4);

            // Validate start time
            let startHours = parseInt(startH, 10) || 0;
            let startMinutes = parseInt(startM, 10) || 0;
            if (startHours > 23) startHours = 23;
            if (startMinutes > 59) startMinutes = 59;
            const formattedStart = `${startHours
                .toString()
                .padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;

            // Validate end hours - allow partial input
            if (endH.length > 0) {
                let endHours = parseInt(endH, 10) || 0;
                if (endH.length === 2 && endHours > 23) {
                    endHours = 23;
                }
                // Don't pad if it's partial input
                const formattedEndH =
                    endH.length === 2
                        ? endHours.toString().padStart(2, "0")
                        : endH;
                formatted = `${formattedStart} - ${formattedEndH}`;
            } else {
                formatted = `${formattedStart} - `;
            }
        } else {
            // Both times complete
            const startH = limitedDigits.slice(0, 2);
            const startM = limitedDigits.slice(2, 4);
            const endH = limitedDigits.slice(4, 6);
            const endM = limitedDigits.slice(6);

            // Validate start time
            let startHours = parseInt(startH, 10) || 0;
            let startMinutes = parseInt(startM, 10) || 0;
            if (startHours > 23) startHours = 23;
            if (startMinutes > 59) startMinutes = 59;
            const formattedStart = `${startHours
                .toString()
                .padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;

            // Validate end time - handle partial input
            let endHours = parseInt(endH, 10) || 0;
            if (endHours > 23) endHours = 23;

            if (endM.length === 2) {
                // Complete minutes
                let endMinutes = parseInt(endM, 10) || 0;
                if (endMinutes > 59) endMinutes = 59;
                const formattedEnd = `${endHours
                    .toString()
                    .padStart(2, "0")}:${endMinutes
                    .toString()
                    .padStart(2, "0")}`;
                formatted = `${formattedStart} - ${formattedEnd}`;
            } else if (endM.length === 1) {
                // Partial minutes - validate first digit
                let endMinutes = parseInt(endM, 10) || 0;
                if (endMinutes > 5) endMinutes = 5;
                const formattedEnd = `${endHours
                    .toString()
                    .padStart(2, "0")}:${endMinutes}`;
                formatted = `${formattedStart} - ${formattedEnd}`;
            } else {
                // No minutes yet
                const formattedEnd = `${endHours.toString().padStart(2, "0")}:`;
                formatted = `${formattedStart} - ${formattedEnd}`;
            }
        }

        return formatted;
    };

    // Parse input to extract start and end times with validation
    const handleTimeRangeChange = (value: string) => {
        // Format and validate the input with mask - this will correct invalid values immediately
        const formatted = formatTimeMask(value);
        setTimeInputValue(formatted);

        // Extract digits only for parsing
        const digits = value.replace(/\D/g, "");

        // Parse start time (first 4 digits) - only when we have complete time
        if (digits.length >= 4) {
            const startH = digits.slice(0, 2);
            const startM = digits.slice(2, 4);
            // Validate hours (0-23) and minutes (0-59)
            let hours = parseInt(startH, 10) || 0;
            let minutes = parseInt(startM, 10) || 0;

            // Clamp to valid ranges
            hours = Math.min(23, Math.max(0, hours));
            minutes = Math.min(59, Math.max(0, minutes));

            const formattedStart = `${hours
                .toString()
                .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
            setStartTime(formattedStart);
        } else if (digits.length === 0) {
            setStartTime("");
        }

        // Parse end time (last 4 digits) - only when we have complete time
        if (digits.length >= 8) {
            const endH = digits.slice(4, 6);
            const endM = digits.slice(6, 8);
            // Validate hours (0-23) and minutes (0-59)
            let hours = parseInt(endH, 10) || 0;
            let minutes = parseInt(endM, 10) || 0;

            // Clamp to valid ranges
            hours = Math.min(23, Math.max(0, hours));
            minutes = Math.min(59, Math.max(0, minutes));

            const formattedEnd = `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`;
            setEndTime(formattedEnd);
        } else if (digits.length < 4) {
            setEndTime("");
        }
    };

    // Sync timeInputValue when startTime or endTime change externally (but not from user input)
    useEffect(() => {
        // Don't sync if user is currently typing (input has partial values)
        const currentDigits = timeInputValue.replace(/\D/g, "");
        const hasPartialInput =
            currentDigits.length > 0 && currentDigits.length < 8;

        // Only sync if we have complete times and the input doesn't match (external change)
        if (startTime && endTime && !hasPartialInput) {
            const formatted = `${startTime} - ${endTime}`;
            const formattedDigits = formatted.replace(/\D/g, "");

            // Only sync if the digits don't match (external change, not user typing)
            if (currentDigits !== formattedDigits) {
                setTimeInputValue(formatted);
            }
        } else if (
            !startTime &&
            !endTime &&
            timeInputValue &&
            !hasPartialInput
        ) {
            // Clear if both times are cleared and input is empty
            if (currentDigits.length === 0) {
                setTimeInputValue("");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTime, endTime]);

    return (
        <div>
            {/* Time Range Input */}
            <div className="mb-6">
                <p className="block text-[14px] mb-6">
                    Уточните в какие дни и часы работает компания, эта
                    информация будет показываться в вашей бизнес точке
                </p>
                <label className="block text-[12px] mb-2">Рабочее время</label>
                <div className="relative">
                    <input
                        type="text"
                        value={timeInputValue}
                        onChange={e => handleTimeRangeChange(e.target.value)}
                        placeholder="12:30 - 22:00"
                        className="w-full px-4 pr-12 h-[37px] text-[16px] font-normal leading-none text-dark bg-white placeholder-placeholder border border-gray-light rounded-full outline-none transition duration-300 ease-out focus:border-primary"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <ClockIcon className="w-5 h-5 text-gray-placeholder" />
                    </div>
                </div>
            </div>

            {/* Day Selection Buttons */}
            <div>
                <p className="mb-3 text-[12px] text-gray-text">Рабочие дни</p>
                <div className="flex gap-2 flex-wrap">
                    {days.map((day, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => toggleDay(index)}
                            className={`px-3 py-2 rounded-full text-[12px] font-medium transition-colors ${
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
