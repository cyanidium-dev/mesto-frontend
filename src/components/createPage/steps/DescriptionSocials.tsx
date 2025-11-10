"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { BaseFormValues } from "@/types/formValues";
import Image from "next/image";
import Select, { StylesConfig } from "react-select";
import { ErrorMessage } from "formik";
import BrokenLinkIcon from "@/components/shared/icons/BrokenLinkIcon";
import LinkIcon from "@/components/shared/icons/LinkIcon";

interface DescriptionSocialsProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues>;
}

type SocialPlatform = "facebook" | "instagram" | "telegram";

interface SocialLinkItem {
    platform: SocialPlatform;
    icon: string;
    label: string;
}

const socialLinks: SocialLinkItem[] = [
    {
        platform: "facebook",
        icon: "/images/icons/facebook.svg",
        label: "Facebook",
    },
    {
        platform: "instagram",
        icon: "/images/icons/instagram.png",
        label: "Instagram",
    },
    {
        platform: "telegram",
        icon: "/images/icons/telegram.png",
        label: "Telegram",
    },
];

const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
        return false;
    }
};

const SocialLinksInput = () => {
    const { values, setFieldValue } = useFormikContext<BaseFormValues>();
    const socialMediaUrls = values.socialMediaUrls || [];
    const [editingPlatform, setEditingPlatform] =
        useState<SocialPlatform | null>(null);
    const [inputValues, setInputValues] = useState<
        Record<SocialPlatform, string>
    >({
        facebook: socialMediaUrls[0] || "",
        instagram: socialMediaUrls[1] || "",
        telegram: socialMediaUrls[2] || "",
    });

    const getPlatformIndex = (platform: SocialPlatform): number => {
        const indexMap: Record<SocialPlatform, number> = {
            facebook: 0,
            instagram: 1,
            telegram: 2,
        };
        return indexMap[platform];
    };

    const handleAddClick = (platform: SocialPlatform) => {
        const linkValue = getLinkValue(platform);
        setInputValues(prev => ({ ...prev, [platform]: linkValue }));
        setEditingPlatform(platform);
    };

    const handleInputChange = (platform: SocialPlatform, value: string) => {
        setInputValues(prev => ({ ...prev, [platform]: value }));

        // Auto-save when valid URL is entered
        if (isValidUrl(value)) {
            const index = getPlatformIndex(platform);
            const updated = [...socialMediaUrls];
            updated[index] = value;
            setFieldValue("socialMediaUrls", updated);
            setEditingPlatform(null);
        }
    };

    const handleInputBlur = (platform: SocialPlatform) => {
        const value = inputValues[platform];

        if (!value.trim() || !isValidUrl(value)) {
            setEditingPlatform(null);
            // Reset input value if invalid
            if (!isValidUrl(value) && value.trim()) {
                setInputValues(prev => ({ ...prev, [platform]: "" }));
            }
        }
    };

    const handleInputKeyDown = (
        platform: SocialPlatform,
        e: React.KeyboardEvent
    ) => {
        if (e.key === "Enter") {
            handleInputBlur(platform);
        } else if (e.key === "Escape") {
            setEditingPlatform(null);
        }
    };

    const handleDelete = (platform: SocialPlatform) => {
        const index = getPlatformIndex(platform);
        const updated = [...socialMediaUrls];
        updated[index] = "";
        setFieldValue("socialMediaUrls", updated);
        setInputValues(prev => ({ ...prev, [platform]: "" }));
        setEditingPlatform(null);
    };

    const getLinkValue = (platform: SocialPlatform): string => {
        const index = getPlatformIndex(platform);
        return socialMediaUrls[index] || "";
    };

    return (
        <div>
            <p className="mb-4 text-[14px]">Социальные сети (необязательно)</p>
            <div className="space-y-3">
                {socialLinks.map(({ platform, icon, label }) => {
                    const linkValue = getLinkValue(platform);
                    const inputValue = inputValues[platform];
                    const isEditing = editingPlatform === platform;
                    const hasValidLink = linkValue && isValidUrl(linkValue);

                    return (
                        <div key={platform} className="flex items-center gap-3">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <Image
                                    src={icon}
                                    alt={label}
                                    width={20}
                                    height={20}
                                    className="flex-shrink-0"
                                />
                                <span className="text-[14px] text-gray-text flex-shrink-0">
                                    {label}
                                </span>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={inputValue}
                                        onChange={e =>
                                            handleInputChange(
                                                platform,
                                                e.target.value
                                            )
                                        }
                                        onBlur={() => handleInputBlur(platform)}
                                        onKeyDown={e =>
                                            handleInputKeyDown(platform, e)
                                        }
                                        placeholder="https://..."
                                        autoFocus
                                        className="flex-1 px-3 h-[37px] text-[14px] font-normal leading-none text-dark bg-white placeholder-placeholder border border-gray-light rounded-full outline-none transition duration-300 ease-out focus:border-primary"
                                    />
                                ) : hasValidLink ? (
                                    <span className="text-[12px] text-gray-placeholder truncate flex-1">
                                        {linkValue}
                                    </span>
                                ) : null}
                            </div>
                            {!isEditing && hasValidLink ? (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(platform)}
                                    className="flex items-center justify-center w-[101px] h-[32px] gap-2 px-3 bg-gray-light text-[12px] text-black hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <BrokenLinkIcon className="w-[20px] h-[20px] text-black" />
                                    Удалить
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleAddClick(platform)}
                                    className="flex items-center justify-center w-[109px] h-[32px] gap-2 px-3 bg-blue text-[12px] text-white hover:bg-primary/10 rounded-full transition-colors"
                                >
                                    <LinkIcon className="w-[20px] h-[20px] text-white" />
                                    Добавить
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const description = {
    event: {
        title: "Описание и ссылки",
        description: "Если есть желание, напишите детальнее о событии:",
        siteLink: "Добвьте ссылку на сайт ивента или привяжите соц. сети:",
        placeholder: "Название события",
    },
    company: {
        title: "Услуги/Сервис",
        description:
            "Выбирите услуги или сервис который предоставляет ваша компания",
        siteLink: "Добвьте ссылку на сайт компании или привяжите соц. сети:",
        placeholder: "Начните писать услугу/сервис",
    },
    individual: {
        title: "Описание",
        description: "Добвьте ссылку на ваш сайт или привяжите соц.сети:",
        siteLink:
            "Добвьте ссылку на сайт деятельности или привяжите соц. сети:",
        placeholder: "Описание",
    },
};

const services = [
    "СТО",
    "Ремонт автомобилей",
    "Техническое обслуживание",
    "Тренера",
    "Персональные тренировки",
    "Фитнес-консультации",
    "Красота",
    "Парикмахерские услуги",
    "Маникюр",
    "Косметология",
    "Успех",
    "Бизнес-консультации",
    "Коучинг",
    "Менторство",
    "Сила",
    "Силовые тренировки",
    "Фитнес",
    "Тренажерный зал",
    "Мудрость",
    "Образование",
    "Консультации",
    "Обучение",
    "Дисциплина",
    "Тренировки",
    "Спорт",
    "Фитнес-программы",
    "Сострадание",
    "Социальные услуги",
    "Помощь",
    "Волонтерство",
    "Уверенность",
    "Коучинг",
    "Психологические консультации",
    "Тренинги",
    "Творчество",
    "Творческие мастерские",
    "Искусство",
    "Дизайн",
    "Стратегия",
    "Бизнес-консультации",
    "Планирование",
    "Консалтинг",
    "Успех",
    "Бизнес-консультации",
    "Коучинг",
    "Менторство",
    "Сила",
    "Силовые тренировки",
    "Фитнес",
    "Тренажерный зал",
    "Мудрость",
    "Образование",
    "Консультации",
    "Обучение",
    "Дисциплина",
    "Тренировки",
    "Спорт",
    "Фитнес-программы",
    "Сострадание",
    "Социальные услуги",
    "Помощь",
    "Волонтерство",
    "Уверенность",
    "Коучинг",
    "Психологические консультации",
    "Тренинги",
    "Творчество",
    "Творческие мастерские",
    "Искусство",
    "Дизайн",
    "Стратегия",
    "Бизнес-консультации",
    "Планирование",
    "Консалтинг",
    "Потенциал",
    "Развитие",
    "Обучение",
    "Коучинг",
    "Надежда",
    "Психологическая поддержка",
    "Консультации",
    "Помощь",
    "Смелость",
    "Экстремальные виды спорта",
    "Приключения",
    "Тренинги",
    "Решительность",
    "Бизнес-консультации",
    "Коучинг",
    "Менторство",
    "Инновации",
    "Технологические решения",
    "IT-консультации",
    "Разработка",
    "Вдохновение",
    "Творческие мастерские",
    "Искусство",
    "Дизайн",
    "Согласие",
    "Медиация",
    "Консультации",
    "Помощь",
    "Доброта",
    "Социальные услуги",
    "Помощь",
    "Волонтерство",
    "Устойчивость",
    "Экологические услуги",
    "Консультации",
    "Обучение",
    "Энергия",
    "Фитнес",
    "Спорт",
    "Тренировки",
    "Целеустремленность",
    "Коучинг",
    "Менторство",
    "Тренинги",
    "Честность",
    "Консультации",
    "Юридические услуги",
    "Помощь",
    "Справедливость",
    "Юридические услуги",
    "Консультации",
    "Помощь",
    "Гармония",
    "Йога",
    "Медитация",
    "Велнес",
    "Релаксация",
];

interface ServicesSelectorProps {
    fieldName: string;
    options: string[];
}

const ServicesSelector = ({ fieldName, options }: ServicesSelectorProps) => {
    const { values, setFieldValue, errors, touched } =
        useFormikContext<BaseFormValues>();
    const [inputValue, setInputValue] = useState("");
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const selectedValue = (
        values as unknown as Record<string, string | string[]>
    )[fieldName];
    const selectedServices = Array.isArray(selectedValue)
        ? selectedValue
        : typeof selectedValue === "string" && selectedValue
        ? [selectedValue]
        : [];

    const selectOptions = options.map(service => ({
        value: service,
        label: service,
    }));

    const selectedOptions = selectOptions.filter(opt =>
        selectedServices.includes(opt.value)
    );

    const isError =
        (errors as Record<string, unknown>)[fieldName] &&
        (touched as Record<string, unknown>)[fieldName];

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
        setMenuIsOpen(newValue.length > 0);
    };

    const handleChange = (
        selectedOptions: readonly { value: string; label: string }[] | null
    ) => {
        if (selectedOptions) {
            const values = selectedOptions.map(opt => opt.value);
            setFieldValue(fieldName, values);
        } else {
            setFieldValue(fieldName, []);
        }
        setInputValue("");
        setMenuIsOpen(false);
    };

    type OptionType = { value: string; label: string };

    const customStyles: StylesConfig<OptionType, true> = {
        control: (provided, state) => ({
            ...provided,
            minHeight: "172px",
            height: "172px",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "normal",
            lineHeight: "1",
            color: "#1a1a1a",
            backgroundColor: "#ffffff",
            borderColor: isError
                ? "#ef4444"
                : state.isFocused
                ? "#3b82f6"
                : "#e5e7eb",
            borderRadius: "12px",
            borderWidth: "1px",
            boxShadow: "none",
            "&:hover": {
                borderColor: isError ? "#ef4444" : "#3b82f6",
            },
        }),
        input: provided => ({
            ...provided,
            margin: "0",
            padding: "0",
            fontSize: "16px",
            fontWeight: "normal",
            lineHeight: "1",
        }),
        placeholder: provided => ({
            ...provided,
            color: "#9ca3af",
            fontSize: "16px",
        }),
        multiValue: provided => ({
            ...provided,
            backgroundColor: "#eff6ff",
            borderRadius: "6px",
        }),
        multiValueLabel: provided => ({
            ...provided,
            color: "#3b82f6",
            fontSize: "16px",
            padding: "4px 8px",
        }),
        multiValueRemove: provided => ({
            ...provided,
            color: "#3b82f6",
            ":hover": {
                backgroundColor: "#dbeafe",
                color: "#2563eb",
            },
        }),
        valueContainer: provided => ({
            ...provided,
            padding: "0",
            gap: "8px",
            maxHeight: "156px",
            overflowY: "auto",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        dropdownIndicator: () => ({
            display: "none",
        }),
        menu: provided => ({
            ...provided,
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            marginTop: "4px",
            zIndex: 20,
        }),
        menuList: provided => ({
            ...provided,
            padding: "0",
            maxHeight: "420px",
        }),
        option: (provided, state) => ({
            ...provided,
            padding: "12px",
            fontSize: "16px",
            color: state.isSelected || state.isFocused ? "#3b82f6" : "#1a1a1a",
            backgroundColor:
                state.isSelected || state.isFocused ? "#eff6ff" : "#ffffff",
            cursor: "pointer",
            "&:active": {
                backgroundColor: "#eff6ff",
                color: "#3b82f6",
            },
        }),
    };

    return (
        <div className="relative flex flex-col w-full">
            <label className="text-[12px] font-normal leading-[120%] mb-2 rounded-[12px]">
                {description.company.description}
            </label>
            <Select
                options={selectOptions}
                value={selectedOptions}
                onChange={handleChange}
                onInputChange={handleInputChange}
                inputValue={inputValue}
                menuIsOpen={menuIsOpen}
                placeholder={description.company.placeholder}
                isClearable
                isSearchable
                isMulti
                styles={customStyles}
                className="react-select-container"
                classNamePrefix="react-select"
                filterOption={(option, searchText) => {
                    if (!searchText) return false;
                    return option.label
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                }}
            />
            <ErrorMessage
                name={fieldName}
                component="p"
                className="absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500"
            />
        </div>
    );
};

export const DescriptionSocials = ({
    setCurrentStep,
    formProps,
}: DescriptionSocialsProps) => {
    const { errors, touched } = formProps;
    const { values } = formProps;
    let type: "event" | "company" | "individual";
    if ("userType" in values && values.userType) {
        type = values.userType === "individual" ? "individual" : "company";
    } else {
        type = "event";
    }

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">
                    {description[type].title}
                </SectionTitle>
                {type === "company" ? (
                    <ServicesSelector fieldName="services" options={services} />
                ) : (
                    <CustomizedInput
                        fieldName="description"
                        inputType="text"
                        placeholder={description[type].placeholder}
                        label={description[type].description}
                        as="textarea"
                        errors={errors}
                        touched={touched}
                        labelClassName="mb-2 rounded-[12px]"
                        fieldClassName="h-[172px] !rounded-[12px] px-4 py-2"
                    />
                )}
                <p className="text-[12px] text-gray-text mb-6">
                    Не более 1500 символов
                </p>
                <CustomizedInput
                    fieldName="siteLink"
                    inputType="url"
                    placeholder="Адрес сайта"
                    label={description[type].siteLink}
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
