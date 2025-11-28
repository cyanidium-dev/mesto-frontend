"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { BaseFormValues } from "@/types/formValues";
import Select, { StylesConfig } from "react-select";
import { ErrorMessage } from "formik";
import BrokenLinkIcon from "@/components/shared/icons/BrokenLinkIcon";
import LinkIcon from "@/components/shared/icons/LinkIcon";
import GlobeIcon from "@/components/shared/icons/GlobeIcon";
import CheckmarkIcon from "@/components/shared/icons/CheckmarkIcon";
import SocialIcon from "@/components/shared/icons/SocialIcon";

interface DescriptionSocialsProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues>;
}

type SocialPlatform = "facebook" | "instagram" | "telegram";

interface SocialLinkItem {
    platform: SocialPlatform;
    label: string;
}

const socialLinks: SocialLinkItem[] = [
    {
        platform: "facebook",
        label: "Facebook",
    },
    {
        platform: "instagram",
        label: "Instagram",
    },
    {
        platform: "telegram",
        label: "Telegram",
    },
];

const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
        const urlObj = new URL(url);
        const hasValidProtocol =
            urlObj.protocol === "http:" || urlObj.protocol === "https:";
        const hasValidHostname =
            Boolean(urlObj.hostname) &&
            urlObj.hostname.length > 0 &&
            urlObj.hostname !== "localhost";
        return hasValidProtocol && hasValidHostname;
    } catch {
        return false;
    }
};

const isValidSocialUrl = (url: string, platform: SocialPlatform): boolean => {
    if (!isValidUrl(url)) return false;
    const lowerUrl = url.toLowerCase();
    switch (platform) {
        case "facebook":
            return lowerUrl.includes("facebook.com");
        case "instagram":
            return lowerUrl.includes("instagram.com");
        case "telegram":
            return (
                lowerUrl.includes("telegram.org") || lowerUrl.includes("t.me")
            );
        default:
            return false;
    }
};

const getSocialUrlError = (
    url: string,
    platform: SocialPlatform
): string | null => {
    if (!url.trim()) return null;
    if (!isValidUrl(url)) {
        return "Введите корректный URL";
    }
    if (!isValidSocialUrl(url, platform)) {
        switch (platform) {
            case "facebook":
                return "Введите ссылку на Facebook (facebook.com)";
            case "instagram":
                return "Введите ссылку на Instagram (instagram.com)";
            case "telegram":
                return "Введите ссылку на Telegram (telegram.org или t.me)";
            default:
                return "Введите корректную ссылку";
        }
    }
    return null;
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
    const [inputErrors, setInputErrors] = useState<
        Record<SocialPlatform, string | null>
    >({
        facebook: null,
        instagram: null,
        telegram: null,
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
        const error = getSocialUrlError(value, platform);
        setInputErrors(prev => ({ ...prev, [platform]: error }));
    };

    const handleCheckmarkClick = (platform: SocialPlatform) => {
        const value = inputValues[platform];
        if (isValidSocialUrl(value, platform)) {
            const index = getPlatformIndex(platform);
            const updated = [...socialMediaUrls];
            updated[index] = value;
            setFieldValue("socialMediaUrls", updated);
            setEditingPlatform(null);
            setInputErrors(prev => ({ ...prev, [platform]: null }));
        } else {
            const error = getSocialUrlError(value, platform);
            setInputErrors(prev => ({ ...prev, [platform]: error }));
        }
    };

    const handleInputKeyDown = (
        platform: SocialPlatform,
        e: React.KeyboardEvent
    ) => {
        if (e.key === "Enter") {
            handleCheckmarkClick(platform);
        } else if (e.key === "Escape") {
            setEditingPlatform(null);
            const linkValue = getLinkValue(platform);
            setInputValues(prev => ({ ...prev, [platform]: linkValue }));
            setInputErrors(prev => ({ ...prev, [platform]: null }));
        }
    };

    const handleDelete = (platform: SocialPlatform) => {
        const index = getPlatformIndex(platform);
        const updated = [...socialMediaUrls];
        updated[index] = "";
        setFieldValue("socialMediaUrls", updated);
        setInputValues(prev => ({ ...prev, [platform]: "" }));
        setInputErrors(prev => ({ ...prev, [platform]: null }));
        setEditingPlatform(null);
    };

    const getLinkValue = (platform: SocialPlatform): string => {
        const index = getPlatformIndex(platform);
        return socialMediaUrls[index] || "";
    };

    return (
        <div className="mb-6">
            <p className="mb-4 text-[14px]">Социальные сети (необязательно)</p>
            <div className="space-y-3">
                {socialLinks.map(({ platform, label }) => {
                    const linkValue = getLinkValue(platform);
                    const inputValue = inputValues[platform];
                    const isEditing = editingPlatform === platform;
                    const hasValidLink =
                        linkValue && isValidSocialUrl(linkValue, platform);

                    const isValidInput =
                        inputValue && isValidSocialUrl(inputValue, platform);
                    const error = inputErrors[platform];

                    return (
                        <div key={platform} className="flex items-start gap-3">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <SocialIcon
                                    platform={platform}
                                    className="flex-shrink-0"
                                />
                                <span className="text-[14px] text-gray-text flex-shrink-0">
                                    {label}
                                </span>
                                {isEditing ? (
                                    <div
                                        className={`relative flex-1 min-w-0 ${
                                            error ? "pb-5" : ""
                                        }`}
                                    >
                                        <input
                                            type="url"
                                            value={inputValue}
                                            onChange={e =>
                                                handleInputChange(
                                                    platform,
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={e =>
                                                handleInputKeyDown(platform, e)
                                            }
                                            placeholder="https://..."
                                            autoFocus
                                            className={`w-full px-3 pr-10 h-[37px] text-[14px] font-normal leading-none text-dark bg-white placeholder-placeholder border rounded-full outline-none transition duration-300 ease-out ${
                                                error
                                                    ? "border-red-500 focus:border-red-500"
                                                    : "border-gray-light focus:border-primary"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCheckmarkClick(platform)
                                            }
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity ${
                                                isValidInput
                                                    ? "opacity-100 cursor-pointer"
                                                    : "opacity-50 cursor-not-allowed"
                                            }`}
                                            disabled={!isValidInput}
                                        >
                                            <CheckmarkIcon className="w-5 h-5 text-black" />
                                        </button>
                                        {error && (
                                            <p className="absolute top-full left-0 mt-1 text-[12px] text-red-500 whitespace-nowrap">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                            {!isEditing && hasValidLink ? (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(platform)}
                                    className="flex items-center justify-center w-[101px] h-[32px] gap-2 px-3 bg-gray-light text-[12px] text-black hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                                >
                                    <BrokenLinkIcon className="w-[20px] h-[20px] text-black" />
                                    Удалить
                                </button>
                            ) : !isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => handleAddClick(platform)}
                                    className="flex items-center justify-center w-[109px] h-[32px] gap-2 px-3 bg-blue text-[12px] text-white hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
                                >
                                    <LinkIcon className="w-[20px] h-[20px] text-white" />
                                    Добавить
                                </button>
                            ) : null}
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
            "Выберите услуги или сервис который предоставляет ваша компания",
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
    "Психологические консультации",
    "Тренинги",
    "Творчество",
    "Творческие мастерские",
    "Искусство",
    "Дизайн",
    "Стратегия",
    "Планирование",
    "Консалтинг",
    "Потенциал",
    "Развитие",
    "Надежда",
    "Психологическая поддержка",
    "Смелость",
    "Экстремальные виды спорта",
    "Приключения",
    "Решительность",
    "Инновации",
    "Технологические решения",
    "IT-консультации",
    "Разработка",
    "Вдохновение",
    "Согласие",
    "Медиация",
    "Доброта",
    "Устойчивость",
    "Экологические услуги",
    "Энергия",
    "Целеустремленность",
    "Честность",
    "Юридические услуги",
    "Справедливость",
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
            alignItems: "flex-start",
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
            backgroundColor: "#E5E7EB",
            borderRadius: "9999px",
            fontSize: "14px",
        }),
        multiValueLabel: provided => ({
            ...provided,
            color: "#1F2937",
            padding: "2px 8px",
        }),
        multiValueRemove: provided => ({
            ...provided,
            color: "#6B7280",
            borderRadius: "9999px",
            "&:hover": {
                backgroundColor: "#EF4444",
                color: "white",
            },
        }),
        valueContainer: provided => ({
            ...provided,
            padding: "0",
            gap: "8px",
            maxHeight: "156px",
            overflowY: "auto",
            alignItems: "flex-start",
            flexWrap: "wrap",
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
            <p className="text-[14px] font-normal leading-[120%] mb-6 rounded-[12px]">
                {description.company.description}
            </p>
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
    const { errors, touched, values, setFieldValue } = formProps;
    let type: "event" | "company" | "individual";
    if ("userType" in values && values.userType) {
        type = values.userType === "individual" ? "individual" : "company";
    } else {
        type = "event";
    }

    const siteLinkValue = (values.siteLink as string) || "";
    const hasSiteLinkValue = siteLinkValue.trim().length > 0;

    const handleClearSiteLink = () => {
        setFieldValue("siteLink", "");
    };

    return (
        <div className="flex flex-col flex-1 justify-between h-full pb-6">
            <div>
                <SectionTitle className="mb-6">
                    {description[type].title}
                </SectionTitle>
                {type === "company" ? (
                    <ServicesSelector fieldName="services" options={services} />
                ) : (
                    <>
                        <p className="text-[14px] font-normal leading-[120%] mb-6">
                            {description[type].description}
                        </p>
                        <CustomizedInput
                            fieldName="description"
                            inputType="text"
                            placeholder={description[type].placeholder}
                            as="textarea"
                            errors={errors}
                            touched={touched}
                            labelClassName="mb-1 rounded-[12px]"
                            fieldClassName="h-[172px] !rounded-[12px] px-4 py-2"
                        />
                    </>
                )}
                <p className="text-[12px] text-gray-placeholder mb-6">
                    Не более 1500 символов
                </p>
                <p className="text-[14px] font-normal leading-[120%] mb-6">
                    {description[type].siteLink}
                </p>
                <div className="relative mb-3">
                    <CustomizedInput
                        fieldName="siteLink"
                        inputType="url"
                        placeholder="Адрес сайта"
                        errors={errors}
                        touched={touched}
                        fieldClassName={
                            hasSiteLinkValue ? "pl-12 pr-12" : "pr-12"
                        }
                    />
                    {hasSiteLinkValue ? (
                        <>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <GlobeIcon className="w-5 h-5 text-black" />
                            </div>
                            <button
                                type="button"
                                onClick={handleClearSiteLink}
                                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 text-gray-placeholder hover:text-black transition-colors"
                                aria-label="Clear input"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 5L5 15M5 5L15 15"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <GlobeIcon className="w-5 h-5 text-black" />
                        </div>
                    )}
                </div>
                <SocialLinksInput />
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12 shrink-0"
            >
                Продолжить
            </MainButton>
        </div>
    );
};
