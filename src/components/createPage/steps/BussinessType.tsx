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
        value: "company",
        emoji: "/images/icons/man.png",
    },
    {
        label: "Индивидуальный",
        value: "individual",
        emoji: "/images/icons/girl.png",
    },
];

export const BussinessType = ({
    setCurrentStep,
    formProps,
}: BussinessTypeProps) => {
    const { errors, values } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Тип пользователя</SectionTitle>
                <p className="mb-6 text-[14px] text-gray-text text-center">
                    Выберите тип вашего бизнеса
                </p>
                <ImageRadioButtonInput
                    fieldName="userType"
                    options={userTypes}
                />
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
