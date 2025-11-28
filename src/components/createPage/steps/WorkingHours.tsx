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

    useEffect(() => {
        if (workingHours.length > 0) {
            const dayWithHours = workingHours.findIndex(
                hours => hours && hours.start && hours.end
            );
            if (dayWithHours >= 0) {
                const start = workingHours[dayWithHours].start;
                const end = workingHours[dayWithHours].end;
                setStartTime(start);
                setEndTime(end);
                setTimeInputValue(`${start} - ${end}`);
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

    useEffect(() => {
        if (!startTime || !endTime) return;

        const currentWorkingHours = values.workingHours ?? [];
        const updated = new Array(7).fill(null).map((_, index) => {
            if (selectedDays[index] && startTime && endTime) {
                return { start: startTime, end: endTime };
            }
            return currentWorkingHours[index] || null;
        });

        const hasChanged = updated.some((hours, index) => {
            const current = currentWorkingHours[index];
            if (selectedDays[index]) {
                return (
                    !current ||
                    current.start !== startTime ||
                    current.end !== endTime
                );
            }
            return hours !== current;
        });

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

    const formatTimeMask = (inputValue: string): string => {
        const cleanDigits = inputValue.replace(/\D/g, "");

        if (cleanDigits.length === 0) return "";

        const limitedDigits = cleanDigits.slice(0, 8);

        let formatted = "";

        if (limitedDigits.length <= 2) {
            const hours = limitedDigits;
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
            const startH = limitedDigits.slice(0, 2);
            const startM = limitedDigits.slice(2);

            let hours = parseInt(startH, 10) || 0;
            if (startH.length === 2 && hours > 23) {
                hours = 23;
            }
            const formattedHours = hours.toString().padStart(2, "0");

            if (startM.length > 0) {
                let minutes = parseInt(startM, 10) || 0;
                if (startM.length === 2) {
                    if (minutes > 59) {
                        minutes = 59;
                    }
                    const formattedMinutes = minutes
                        .toString()
                        .padStart(2, "0");
                    formatted = `${formattedHours}:${formattedMinutes}`;
                } else {
                    if (startM.length === 1 && parseInt(startM, 10) > 5) {
                        formatted = `${formattedHours}:5`;
                    } else {
                        formatted = `${formattedHours}:${startM}`;
                    }
                }
            } else {
                formatted = `${formattedHours}:`;
            }
        } else if (limitedDigits.length <= 6) {
            const startH = limitedDigits.slice(0, 2);
            const startM = limitedDigits.slice(2, 4);
            const endH = limitedDigits.slice(4);

            let startHours = parseInt(startH, 10) || 0;
            let startMinutes = parseInt(startM, 10) || 0;
            if (startHours > 23) startHours = 23;
            if (startMinutes > 59) startMinutes = 59;
            const formattedStart = `${startHours
                .toString()
                .padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;

            if (endH.length > 0) {
                let endHours = parseInt(endH, 10) || 0;
                if (endH.length === 2 && endHours > 23) {
                    endHours = 23;
                }
                const formattedEndH =
                    endH.length === 2
                        ? endHours.toString().padStart(2, "0")
                        : endH;
                formatted = `${formattedStart} - ${formattedEndH}`;
            } else {
                formatted = `${formattedStart} - `;
            }
        } else {
            const startH = limitedDigits.slice(0, 2);
            const startM = limitedDigits.slice(2, 4);
            const endH = limitedDigits.slice(4, 6);
            const endM = limitedDigits.slice(6);

            let startHours = parseInt(startH, 10) || 0;
            let startMinutes = parseInt(startM, 10) || 0;
            if (startHours > 23) startHours = 23;
            if (startMinutes > 59) startMinutes = 59;
            const formattedStart = `${startHours
                .toString()
                .padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;

            let endHours = parseInt(endH, 10) || 0;
            if (endHours > 23) endHours = 23;

            if (endM.length === 2) {
                let endMinutes = parseInt(endM, 10) || 0;
                if (endMinutes > 59) endMinutes = 59;
                const formattedEnd = `${endHours
                    .toString()
                    .padStart(2, "0")}:${endMinutes
                    .toString()
                    .padStart(2, "0")}`;
                formatted = `${formattedStart} - ${formattedEnd}`;
            } else if (endM.length === 1) {
                let endMinutes = parseInt(endM, 10) || 0;
                if (endMinutes > 5) endMinutes = 5;
                const formattedEnd = `${endHours
                    .toString()
                    .padStart(2, "0")}:${endMinutes}`;
                formatted = `${formattedStart} - ${formattedEnd}`;
            } else {
                const formattedEnd = `${endHours.toString().padStart(2, "0")}:`;
                formatted = `${formattedStart} - ${formattedEnd}`;
            }
        }

        return formatted;
    };

    const handleTimeRangeChange = (value: string) => {
        const formatted = formatTimeMask(value);
        setTimeInputValue(formatted);

        const digits = value.replace(/\D/g, "");

        if (digits.length >= 4) {
            const startH = digits.slice(0, 2);
            const startM = digits.slice(2, 4);
            let hours = parseInt(startH, 10) || 0;
            let minutes = parseInt(startM, 10) || 0;

            hours = Math.min(23, Math.max(0, hours));
            minutes = Math.min(59, Math.max(0, minutes));

            const formattedStart = `${hours
                .toString()
                .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
            setStartTime(formattedStart);
        } else if (digits.length === 0) {
            setStartTime("");
        }

        if (digits.length >= 8) {
            const endH = digits.slice(4, 6);
            const endM = digits.slice(6, 8);
            let hours = parseInt(endH, 10) || 0;
            let minutes = parseInt(endM, 10) || 0;

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

    useEffect(() => {
        const currentDigits = timeInputValue.replace(/\D/g, "");
        const hasPartialInput =
            currentDigits.length > 0 && currentDigits.length < 8;

        if (startTime && endTime && !hasPartialInput) {
            const formatted = `${startTime} - ${endTime}`;
            const formattedDigits = formatted.replace(/\D/g, "");

            if (currentDigits !== formattedDigits) {
                setTimeInputValue(formatted);
            }
        } else if (
            !startTime &&
            !endTime &&
            timeInputValue &&
            !hasPartialInput
        ) {
            if (currentDigits.length === 0) {
                setTimeInputValue("");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTime, endTime]);

    return (
        <div>
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
