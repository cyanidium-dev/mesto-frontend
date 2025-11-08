"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import SelectInput from "../../shared/formComponents/SelectInput";
import { BaseFormValues } from "@/types/formValues";

interface InterestsProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues & { tagPreset?: string }>;
}

const tagPresets = [
    {
        value: "professional-services",
        label: "Профессиональные услуги",
        tags: ["СТО", "Тренера", "Красота"],
    },
    {
        value: "local-business",
        label: "Местный бизнес",
        tags: ["Успех", "Сила", "Мудрость"],
    },
    {
        value: "artisan",
        label: "Ремесленник",
        tags: ["Творчество", "Инновации", "Вдохновение"],
    },
    {
        value: "sports-fitness",
        label: "Спорт и фитнес",
        tags: ["Энергия", "Сила", "Дисциплина"],
    },
    {
        value: "arts-culture",
        label: "Искусство и культура",
        tags: ["Творчество", "Вдохновение", "Гармония"],
    },
    {
        value: "education",
        label: "Образование",
        tags: ["Мудрость", "Потенциал", "Стратегия"],
    },
    {
        value: "wellness",
        label: "Здоровье и благополучие",
        tags: ["Гармония", "Доброта", "Устойчивость"],
    },
    {
        value: "business-entrepreneurship",
        label: "Бизнес и предпринимательство",
        tags: ["Успех", "Инновации", "Решительность"],
    },
    {
        value: "community-social",
        label: "Сообщество и социальная деятельность",
        tags: ["Сострадание", "Доброта", "Согласие"],
    },
    {
        value: "technology",
        label: "Технологии",
        tags: ["Инновации", "Стратегия", "Потенциал"],
    },
];

const presetOptions = tagPresets.map(preset => ({
    value: preset.value,
    label: preset.label,
}));

const allTags = [
    { value: "СТО", label: "СТО" },
    { value: "Тренера", label: "Тренера" },
    { value: "Красота", label: "Красота" },
    { value: "Успех", label: "Успех" },
    { value: "Сила", label: "Сила" },
    { value: "Мудрость", label: "Мудрость" },
    { value: "Дисциплина", label: "Дисциплина" },
    { value: "Сострадание", label: "Сострадание" },
    { value: "Уверенность", label: "Уверенность" },
    { value: "Творчество", label: "Творчество" },
    { value: "Стратегия", label: "Стратегия" },
    { value: "Потенциал", label: "Потенциал" },
    { value: "Надежда", label: "Надежда" },
    { value: "Смелость", label: "Смелость" },
    { value: "Решительность", label: "Решительность" },
    { value: "Инновации", label: "Инновации" },
    { value: "Вдохновение", label: "Вдохновение" },
    { value: "Согласие", label: "Согласие" },
    { value: "Доброта", label: "Доброта" },
    { value: "Устойчивость", label: "Устойчивость" },
    { value: "Энергия", label: "Энергия" },
    { value: "Целеустремленность", label: "Целеустремленность" },
    { value: "Честность", label: "Честность" },
    { value: "Справедливость", label: "Справедливость" },
    { value: "Гармония", label: "Гармония" },
];

const TagSelector = () => {
    const { values, setFieldValue } = useFormikContext<
        BaseFormValues & { tagPreset?: string }
    >();
    const currentTags = values.tags || [];
    const selectedPreset = values.tagPreset || "";

    // Update tags when preset changes
    useEffect(() => {
        if (selectedPreset) {
            const preset = tagPresets.find(p => p.value === selectedPreset);
            if (preset) {
                setFieldValue("tags", preset.tags);
            }
        }
    }, [selectedPreset, setFieldValue]);

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
        // Clear preset when manually selecting tags
        if (selectedPreset) {
            setFieldValue("tagPreset", "");
        }
    };

    return (
        <div>
            <div className="mb-6">
                <SelectInput
                    fieldName="tagPreset"
                    label="Или найдите свое:"
                    placeholder="Выбрать"
                    options={presetOptions}
                    labelClassName="mb-3"
                />
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
                <SectionTitle className="mb-6">Интересы</SectionTitle>
                <p className="mb-6 text-[14px]">
                    Выберите до 4 тегов интересов, которые более релеванты
                    вашему событию
                </p>
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
