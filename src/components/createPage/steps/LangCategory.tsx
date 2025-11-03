"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import SelectInput from "../../shared/formComponents/SelectInput";
import { BaseFormValues } from "@/types/formValues";

interface LangCategoryProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues>;
}

const categories = [
    { value: "sport", label: "Спорт" },
    { value: "music", label: "Музыка" },
    { value: "food", label: "Еда" },
    { value: "art", label: "Искусство" },
    { value: "tech", label: "Технологии" },
    { value: "social", label: "Общение" },
    { value: "services", label: "Услуги" },
];

const languages = [
    { value: "ru", label: "Русский" },
    { value: "en", label: "English" },
    { value: "uk", label: "Українська" },
    { value: "es", label: "Español" },
    { value: "de", label: "Deutsch" },
    { value: "fr", label: "Français" },
];

const LanguageSelector = () => {
    const { values, setFieldValue } = useFormikContext<BaseFormValues>();
    const currentLanguages = values.languages || [];

    const handleLanguageClick = (langValue: string) => {
        if (currentLanguages.includes(langValue)) {
            setFieldValue(
                "languages",
                currentLanguages.filter(l => l !== langValue)
            );
        } else {
            if (currentLanguages.length < 3) {
                setFieldValue("languages", [...currentLanguages, langValue]);
            }
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {languages.map(lang => (
                <div
                    key={lang.value}
                    onClick={() => handleLanguageClick(lang.value)}
                    className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full border text-[12px] cursor-pointer transition duration-300 ease-in-out ${
                        currentLanguages.includes(lang.value)
                            ? "bg-primary text-white border-primary"
                            : "bg-transparent text-gray-dark border-gray-light"
                    }`}
                >
                    {lang.label}
                </div>
            ))}
        </div>
    );
};

export const LangCategory = ({
    setCurrentStep,
    formProps,
}: LangCategoryProps) => {
    const { errors, values } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Категория и языки</SectionTitle>
                <SelectInput
                    fieldName="category"
                    label="Категория"
                    required
                    placeholder="Выберите категорию"
                    options={categories}
                    labelClassName="mb-6"
                />
                <div>
                    <p className="mb-3 text-[14px]">Языки (выберите 1-3)</p>
                    <LanguageSelector />
                </div>
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={
                    !values.category ||
                    !!errors.category ||
                    (values.languages?.length ?? 0) < 1
                }
            >
                Продолжить
            </MainButton>
        </div>
    );
};
