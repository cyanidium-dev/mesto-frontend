"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Business } from "@/types/business";
import Image from "next/image";
import IconButton from "../shared/buttons/IconButton";
import LocationMapIcon from "../shared/icons/LocationMapIcon";
import AddProfileIcon from "../shared/icons/AddProfileIcon";
import ShareIcon from "../shared/icons/ShareIcon";
import ArrowIcon from "../shared/icons/ArrowIcon";
import { useShare } from "@/hooks/useShare";
import Toast from "../shared/toast/Toast";
import { CATEGORIES } from "@/constants/filters";

interface CardProps {
    business: Business;
}

export default function Card({ business }: CardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isShownMore, setIsShownMore] = useState(false);
    const [shouldClamp, setShouldClamp] = useState(true); // для line-clamp
    const { handleShare, showToast, setShowToast } = useShare();
    const toggleShowMore = () => setIsShownMore(prev => !prev);

    const handleShowOnMap = () => {
        router.push(`/main?view=map&focus=${business.id}`);
    };

    useEffect(() => {
        if (isShownMore) {
            // розгортається — одразу прибираємо clamp
            setShouldClamp(false);
        } else {
            // згортається — clamp через затримку
            const timeout = setTimeout(() => {
                setShouldClamp(true);
            }, 700); // 700мс = час анімації max-height
            return () => clearTimeout(timeout);
        }
    }, [isShownMore]);

    const { title, description, category } = business;
    const categoryLabel = category
        ? CATEGORIES.find(cat => cat.key === category)?.label || category
        : null;
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

    return (
        <li className="p-2 shadow-md rounded-[16px] bg-white relative">
            <button
                onClick={handleShowOnMap}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors"
                aria-label="Show on map"
            >
                <LocationMapIcon className="w-5 h-5 text-white" />
            </button>

            <div
                className={`flex gap-2 mb-2 overflow-hidden transition-[max-height] duration-700 ${
                    isShownMore
                        ? "max-h-[600px] ease-in"
                        : "max-h-[95px] ease-out"
                }`}
            >
                <div className="relative w-[71px] h-[95px] overflow-hidden rounded-[16px] shrink-0">
                    <Image
                        src={imageUrl}
                        fill
                        alt="photo"
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="flex-1 min-w-0 pr-12">
                    <h3 className="flex flex-col gap-1 mb-2 min-h-8">
                        <button
                            onClick={() => {
                                const viewParam = searchParams.get("view");
                                const returnTo = viewParam
                                    ? `?returnTo=/main?view=${viewParam}`
                                    : `?returnTo=/main`;
                                router.push(
                                    `/profile/business/${business.id}${returnTo}`
                                );
                            }}
                            className="text-left line-clamp-1 hover:underline max-w-full"
                        >
                            {title}
                        </button>
                        {categoryLabel && (
                            <span className="line-clamp-1 text-[12px] text-gray-placeholder">
                                {categoryLabel}
                            </span>
                        )}
                    </h3>
                    <p
                        onClick={toggleShowMore}
                        className={`text-[12px] text-gray-text transition-all duration-300 ${
                            shouldClamp
                                ? category
                                    ? "line-clamp-4"
                                    : "line-clamp-3"
                                : ""
                        }`}
                    >
                        {description}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors"
                        aria-label="Message"
                    >
                        <AddProfileIcon className="text-white" />
                    </button>
                    <IconButton
                        onClick={() => handleShare(business.id, "business")}
                    >
                        <ShareIcon />
                    </IconButton>
                </div>
                <IconButton onClick={toggleShowMore}>
                    <ArrowIcon
                        className={`transition duration-500 ease-in-out ${
                            isShownMore ? "-rotate-180" : "rotate-0"
                        }`}
                    />
                </IconButton>
            </div>
            <Toast
                message="Ссылка скопирована"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </li>
    );
}
