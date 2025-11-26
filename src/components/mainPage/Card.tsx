"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Business } from "@/types/business";
import Image from "next/image";
import IconButton from "../shared/buttons/IconButton";
import LocationMapIcon from "../shared/icons/LocationMapIcon";

interface CardProps {
    business: Business;
}

export default function Card({ business }: CardProps) {
    const router = useRouter();
    const [isShownMore, setIsShownMore] = useState(false);
    const [shouldClamp, setShouldClamp] = useState(true); // для line-clamp
    const toggleShowMore = () => setIsShownMore(prev => !prev);

    const handleShowOnMap = () => {
        // Switch to map view and center on this business
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
    // Get first available image from array (user can upload to any of 8 slots)
    // Also support legacy imageUrl property for fake businesses
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
            {/* Show on Map Button - Top Right */}
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
                <div>
                    <h3 className="flex flex-col gap-1 mb-2 min-h-8">
                        <span className="line-clamp-1">{title}</span>
                        {category ? (
                            <span className="line-clamp-1 text-[12px] text-gray-placeholder">
                                {category}
                            </span>
                        ) : null}
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
                        <Image
                            src="/images/icons/addProfile.svg"
                            alt="message icon"
                            width={20}
                            height={20}
                        />
                    </button>
                    <IconButton>
                        <Image
                            src="images/icons/share.svg"
                            alt="share icon"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </div>
                <IconButton onClick={toggleShowMore}>
                    <Image
                        src="images/icons/arrow.svg"
                        alt="arrow icon"
                        width={20}
                        height={20}
                        className={`transition duration-500 ease-in-out ${
                            isShownMore ? "-rotate-180" : "rotate-0"
                        }`}
                    />
                </IconButton>
            </div>
        </li>
    );
}
