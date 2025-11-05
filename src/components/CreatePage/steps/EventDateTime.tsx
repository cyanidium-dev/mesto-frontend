import { Dispatch, SetStateAction, useMemo } from "react";
import { FormikProps } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { EventFormValues } from "@/types/formValues";
import { WheelPicker } from "@/components/shared/formComponents/WheelPicker";

interface EventDateTimeProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues>;
}

export const EventDateTime = ({
    setCurrentStep,
    formProps,
}: EventDateTimeProps) => {
    const { errors, touched, values, setFieldValue } = formProps;

    // Convert 24h time to 12h format for display
    const time12h = useMemo(() => {
        const timeStr = values.startTime || "00:00";
        const [hourStr, minuteStr] = timeStr.split(":");
        const hour24 = Number(hourStr || 0);
        const minute = Number(minuteStr || 0);

        let hour12 = hour24 % 12;
        if (hour12 === 0) hour12 = 12;
        const ampm: "AM" | "PM" = hour24 < 12 ? "AM" : "PM";

        return { hour12, minute, ampm };
    }, [values.startTime]);

    // Convert 12h time to 24h format for storage
    const convertTo24h = (
        hour12: number,
        minute: number,
        ampm: "AM" | "PM"
    ) => {
        let hour24 = hour12 % 12;
        if (ampm === "PM") hour24 += 12;
        return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Дата и время</SectionTitle>
                <CustomizedInput
                    fieldName="startDate"
                    inputType="date"
                    placeholder=""
                    label="Дата начала"
                    isRequired
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-6"
                />
                <div className="mb-4">
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
                            Указать дату окончания
                        </span>
                    </label>
                </div>
                {(values.hasEndDate as boolean) && (
                    <CustomizedInput
                        fieldName="endDate"
                        inputType="date"
                        placeholder=""
                        label="Дата окончания"
                        errors={errors}
                        touched={touched}
                        labelClassName="mb-6"
                    />
                )}
                <CustomizedInput
                    fieldName="startTime"
                    inputType="time"
                    placeholder=""
                    label="Время начала"
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-6"
                />
                <WheelPicker
                    hourValue={time12h.hour12}
                    minuteValue={time12h.minute}
                    ampmValue={time12h.ampm}
                    onHourChange={hour =>
                        setFieldValue(
                            "startTime",
                            convertTo24h(hour, time12h.minute, time12h.ampm)
                        )
                    }
                    onMinuteChange={minute =>
                        setFieldValue(
                            "startTime",
                            convertTo24h(time12h.hour12, minute, time12h.ampm)
                        )
                    }
                    onAmpmChange={ampm =>
                        setFieldValue(
                            "startTime",
                            convertTo24h(time12h.hour12, time12h.minute, ampm)
                        )
                    }
                    timeFormat="12h"
                    containerHeight={210}
                    itemHeight={32}
                />
                <div className="mb-4">
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
                            Указать время окончания
                        </span>
                    </label>
                </div>
                {(values.hasEndTime as boolean) && (
                    <CustomizedInput
                        fieldName="endTime"
                        inputType="time"
                        placeholder=""
                        label="Время окончания"
                        errors={errors}
                        touched={touched}
                    />
                )}
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
