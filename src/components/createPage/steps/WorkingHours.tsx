"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { BusinessFormValues } from "@/types/formValues";

interface WorkingHoursProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BusinessFormValues>;
}

const days = [
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
    const workingHours = values.workingHours || [];

    const updateHours = (
        day: number,
        field: "start" | "end",
        value: string
    ) => {
        const updated = [...workingHours];
        if (!updated[day]) {
            updated[day] = { start: "", end: "" };
        }
        updated[day][field] = value;
        setFieldValue("workingHours", updated);
    };

    return (
        <div>
            <p className="mb-3 text-[14px]">Рабочие часы</p>
            <div className="space-y-3">
                {days.map((day, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-[100px] text-[14px]">{day}</div>
                        <CustomizedInput
                            fieldName={`workingHours[${index}].start`}
                            inputType="time"
                            placeholder="Начало"
                            errors={{}}
                            touched={{}}
                            fieldClassName="flex-1"
                        />
                        <span className="text-[14px]">-</span>
                        <CustomizedInput
                            fieldName={`workingHours[${index}].end`}
                            inputType="time"
                            placeholder="Конец"
                            errors={{}}
                            touched={{}}
                            fieldClassName="flex-1"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const WorkingHours = ({
    setCurrentStep,
    formProps,
}: WorkingHoursProps) => {
    const { values } = formProps;

    // Company: working hours
    if (values.userType === "company") {
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
    }
};
