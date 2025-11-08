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

export const Title = ({ setCurrentStep, formProps }: TitleProps) => {
    const { errors, touched, values } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Название</SectionTitle>
                <CustomizedInput
                    fieldName="title"
                    inputType="text"
                    placeholder="Название события"
                    label="Придумайте название для вашего события"
                    isRequired
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-2"
                />
                <p className="text-[12px] text-gray-text mb-6">
                    Не более 70 символов
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
