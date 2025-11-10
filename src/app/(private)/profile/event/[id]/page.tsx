"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEventsStore } from "@/store/eventsStore";
import { useUserStore } from "@/store/userStore";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import { LatLngExpression } from "leaflet";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import Image from "next/image";
import MainButton from "@/components/shared/buttons/MainButton";
import IconButton from "@/components/shared/buttons/IconButton";
import { CATEGORIES } from "@/constants/filters";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/mainPage/Map"), { ssr: false });

export default function EventProfilePage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;
    const getEvent = useEventsStore(s => s.getEvent);
    const getUser = useUserStore(s => s.getUser);
    const [event, setEvent] = useState<Event | null>(null);
    const [creator, setCreator] = useState<User | null>(null);

    useEffect(() => {
        const eventData = getEvent(eventId);
        if (eventData) {
            setEvent(eventData);
            const creatorData = getUser(eventData.creatorId);
            setCreator(creatorData);
        }
    }, [eventId, getEvent, getUser]);

    if (!event) {
        return (
            <Container>
                <NavigationButton
                    onClick={() => router.back()}
                    className="mb-2"
                >
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <p>Событие не найдено</p>
            </Container>
        );
    }

    const eventImageUrl = event.imageUrls?.find(
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

    const eventDate = event.startDate
        ? new Date(event.startDate).toLocaleDateString("ru-RU")
        : "";
    const eventTime = event.startTime || "";
    const endDate = event.endDate
        ? new Date(event.endDate).toLocaleDateString("ru-RU")
        : null;
    const endTime = event.endTime || "";

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

    const eventCoords = getCoordinates(event.location);

    return (
        <Container className="pt-4 pb-8">
            <NavigationButton onClick={() => router.back()} className="mb-4">
                <ArrowIcon />
                Назад
            </NavigationButton>

            <div className="space-y-6">
                {/* Main Image */}
                <div className="relative w-full h-64 rounded-[16px] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                {/* Title and Category */}
                <div>
                    <h1 className="text-2xl font-semibold mb-2">
                        {event.title}
                    </h1>
                    {event.category && (
                        <p className="text-sm text-gray-placeholder">
                            {CATEGORIES.find(cat => cat.key === event.category)
                                ?.label || event.category}
                        </p>
                    )}
                </div>

                {/* Date and Time */}
                <div className="space-y-2">
                    <div>
                        <p className="text-sm text-gray-placeholder">
                            Дата начала
                        </p>
                        <p className="text-base">
                            {eventDate} {eventTime && `в ${eventTime}`}
                        </p>
                    </div>
                    {(endDate || endTime) && (
                        <div>
                            <p className="text-sm text-gray-placeholder">
                                Дата окончания
                            </p>
                            <p className="text-base">
                                {endDate || eventDate}{" "}
                                {endTime && `в ${endTime}`}
                            </p>
                        </div>
                    )}
                </div>

                {/* Description */}
                {event.description && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Описание
                        </p>
                        <p className="text-base whitespace-pre-wrap">
                            {event.description}
                        </p>
                    </div>
                )}

                {/* Languages */}
                {event.languages && event.languages.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Языки
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {event.languages.map((lang, index) => (
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
                {event.tags && event.tags.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Теги
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag, index) => (
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

                {/* Attendees */}
                <div>
                    <p className="text-sm text-gray-placeholder mb-2">
                        Участники
                    </p>
                    <p className="text-base">
                        {event.attendees.length}
                        {event.maxAttendees ? ` / ${event.maxAttendees}` : ""}
                    </p>
                </div>

                {/* Location Map */}
                {eventCoords && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Местоположение
                        </p>
                        <div className="h-64 w-full rounded-[16px] overflow-hidden">
                            <Map
                                center={eventCoords}
                                onCenterChange={() => {}}
                                markers={[]}
                                events={[]}
                            />
                        </div>
                    </div>
                )}

                {/* Social Media Links */}
                {event.socialMediaUrls && event.socialMediaUrls.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Социальные сети
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {event.socialMediaUrls.map((url, index) => {
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
                )}

                {/* Site Link */}
                {event.siteLink && (
                    <div>
                        <p className="text-sm text-gray-placeholder mb-2">
                            Сайт
                        </p>
                        <a
                            href={event.siteLink}
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
                            Организатор
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

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4">
                    <MainButton className="flex items-center gap-2 h-10 px-4 flex-1">
                        <Image
                            src="/images/navbar/chat.svg"
                            alt="book icon"
                            width={20}
                            height={20}
                        />
                        Забронировать
                    </MainButton>
                    <IconButton>
                        <Image
                            src="images/icons/share.svg"
                            alt="share icon"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                    <IconButton>
                        <Image
                            src="images/icons/bookmark.svg"
                            alt="bookmark icon"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </div>
            </div>
        </Container>
    );
}
