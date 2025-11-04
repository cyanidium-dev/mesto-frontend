"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import SelectInput from "../../shared/formComponents/SelectInput";
import { BaseFormValues } from "@/types/formValues";
import Select, { MultiValue, StylesConfig } from "react-select";

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
    const { values, setFieldValue, errors, touched } = useFormikContext<BaseFormValues>();
    const selectedLanguages = values.languages || [];
    const isError = errors.languages && touched.languages;

    // Convert string array to react-select format
    const selectedOptions = languages.filter(lang =>
        selectedLanguages.includes(lang.value)
    );

    const handleChange = (
        selectedOptions: MultiValue<{ value: string; label: string }>
    ) => {
        // Convert react-select format to string array
        const values = selectedOptions
            ? selectedOptions.map(option => option.value)
            : [];
        setFieldValue("languages", values);
    };

    type OptionType = { value: string; label: string };
    const customStyles: StylesConfig<OptionType, true> = {
        control: (provided) => ({
            ...provided,
            minHeight: '37px',
            height: '37px',
            borderRadius: '9999px',
            border: `1px solid ${isError ? '#ef4444' : '#E5E7EB'}`,
            boxShadow: 'none',
            '&:hover': {
                border: `1px solid ${isError ? '#ef4444' : '#155DFC'}`,
            },
            paddingLeft: '0',
            paddingRight: '0',
            fontSize: '16px',
            cursor: 'pointer',
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: '37px',
            padding: '0 16px',
        }),
        input: (provided) => ({
            ...provided,
            margin: '0px',
            fontSize: '16px',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: '37px',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9CA3AF',
            fontSize: '16px',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#E5E7EB',
            borderRadius: '9999px',
            fontSize: '14px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#1F2937',
            padding: '2px 8px',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#6B7280',
            borderRadius: '9999px',
            '&:hover': {
                backgroundColor: '#EF4444',
                color: 'white',
            },
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#155DFC'
                : state.isFocused
                ? '#EFF6FF'
                : 'white',
            color: state.isSelected ? 'white' : '#1F2937',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#155DFC',
                color: 'white',
            },
        }),
    };

    return (
        <Select
            isMulti
            name="languages"
            options={languages}
            value={selectedOptions}
            onChange={handleChange}
            placeholder="Выберите языки"
            maxMenuHeight={200}
            isOptionDisabled={() => selectedOptions.length >= 3}
            styles={customStyles}
            className="react-select-container"
            classNamePrefix="react-select"
        />
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
                <SectionTitle className="mb-6">Категория и язык</SectionTitle>
                <SelectInput
                    fieldName="category"
                    label="Выберите к какой категории относиться ваше событие:"
                    required
                    placeholder="Выбрать категорию"
                    options={categories}
                    labelClassName="mb-6"
                />
                <div>
                    <p className="mb-3 text-[14px]">
                        Выбирите до 3 языков вашего события:
                    </p>
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
