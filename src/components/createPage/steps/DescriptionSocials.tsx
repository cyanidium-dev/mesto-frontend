"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { BaseFormValues } from "@/types/formValues";

interface DescriptionSocialsProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues>;
}

const SocialLinksInput = () => {
    const { values, setFieldValue } = useFormikContext<BaseFormValues>();
    const socialLinks = values.socialLinks || [];

    const addSocialLink = () => {
        setFieldValue("socialLinks", [...socialLinks, ""]);
    };

    const updateSocialLink = (index: number, value: string) => {
        const updated = [...socialLinks];
        updated[index] = value;
        setFieldValue("socialLinks", updated);
    };

    const removeSocialLink = (index: number) => {
        setFieldValue(
            "socialLinks",
            socialLinks.filter((_, i) => i !== index)
        );
    };

    return (
        <div>
            <p className="mb-2 text-[14px]">Социальные сети (необязательно)</p>
            {socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                    <CustomizedInput
                        fieldName={`socialLinks[${index}]`}
                        inputType="url"
                        placeholder="https://..."
                        errors={{}}
                        touched={{}}
                        fieldClassName="flex-1"
                    />
                    <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="px-3 text-red-500"
                    >
                        ×
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addSocialLink}
                className="text-[12px] text-primary underline"
            >
                + Добавить ссылку
            </button>
        </div>
    );
};

export const DescriptionSocials = ({
    setCurrentStep,
    formProps,
}: DescriptionSocialsProps) => {
    const { errors, touched, values } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Описание и ссылки</SectionTitle>
                <CustomizedInput
                    fieldName="description"
                    inputType="text"
                    placeholder="Опишите ваше событие"
                    label="Описание (необязательно)"
                    as="textarea"
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-6"
                />
                <CustomizedInput
                    fieldName="siteLink"
                    inputType="url"
                    placeholder="https://..."
                    label="Сайт (необязательно)"
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-6"
                />
                <SocialLinksInput />
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
