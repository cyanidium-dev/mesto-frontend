import {
    Dispatch,
    SetStateAction,
    useRef,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import { FormikProps, ErrorMessage } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import { EventFormValues } from "@/types/formValues";
import CalendarIcon from "../../shared/icons/CalendarIcon";
import ClockIcon from "../../shared/icons/ClockIcon";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";

interface EventDateTimeProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues>;
}

export const EventDateTime = ({
    setCurrentStep,
    formProps,
}: EventDateTimeProps) => {
    const { errors, values, setFieldValue } = formProps;
    const datePickerRef = useRef<HTMLInputElement>(null);
    const endDatePickerRef = useRef<HTMLInputElement>(null);
    const startTimePickerRef = useRef<HTMLInputElement>(null);
    const endTimePickerRef = useRef<HTMLInputElement>(null);

    const localeFormat = useMemo(() => {
        const formatter = new Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const parts = formatter.formatToParts(new Date(2024, 11, 25));
        const separator = parts.find(p => p.type === "literal")?.value || "/";

        return { separator };
    }, []);

    const dateSeparator = localeFormat.separator;

    const parseDateFromLocale = useMemo(() => {
        return (dateString: string) => {
            if (!dateString) return "";
            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) {
                    const parts = dateString.split(/\D/);
                    if (parts.length === 3) {
                        let year = "";
                        let month = "";
                        let day = "";

                        const formatter = new Intl.DateTimeFormat(
                            navigator.language,
                            {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            }
                        );
                        const formatParts = formatter.formatToParts(
                            new Date(2024, 11, 25)
                        );
                        const orderedParts = formatParts.filter(
                            p => p.type !== "literal"
                        );

                        orderedParts.forEach((part, i) => {
                            if (part.type === "month")
                                month = parts[i].padStart(2, "0");
                            if (part.type === "day")
                                day = parts[i].padStart(2, "0");
                            if (part.type === "year") year = parts[i];
                        });

                        if (year && month && day) {
                            return `${year}-${month}-${day}`;
                        }
                    }
                    return "";
                }
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            } catch {
                return "";
            }
        };
    }, []);

    useEffect(() => {
        if (datePickerRef.current && values.startDate) {
            const dateValue =
                typeof values.startDate === "string" &&
                !values.startDate.includes("-")
                    ? parseDateFromLocale(values.startDate)
                    : values.startDate;
            if (dateValue) {
                datePickerRef.current.value = dateValue as string;
            }
        }
    }, [values.startDate, parseDateFromLocale]);

    useEffect(() => {
        if (endDatePickerRef.current && values.endDate) {
            const dateValue =
                typeof values.endDate === "string" &&
                !values.endDate.includes("-")
                    ? parseDateFromLocale(values.endDate)
                    : values.endDate;
            if (dateValue) {
                endDatePickerRef.current.value = dateValue as string;
            }
        }
    }, [values.endDate, parseDateFromLocale]);

    useEffect(() => {
        if (startTimePickerRef.current && values.startTime) {
            startTimePickerRef.current.value = values.startTime as string;
        }
    }, [values.startTime]);

    useEffect(() => {
        if (endTimePickerRef.current && values.endTime) {
            endTimePickerRef.current.value = values.endTime as string;
        }
    }, [values.endTime]);

    const getDateFormatParts = useMemo(() => {
        const formatter = new Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const parts = formatter.formatToParts(new Date(2024, 11, 25));
        return parts.filter(p => p.type !== "literal");
    }, []);

    const validateAndSnapDate = useCallback(
        (dateString: string): string => {
            if (!dateString) return "";

            const parts = dateString.split(/\D/);
            if (parts.length === 0) return "";

            let year = "";
            let month = "";
            let day = "";

            getDateFormatParts.forEach((part, i) => {
                if (i < parts.length) {
                    if (part.type === "month") month = parts[i];
                    if (part.type === "day") day = parts[i];
                    if (part.type === "year") year = parts[i];
                }
            });

            if (month && month.length === 2) {
                const monthNum = parseInt(month, 10);
                if (!isNaN(monthNum)) {
                    if (monthNum < 1) month = "01";
                    else if (monthNum > 12) month = "12";
                    else month = String(monthNum).padStart(2, "0");
                }
            }

            if (year && year.length === 4) {
                const yearNum = parseInt(year, 10);
                if (!isNaN(yearNum)) {
                    if (yearNum < 1900) year = "1900";
                    else if (yearNum > 2100) year = "2100";
                    else year = String(yearNum);
                }
            }

            if (day && day.length === 2 && month && month.length === 2) {
                const dayNum = parseInt(day, 10);
                if (!isNaN(dayNum)) {
                    const monthNum = parseInt(month, 10) || 1;
                    const yearNum =
                        parseInt(year, 10) || new Date().getFullYear();
                    const daysInMonth = new Date(
                        yearNum,
                        monthNum,
                        0
                    ).getDate();

                    if (dayNum < 1) day = "01";
                    else if (dayNum > daysInMonth)
                        day = String(daysInMonth).padStart(2, "0");
                    else day = String(dayNum).padStart(2, "0");
                }
            }

            const validatedParts: string[] = [];
            getDateFormatParts.forEach((part, i) => {
                if (i < parts.length) {
                    if (part.type === "month")
                        validatedParts.push(month || parts[i]);
                    else if (part.type === "day")
                        validatedParts.push(day || parts[i]);
                    else if (part.type === "year")
                        validatedParts.push(year || parts[i]);
                }
            });

            return validatedParts.join(dateSeparator);
        },
        [getDateFormatParts, dateSeparator]
    );

    const validateAndSnapTime = (timeString: string): string => {
        if (!timeString) return "";

        const parts = timeString.split(":");
        if (parts.length === 0) return "";

        let hours = parts[0] || "";
        let minutes = parts[1] || "";

        if (hours && hours.length === 2) {
            const hoursNum = parseInt(hours, 10);
            if (!isNaN(hoursNum)) {
                if (hoursNum < 0) hours = "00";
                else if (hoursNum > 23) hours = "23";
                else hours = String(hoursNum).padStart(2, "0");
            }
        }

        if (minutes && minutes.length === 2) {
            const minutesNum = parseInt(minutes, 10);
            if (!isNaN(minutesNum)) {
                if (minutesNum < 0) minutes = "00";
                else if (minutesNum > 59) minutes = "59";
                else minutes = String(minutesNum).padStart(2, "0");
            }
        }

        if (hours && minutes) return `${hours}:${minutes}`;
        if (hours) return `${hours}:`;
        return "";
    };

    const formatDateForDisplay = (dateString: string | undefined) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            const formatter = new Intl.DateTimeFormat(navigator.language, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            return formatter.format(date);
        } catch {
            return "";
        }
    };

    const applyDateMask = useMemo(() => {
        return (value: string) => {
            const digits = value.replace(/\D/g, "");
            if (digits.length === 0) return "";

            let masked = "";
            let digitIndex = 0;

            for (
                let i = 0;
                i < getDateFormatParts.length && digitIndex < digits.length;
                i++
            ) {
                const part = getDateFormatParts[i];

                if (part.type === "month" || part.type === "day") {
                    if (digitIndex < digits.length) {
                        masked += digits[digitIndex++];
                        if (digitIndex < digits.length) {
                            masked += digits[digitIndex++];
                        }
                    }
                } else if (part.type === "year") {
                    for (let j = 0; j < 4 && digitIndex < digits.length; j++) {
                        masked += digits[digitIndex++];
                    }
                }

                if (
                    i < getDateFormatParts.length - 1 &&
                    digitIndex < digits.length
                ) {
                    masked += dateSeparator;
                }
            }

            return validateAndSnapDate(masked);
        };
    }, [dateSeparator, getDateFormatParts, validateAndSnapDate]);

    const applyTimeMask = (value: string) => {
        const digits = value.replace(/\D/g, "");
        let masked = "";
        for (let i = 0; i < digits.length && i < 4; i++) {
            if (i === 2) {
                masked += ":";
            }
            masked += digits[i];
        }

        return validateAndSnapTime(masked);
    };

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Дата и время</SectionTitle>
                <p className="mb-6">Уточните когда будет ваше событие:</p>

                <div className="mb-4">
                    <label className="text-[14px] font-medium">
                        Установите дату
                    </label>
                </div>
                <div className="mb-4">
                    <div className="relative flex flex-col w-full">
                        <div className="relative w-full">
                            <div className="relative">
                                <CustomizedInput
                                    fieldName="startDate"
                                    placeholder=""
                                    errors={errors}
                                    touched={formProps.touched}
                                    inputType="text"
                                    fieldClassName="pr-12 text-right"
                                    onChange={e => {
                                        const masked = applyDateMask(
                                            e.target.value
                                        );
                                        e.target.value = masked;

                                        setFieldValue("startDate", masked);

                                        if (masked) {
                                            const isoDate =
                                                parseDateFromLocale(masked);
                                            if (
                                                isoDate &&
                                                datePickerRef.current
                                            ) {
                                                datePickerRef.current.value =
                                                    isoDate;
                                            }
                                        }
                                    }}
                                />
                                <input
                                    ref={datePickerRef}
                                    type="date"
                                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                                    onChange={e => {
                                        if (e.target.value) {
                                            const formatted =
                                                formatDateForDisplay(
                                                    e.target.value
                                                );
                                            setFieldValue(
                                                "startDate",
                                                formatted
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
                                <span className="text-placeholder">
                                    {(values.hasEndDate as boolean)
                                        ? "Начало:"
                                        : "Дата:"}
                                </span>
                                <div className="flex items-center gap-2 justify-end">
                                    <button
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            if (datePickerRef.current) {
                                                if (
                                                    typeof datePickerRef.current
                                                        .showPicker ===
                                                    "function"
                                                ) {
                                                    datePickerRef.current.showPicker();
                                                } else {
                                                    datePickerRef.current.focus();
                                                    datePickerRef.current.click();
                                                }
                                            }
                                        }}
                                        className="flex items-center justify-center text-gray-dark hover:text-primary transition-colors pointer-events-auto"
                                    >
                                        <CalendarIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ErrorMessage
                            name="startDate"
                            component="p"
                            className="absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500"
                        />
                    </div>
                </div>
                {(values.hasEndDate as boolean) && (
                    <div className="mb-4">
                        <div className="relative flex flex-col w-full">
                            <div className="relative w-full">
                                <div className="relative">
                                    <CustomizedInput
                                        fieldName="endDate"
                                        placeholder=""
                                        errors={errors}
                                        touched={formProps.touched}
                                        inputType="text"
                                        fieldClassName="pr-12 text-right"
                                        onChange={e => {
                                            const masked = applyDateMask(
                                                e.target.value
                                            );
                                            e.target.value = masked;

                                            setFieldValue("endDate", masked);

                                            if (masked) {
                                                const isoDate =
                                                    parseDateFromLocale(masked);
                                                if (
                                                    isoDate &&
                                                    endDatePickerRef.current
                                                ) {
                                                    endDatePickerRef.current.value =
                                                        isoDate;
                                                }
                                            }
                                        }}
                                    />
                                    <input
                                        ref={endDatePickerRef}
                                        type="date"
                                        className="absolute opacity-0 pointer-events-none w-0 h-0"
                                        onChange={e => {
                                            if (e.target.value) {
                                                const formatted =
                                                    formatDateForDisplay(
                                                        e.target.value
                                                    );
                                                setFieldValue(
                                                    "endDate",
                                                    formatted
                                                );
                                            }
                                        }}
                                    />
                                </div>
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
                                    <span className="text-placeholder">
                                        Конец:
                                    </span>
                                    <div className="flex items-center gap-2 justify-end">
                                        <button
                                            type="button"
                                            onClick={e => {
                                                e.stopPropagation();
                                                if (endDatePickerRef.current) {
                                                    if (
                                                        typeof endDatePickerRef
                                                            .current
                                                            .showPicker ===
                                                        "function"
                                                    ) {
                                                        endDatePickerRef.current.showPicker();
                                                    } else {
                                                        endDatePickerRef.current.focus();
                                                        endDatePickerRef.current.click();
                                                    }
                                                }
                                            }}
                                            className="flex items-center justify-center text-gray-dark hover:text-primary transition-colors pointer-events-auto"
                                        >
                                            <CalendarIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ErrorMessage
                                name="endDate"
                                component="p"
                                className="absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500"
                            />
                        </div>
                    </div>
                )}
                <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={(values.hasEndDate as boolean) || false}
                            onChange={e =>
                                setFieldValue("hasEndDate", e.target.checked)
                            }
                            className="w-4 h-4"
                        />
                        <span className="text-[14px]">
                            Добавить время завершения
                        </span>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="text-[14px] font-medium">
                        Установите время
                    </label>
                </div>

                <div className="mb-4 relative">
                    <div className="relative flex flex-col w-full">
                        <div className="relative w-full">
                            <div className="relative">
                                <CustomizedInput
                                    fieldName="startTime"
                                    placeholder=""
                                    errors={errors}
                                    touched={formProps.touched}
                                    inputType="text"
                                    fieldClassName="pr-12 text-right"
                                    onChange={e => {
                                        const masked = applyTimeMask(
                                            e.target.value
                                        );
                                        e.target.value = masked;

                                        setFieldValue("startTime", masked);

                                        if (
                                            masked &&
                                            masked.length === 5 &&
                                            startTimePickerRef.current
                                        ) {
                                            startTimePickerRef.current.value =
                                                masked;
                                        }
                                    }}
                                />
                                <input
                                    ref={startTimePickerRef}
                                    type="time"
                                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                                    onChange={e => {
                                        if (e.target.value) {
                                            setFieldValue(
                                                "startTime",
                                                e.target.value
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
                                <span className="text-placeholder">
                                    {(values.hasEndTime as boolean)
                                        ? "Начало:"
                                        : "Встреча в:"}
                                </span>
                                <div className="flex items-center gap-2 justify-end">
                                    <button
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            if (startTimePickerRef.current) {
                                                if (
                                                    typeof startTimePickerRef
                                                        .current.showPicker ===
                                                    "function"
                                                ) {
                                                    startTimePickerRef.current.showPicker();
                                                } else {
                                                    startTimePickerRef.current.focus();
                                                    startTimePickerRef.current.click();
                                                }
                                            }
                                        }}
                                        className="flex items-center justify-center text-gray-dark hover:text-primary transition-colors pointer-events-auto"
                                    >
                                        <ClockIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ErrorMessage
                            name="startTime"
                            component="p"
                            className="absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500"
                        />
                    </div>
                </div>
                {(values.hasEndTime as boolean) && (
                    <div className="mb-4 relative">
                        <div className="relative flex flex-col w-full">
                            <div className="relative w-full">
                                <div className="relative">
                                    <CustomizedInput
                                        fieldName="endTime"
                                        placeholder=""
                                        errors={errors}
                                        touched={formProps.touched}
                                        inputType="text"
                                        fieldClassName="pr-12 text-right"
                                        onChange={e => {
                                            const masked = applyTimeMask(
                                                e.target.value
                                            );
                                            e.target.value = masked;

                                            setFieldValue("endTime", masked);

                                            if (
                                                masked &&
                                                masked.length === 5 &&
                                                endTimePickerRef.current
                                            ) {
                                                endTimePickerRef.current.value =
                                                    masked;
                                            }
                                        }}
                                    />
                                    <input
                                        ref={endTimePickerRef}
                                        type="time"
                                        className="absolute opacity-0 pointer-events-none w-0 h-0"
                                        onChange={e => {
                                            if (e.target.value) {
                                                setFieldValue(
                                                    "endTime",
                                                    e.target.value
                                                );
                                            }
                                        }}
                                    />
                                </div>
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
                                    <span className="text-placeholder">
                                        Конец:
                                    </span>
                                    <div className="flex items-center gap-2 justify-end">
                                        <button
                                            type="button"
                                            onClick={e => {
                                                e.stopPropagation();
                                                if (endTimePickerRef.current) {
                                                    if (
                                                        typeof endTimePickerRef
                                                            .current
                                                            .showPicker ===
                                                        "function"
                                                    ) {
                                                        endTimePickerRef.current.showPicker();
                                                    } else {
                                                        endTimePickerRef.current.focus();
                                                        endTimePickerRef.current.click();
                                                    }
                                                }
                                            }}
                                            className="flex items-center justify-center text-gray-dark hover:text-primary transition-colors pointer-events-auto"
                                        >
                                            <ClockIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ErrorMessage
                                name="endTime"
                                component="p"
                                className="absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500"
                            />
                        </div>
                    </div>
                )}
                <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={(values.hasEndTime as boolean) || false}
                            onChange={e =>
                                setFieldValue("hasEndTime", e.target.checked)
                            }
                            className="w-4 h-4"
                        />
                        <span className="text-[14px]">
                            Добавить время завершения
                        </span>
                    </label>
                </div>
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={
                    !values.startDate ||
                    !!errors.startDate ||
                    ((values.hasEndDate as boolean) &&
                        (!values.endDate || !!errors.endDate)) ||
                    ((values.hasEndTime as boolean) &&
                        (!values.endTime || !!errors.endTime))
                }
            >
                Продолжить
            </MainButton>
        </div>
    );
};
