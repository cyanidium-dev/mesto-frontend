"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import Image from "next/image";
import MainButton from "../shared/buttons/MainButton";
import IconButton from "../shared/buttons/IconButton";
import LocationMapIcon from "../shared/icons/LocationMapIcon";
import HandUpIcon from "../shared/icons/HandUpIcon";
import ShareIcon from "../shared/icons/ShareIcon";
import ArrowIcon from "../shared/icons/ArrowIcon";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const router = useRouter();
    const [isShownMore, setIsShownMore] = useState(false);
    const [shouldClamp, setShouldClamp] = useState(true);
    const toggleShowMore = () => setIsShownMore(prev => !prev);

    const handleShowOnMap = () => {
        router.push(`/main?view=map&focus=${event.id}`);
    };

    useEffect(() => {
        if (isShownMore) {
            setShouldClamp(false);
        } else {
            const timeout = setTimeout(() => {
                setShouldClamp(true);
            }, 700);
            return () => clearTimeout(timeout);
        }
    }, [isShownMore]);

    const { imageUrls, title, description, category, startDate, startTime } =
        event;
    const eventImageUrl = imageUrls?.find(
        url =>
            url &&
            (url.startsWith("http") ||
                url.startsWith("data:") ||
                url.startsWith("/"))
    );
    const hasValidImage =
        eventImageUrl &&
        (eventImageUrl.startsWith("http") ||
            eventImageUrl.startsWith("data:") ||
            eventImageUrl.startsWith("/"));
    const imageUrl = hasValidImage
        ? eventImageUrl
        : "/images/mockedData/girl.jpg";
    const eventDate = startDate
        ? new Date(startDate).toLocaleDateString("ru-RU")
        : "";
    const eventTime = startTime || "";

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
                        alt="event photo"
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div>
                    <h3 className="flex flex-col gap-1 mb-2 min-h-8">
                        <span className="line-clamp-1">{title}</span>
                        {category && (
                            <span className="line-clamp-1 text-[12px] text-gray-placeholder">
                                {category}
                            </span>
                        )}
                        {eventDate && (
                            <span className="line-clamp-1 text-[12px] text-primary">
                                {eventDate} {eventTime && `в ${eventTime}`}
                            </span>
                        )}
                    </h3>
                    {description && (
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
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MainButton className="flex items-center gap-2 h-8 px-3 w-fit text-[12px]">
                        <HandUpIcon className="text-white" />
                        Забронировать
                    </MainButton>
                    <IconButton>
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
        </li>
    );
}
