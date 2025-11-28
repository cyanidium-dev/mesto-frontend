import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { BaseFormValues } from "@/types/formValues";

interface TitleProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues>;
}

const description = {
    event: {
        title: "Придумайте название для вашего события",
        placeholder: "Название события",
        note: "Не более 70 символов",
    },
    company: {
        title: "Придумайте название для вашей бизнес-точки",
        placeholder: "Название",
        note: "Не более 100 символов",
    },
};

export const Title = ({ setCurrentStep, formProps }: TitleProps) => {
    const { errors, touched, values } = formProps;

    let type: "event" | "company";
    if ("userType" in values && values.userType) {
        type = "company";
    } else {
        type = "event";
    }

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Название</SectionTitle>
                <CustomizedInput
                    fieldName="title"
                    inputType="text"
                    placeholder={description[type].placeholder}
                    label={description[type].title}
                    isRequired
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-2"
                />
                <p className="text-[12px] text-gray-placeholder">
                    {description[type].note}
                </p>
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={!values.title || !!errors.title}
            >
                Продолжить
            </MainButton>
        </div>
    );
};
