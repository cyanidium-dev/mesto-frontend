"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import { Business } from "@/types/business";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import Image from "next/image";
import MainButton from "@/components/shared/buttons/MainButton";
import { CATEGORIES } from "@/constants/filters";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import DotsIcon from "@/components/shared/icons/DotsIcon";
import CalendlyIcon from "@/components/shared/icons/CalendlyIcon";

export default function BusinessProfilePage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const getBusiness = useBusinessStore(s => s.getBusiness);
    const [business, setBusiness] = useState<Business | null>(null);

    useEffect(() => {
        const businessData = getBusiness(businessId);
        if (businessData) {
            setBusiness(businessData);
        }
    }, [businessId, getBusiness]);

    if (!business) {
        return (
            <Container>
                <NavigationButton
                    onClick={() => router.back()}
                    className="mb-2"
                >
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <p>Бизнес не найден</p>
            </Container>
        );
    }

    const businessImageUrl =
        business.imageUrls?.find(
            url =>
                url &&
                (url.startsWith("http") ||
                    url.startsWith("data:") ||
                    url.startsWith("/"))
        ) ||
        ("imageUrl" in business
            ? (business as { imageUrl?: string }).imageUrl
            : undefined);
    const hasValidImage =
        businessImageUrl &&
        (businessImageUrl.startsWith("http") ||
            businessImageUrl.startsWith("data:") ||
            businessImageUrl.startsWith("/"));
    const imageUrl = hasValidImage
        ? businessImageUrl
        : "/images/mockedData/girl.jpg";

    // Get all valid image URLs
    const allImageUrls = business.imageUrls?.filter(
        url =>
            url &&
            (url.startsWith("http") ||
                url.startsWith("data:") ||
                url.startsWith("/"))
    ) || [];

    // Get category label
    const categoryLabel = business.category
        ? CATEGORIES.find(cat => cat.key === business.category)?.label || business.category
        : business.userType === "business"
        ? "Бизнес"
        : "Индивидуал";

    return (
        <div className="flex flex-col h-screen">
            <Container className="pt-4 pb-24 flex-1 overflow-y-auto">
                {/* Header - Back button, Title, Share/More icons */}
                <div className="flex items-center justify-between mb-4">
                    <NavigationButton onClick={() => router.back()}>
                        <ArrowIcon />
                        Назад
                    </NavigationButton>
                    <h1 className="text-lg font-semibold">
                        {business.userType === "business" ? "Бизнес" : "Пользователь"}
                    </h1>
                    <div className="flex items-center gap-2">
                        <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                            <ShareIcon className="w-5 h-5" />
                        </button>
                        <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                            <DotsIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Business Info - Profile Picture, Name, Category, Share/More buttons */}
                <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden shrink-0">
                            <Image
                                src={imageUrl}
                                alt={business.title || "Business"}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-semibold mb-1">
                                {business.title || "Бизнес"}
                            </h2>
                            {categoryLabel && (
                                <p className="text-sm text-gray-placeholder">
                                    {categoryLabel}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                        <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                            <ShareIcon className="w-5 h-5" />
                        </button>
                        <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                            <DotsIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="w-full space-y-3">
                    {/* Images Gallery - Large first image + 2x2 grid of remaining images */}
                    {allImageUrls.length > 0 && (
                        <div className="flex gap-2">
                            {/* Large first image */}
                            <div className="relative flex-1 aspect-[4/3] rounded-[16px] overflow-hidden">
                                <Image
                                    src={allImageUrls[0]}
                                    alt={business.title || "Business image"}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            {/* 2x2 grid of remaining images (up to 4) */}
                            {allImageUrls.length > 1 && (
                                <div className="grid grid-cols-2 gap-2 w-[120px] shrink-0">
                                    {allImageUrls.slice(1, 5).map((imageUrl, index) => (
                                        <div
                                            key={index + 1}
                                            className="relative w-full aspect-square rounded-[16px] overflow-hidden"
                                        >
                                            <Image
                                                src={imageUrl}
                                                alt={`Gallery ${index + 2}`}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                {/* Social Media Links */}
                {(business.socialMediaUrls && business.socialMediaUrls.length > 0) || business.siteLink ? (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Социальные сети
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {/* Site Link */}
                            {business.siteLink && (
                                <a
                                    href={business.siteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                    aria-label="Website link"
                                >
                                    <Image
                                        src="/images/icons/globe.svg"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="flex-shrink-0"
                                    />
                                </a>
                            )}
                            {/* Social Media Links */}
                            {business.socialMediaUrls?.map((url, index) => {
                                const getSocialIcon = (
                                    url: string
                                ): string | null => {
                                    const lowerUrl = url.toLowerCase();
                                    if (lowerUrl.includes("facebook.com")) {
                                        return "/images/icons/facebook.svg";
                                    }
                                    if (lowerUrl.includes("instagram.com")) {
                                        return "/images/icons/instagram.png";
                                    }
                                    if (
                                        lowerUrl.includes("telegram.org") ||
                                        lowerUrl.includes("t.me")
                                    ) {
                                        return "/images/icons/telegram.png";
                                    }
                                    return null;
                                };
                                const icon = getSocialIcon(url);
                                return (
                                    <a
                                        key={index}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                        aria-label={`Social media link ${
                                            index + 1
                                        }`}
                                    >
                                        {icon && (
                                            <Image
                                                src={icon}
                                                alt=""
                                                width={20}
                                                height={20}
                                                className="flex-shrink-0"
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ) : null}

                {/* Tags */}
                {business.tags && business.tags.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Теги
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {business.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-transparent border-2 border-primary text-primary rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                {business.description && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Описание
                        </p>
                        <p className="text-base whitespace-pre-wrap">
                            {business.description}
                        </p>
                    </div>
                )}
                </div>
            </Container>

            {/* Fixed Bottom Section with Calendly Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-ultra-light px-4 py-4 z-10">
                <MainButton variant="bordered" className="flex items-center justify-center gap-2 h-12 w-full">
                    <CalendlyIcon className="w-5 h-5" />
                    Забронировать через Calendly
                </MainButton>
            </div>
        </div>
    );
}
