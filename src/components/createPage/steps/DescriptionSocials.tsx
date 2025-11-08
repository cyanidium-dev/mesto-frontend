"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { BaseFormValues } from "@/types/formValues";
import Image from "next/image";

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
                                    className="px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    Удалить
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleAddClick(platform)}
                                    className="px-4 py-2 text-[12px] text-primary hover:bg-primary/10 rounded-full transition-colors"
                                >
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

export const DescriptionSocials = ({
    setCurrentStep,
    formProps,
}: DescriptionSocialsProps) => {
    const { errors, touched } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Описание и ссылки</SectionTitle>
                <CustomizedInput
                    fieldName="description"
                    inputType="text"
                    placeholder="Название события"
                    label="Если есть желание, напишите детальнее о событии:"
                    as="textarea"
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-2"
                    fieldClassName="h-[172px]"
                />
                <p className="text-[12px] text-gray-text mb-6">
                    Не более 1500 символов
                </p>
                <CustomizedInput
                    fieldName="siteLink"
                    inputType="url"
                    placeholder="Адрес сайта"
                    label="Добвьте ссылку на сайт ивента или привяжите соц. сети:"
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
