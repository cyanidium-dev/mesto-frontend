"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import ImageRadioButtonInput from "../../shared/formComponents/ImageRadioButtonInput";
import { BusinessFormValues } from "@/types/formValues";

interface BussinessTypeProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BusinessFormValues>;
}

const userTypes = [
    {
        label: "Компания",
        value: "business",
        emoji: "/images/icons/office-building.png",
    },
    {
        label: "Частное лицо",
        value: "individual",
        emoji: "/images/icons/smiling-face-with-sunglasses.png",
    },
];

const getDescription = (
    selectedValue: "business" | "individual" | ""
): string => {
    switch (selectedValue) {
        case "business":
            return "Компания - это мы";
        case "individual":
            return "Частное лицо - (предпринематель) явно не общественное";
        default:
            return "";
    }
};

export const BussinessType = ({
    setCurrentStep,
    formProps,
}: BussinessTypeProps) => {
    const { errors, values } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Кто вы?</SectionTitle>
                <p className="mb-6 text-[14px] text-gray-text">
                    Выберите свое позиционирование
                </p>
                <ImageRadioButtonInput
                    fieldName="userType"
                    options={userTypes}
                />
                {values.userType && (
                    <p className="text-[14px] text-gray-text mt-3">
                        {getDescription(values.userType)}
                    </p>
                )}
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={!(values.userType as string) || !!errors.userType}
            >
                Продолжить
            </MainButton>
        </div>
    );
};
