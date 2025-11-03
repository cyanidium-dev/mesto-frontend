"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import { BaseFormValues } from "@/types/formValues";

interface InterestsProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues & { tagPreset?: string }>;
}

const tagPresets = [
    {
        value: "professional-services",
        label: "Профессиональные услуги",
        tags: ["professional", "services", "quality"],
    },
    {
        value: "local-business",
        label: "Местный бизнес",
        tags: ["local", "community", "friendly"],
    },
    {
        value: "artisan",
        label: "Ремесленник",
        tags: ["handmade", "artisan", "unique"],
    },
];

const allTags = [
    { value: "professional", label: "Профессионально" },
    { value: "services", label: "Услуги" },
    { value: "quality", label: "Качественно" },
    { value: "local", label: "Местное" },
    { value: "community", label: "Для сообщества" },
    { value: "friendly", label: "Дружелюбно" },
    { value: "handmade", label: "Ручная работа" },
    { value: "artisan", label: "Ремесленник" },
    { value: "unique", label: "Уникально" },
];

const TagSelector = () => {
    const { values, setFieldValue } = useFormikContext<
        BaseFormValues & { tagPreset?: string }
    >();
    const currentTags = values.tags || [];
    const [usePreset, setUsePreset] = useState(!!values.tagPreset);

    const handleTagClick = (tagValue: string) => {
        if (currentTags.includes(tagValue)) {
            setFieldValue(
                "tags",
                currentTags.filter(t => t !== tagValue)
            );
        } else {
            if (currentTags.length < 4) {
                setFieldValue("tags", [...currentTags, tagValue]);
            }
        }
    };

    const handlePresetClick = (preset: (typeof tagPresets)[0]) => {
        setUsePreset(true);
        setFieldValue("tagPreset", preset.value);
        setFieldValue("tags", preset.tags);
    };

    if (usePreset && values.tagPreset) {
        return (
            <div>
                <p className="mb-2 text-[12px] text-gray-placeholder">
                    Выбранный пресет:{" "}
                    {tagPresets.find(p => p.value === values.tagPreset)?.label}
                </p>
                <button
                    type="button"
                    onClick={() => {
                        setUsePreset(false);
                        setFieldValue("tagPreset", undefined);
                        setFieldValue("tags", []);
                    }}
                    className="text-[12px] text-primary underline mb-3"
                >
                    Выбрать теги вручную
                </button>
            </div>
        );
    }

    return (
        <div>
            <p className="mb-3 text-[14px]">Выберите пресет или теги (1-4)</p>
            <div className="mb-4">
                <p className="mb-2 text-[12px] text-gray-placeholder">
                    Пресеты тегов:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tagPresets.map(preset => (
                        <div
                            key={preset.value}
                            onClick={() => handlePresetClick(preset)}
                            className="inline-flex items-center justify-center px-2.5 py-1 rounded-full border text-[12px] cursor-pointer transition duration-300 ease-in-out bg-transparent text-gray-dark border-gray-light hover:border-primary"
                        >
                            {preset.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                    <div
                        key={tag.value}
                        onClick={() => handleTagClick(tag.value)}
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full border text-[12px] cursor-pointer transition duration-300 ease-in-out ${
                            currentTags.includes(tag.value)
                                ? "bg-primary text-white border-primary"
                                : "bg-transparent text-gray-dark border-gray-light"
                        }`}
                    >
                        {tag.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Interests = ({ setCurrentStep, formProps }: InterestsProps) => {
    const { errors, values } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Теги</SectionTitle>
                <TagSelector />
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={(values.tags?.length ?? 0) < 1 || !!errors.tags}
            >
                Продолжить
            </MainButton>
        </div>
    );
};
