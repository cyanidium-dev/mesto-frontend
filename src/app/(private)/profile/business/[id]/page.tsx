"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import { useUserStore } from "@/store/userStore";
import { Business } from "@/types/business";
import { User } from "@/types/user";
import { LatLngExpression } from "leaflet";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import Image from "next/image";
import MainButton from "@/components/shared/buttons/MainButton";
import IconButton from "@/components/shared/buttons/IconButton";
import { CATEGORIES } from "@/constants/filters";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import DotsIcon from "@/components/shared/icons/DotsIcon";
import CalendlyIcon from "@/components/shared/icons/CalendlyIcon";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/mainPage/Map"), { ssr: false });

export default function BusinessProfilePage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const getBusiness = useBusinessStore(s => s.getBusiness);
    const getUser = useUserStore(s => s.getUser);
    const [business, setBusiness] = useState<Business | null>(null);
    const [creator, setCreator] = useState<User | null>(null);

    useEffect(() => {
        const businessData = getBusiness(businessId);
        if (businessData) {
            setBusiness(businessData);
            const creatorData = getUser(businessData.creatorId);
            setCreator(creatorData);
        }
    }, [businessId, getBusiness, getUser]);

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

    // Get coordinates for map
    const getCoordinates = (
        location: LatLngExpression | null | undefined
    ): [number, number] | null => {
        if (!location) return null;
        if (Array.isArray(location)) {
            return [location[0], location[1]];
        }
        if (
            typeof location === "object" &&
            "lat" in location &&
            "lng" in location
        ) {
            return [location.lat, location.lng];
        }
        return null;
    };

    const businessCoords = getCoordinates(business.location);

    // Get all valid image URLs
    const allImageUrls = business.imageUrls?.filter(
        url =>
            url &&
            (url.startsWith("http") ||
                url.startsWith("data:") ||
                url.startsWith("/"))
    ) || [];

    return (
        <div className="flex flex-col h-screen">
            <Container className="pt-4 pb-24 flex-1 overflow-y-auto">
                <NavigationButton onClick={() => router.back()} className="mb-4">
                    <ArrowIcon />
                    Назад
                </NavigationButton>

                {/* Static Header - Profile Picture, Name, Title */}
                <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center">
                        <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden mr-2">
                            <Image
                                src={imageUrl}
                                alt={business.title || "Business"}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold mb-[4px]">
                                {business.title || "Бизнес"}
                            </h1>
                            {(business.category || business.userType) && (
                                <p className="text-sm text-gray-placeholder">
                                    {business.category
                                        ? CATEGORIES.find(
                                              cat =>
                                                  cat.key === business.category
                                          )?.label || business.category
                                        : business.userType === "business"
                                        ? "Бизнес"
                                        : "Индивидуал"}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                            <ShareIcon className="w-5 h-5" />
                        </button>
                        <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                            <DotsIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="w-full space-y-3">
                    {/* Images Gallery */}
                    {allImageUrls.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-placeholder mb-2">
                                Фото
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {allImageUrls.map((imageUrl, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full aspect-square rounded-[16px] overflow-hidden"
                                    >
                                        <Image
                                            src={imageUrl}
                                            alt={`Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
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

                {/* Languages */}
                {business.languages && business.languages.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Языки
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {business.languages.map((lang, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-ultra-light rounded-full text-sm"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

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
                                    className="px-3 py-1 bg-gray-ultra-light rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Services */}
                {business.services && business.services.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Услуги
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {business.services.map((service, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-ultra-light rounded-full text-sm"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Working Hours */}
                {business.workingHours && business.workingHours.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Часы работы
                        </p>
                        <div className="space-y-1">
                            {business.workingHours.map((hours, index) => {
                                if (!hours) return null;
                                const days = [
                                    "Понедельник",
                                    "Вторник",
                                    "Среда",
                                    "Четверг",
                                    "Пятница",
                                    "Суббота",
                                    "Воскресенье",
                                ];
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {days[index] || `День ${index + 1}`}
                                        </span>
                                        <span>
                                            {hours.start} - {hours.end}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Location Map */}
                {businessCoords && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Местоположение
                        </p>
                        <div className="h-64 w-full rounded-[16px] overflow-hidden">
                            <Map
                                center={businessCoords}
                                onCenterChange={() => {}}
                                markers={[business]}
                                events={[]}
                            />
                        </div>
                    </div>
                )}

                {/* Social Media Links */}
                {business.socialMediaUrls &&
                    business.socialMediaUrls.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-placeholder mb-2">
                                Социальные сети
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {business.socialMediaUrls.map((url, index) => {
                                    const getSocialIcon = (
                                        url: string
                                    ): string | null => {
                                        const lowerUrl = url.toLowerCase();
                                        if (lowerUrl.includes("facebook.com")) {
                                            return "/images/icons/facebook.svg";
                                        }
                                        if (
                                            lowerUrl.includes("instagram.com")
                                        ) {
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
                    )}

                {/* Site Link */}
                {business.siteLink && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Сайт
                        </p>
                        <a
                            href={business.siteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                            aria-label="Website link"
                        >
                            <Image
                                src="/images/icons/link.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="flex-shrink-0"
                            />
                        </a>
                    </div>
                )}

                {/* Creator Info */}
                {creator && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Владелец
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                    src={
                                        creator.photoUrl ||
                                        "/images/mockedData/girl.jpg"
                                    }
                                    alt={creator.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <p className="text-base">{creator.name}</p>
                        </div>
                    </div>
                )}
                </div>
            </Container>

            {/* Fixed Bottom Section with Calendly Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-ultra-light px-4 py-4 z-10">
                <MainButton className="flex items-center justify-center gap-2 h-12 w-full">
                    <CalendlyIcon className="w-5 h-5" />
                    Забронировать через Calendly
                </MainButton>
            </div>
        </div>
    );
}
