"use client";
import { Event } from "@/types/event";
import { getCoordinates } from "@/utils/distance";
import CalendarIcon from "@/components/shared/icons/CalendarIcon";
import UsersGroupIcon from "@/components/shared/icons/UsersGroupIcon";
import GlobeIcon from "@/components/shared/icons/GlobeIcon";
import ArrowRefreshIcon from "@/components/shared/icons/ArrowRefreshIcon";
import MapPointIcon from "@/components/shared/icons/MapPointIcon";

const LANGUAGE_NAMES_RU: Record<string, string> = {
    ru: "Русский",
    en: "Английский",
    uk: "Украинский",
    es: "Испанский",
    de: "Немецкий",
    fr: "Французский",
};

interface EventOverviewTabProps {
    event: Event;
    locationAddress: string;
    locationCity: string;
    locationCountry: string;
}

export default function EventOverviewTab({
    event,
    locationAddress,
    locationCity,
    locationCountry,
}: EventOverviewTabProps) {
    const eventCoords = getCoordinates(event.location);

    const parseDate = (dateInput: Date | string | undefined): Date | null => {
        if (!dateInput) return null;
        const date =
            dateInput instanceof Date ? dateInput : new Date(dateInput);
        return isNaN(date.getTime()) ? null : date;
    };

    const startDate = parseDate(event.startDate);
    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = [
        "янв",
        "фев",
        "мар",
        "апр",
        "май",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
    ];

    const formatDate = (date: Date | null): string => {
        if (!date || isNaN(date.getTime())) return "Дата не указана";
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${dayOfWeek}, ${day} ${month} ${year}`;
    };

    const getDaysUntil = (date: Date | null): number | null => {
        if (!date || isNaN(date.getTime())) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0);
        const diff = Math.ceil(
            (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        return diff;
    };

    const daysUntil = getDaysUntil(startDate);
    const daysUntilText =
        daysUntil === null
            ? ""
            : daysUntil === 0
            ? "сегодня"
            : daysUntil === 1
            ? "завтра"
            : `через ${daysUntil} ${
                  daysUntil === 1 ? "день" : daysUntil < 5 ? "дня" : "дней"
              }`;

    const formatTime = (time: string): string => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "pm" : "am";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes}${ampm}`;
    };

    const participantsCount = event.attendees?.length || 0;
    const spotsTaken = event.maxAttendees
        ? Math.min(participantsCount, event.maxAttendees)
        : participantsCount;

    const cityAndCountry =
        locationCity && locationCountry
            ? `${locationCity}, ${locationCountry}`
            : locationCity || locationCountry || null;

    return (
        <div className="space-y-6 mt-4">
            {eventCoords && (
                <div className="flex items-start gap-2">
                    <MapPointIcon className="text-gray-placeholder shrink-0 size-5" />
                    <div className="flex-1">
                        <p className="text-[14px] font-semibold">
                            {cityAndCountry || "Местоположение"}
                        </p>
                        {locationAddress && (
                            <a
                                href={`https://www.google.com/maps?q=${eventCoords[0]},${eventCoords[1]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[14px] underline flex items-center gap-1"
                            >
                                {locationAddress}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                >
                                    <path
                                        d="M10 2L2 10M10 2H6M10 2V6"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            )}

            <div className="flex items-start gap-2">
                <CalendarIcon className="text-black shrink-0 size-5" />
                <div className="flex-1">
                    <p className="text-[14px] font-semibold mb-1">
                        {formatDate(startDate)}
                        {daysUntilText && ` (${daysUntilText})`}
                    </p>
                    <p className="text-[14px] mb-1">
                        {event.startTime && formatTime(event.startTime)}
                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </p>
                    <p className="text-[12px] font-light text-gray-placeholder">
                        Время указано в вашем часовом поясе.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-2">
                <UsersGroupIcon className="text-black shrink-0 size-5" />
                <div className="flex-1">
                    <p className="text-[14px] font-semibold mb-1">
                        На это событие идут:
                    </p>
                    <p className="text-[14px] font-light">
                        {participantsCount.toLocaleString("ru-RU")}{" "}
                        {participantsCount <= 1
                            ? "человек"
                            : participantsCount < 5
                            ? "человека"
                            : "человек"}
                    </p>
                </div>
            </div>

            {event.maxAttendees && (
                <div className="flex items-start gap-2">
                    <UsersGroupIcon className="text-black shrink-0 size-5" />
                    <div className="flex-1">
                        <p className="text-[14px] font-semibold mb-1">
                            Мест занято:
                        </p>
                        <p className="text-[14px] font-light">
                            {spotsTaken} из {event.maxAttendees}
                        </p>
                    </div>
                </div>
            )}

            {event.languages && event.languages.length > 0 && (
                <div className="flex items-start gap-2">
                    <GlobeIcon className="text-black shrink-0 size-5" />
                    <div className="flex-1">
                        <p className="text-[14px] font-semibold">
                            {event.languages
                                .map(lang => LANGUAGE_NAMES_RU[lang] || lang)
                                .join(", ")}
                        </p>
                    </div>
                </div>
            )}

            {event.isRepetitive && event.repeatedTimes && (
                <div className="flex items-start gap-2">
                    <ArrowRefreshIcon className="text-black shrink-0 size-5" />
                    <div className="flex-1">
                        <p className="text-[14px] font-semibold">
                            Повторяющиеся событие
                        </p>
                        <p className="text-[14px]">
                            Проводилось {event.repeatedTimes}{" "}
                            {event.repeatedTimes <= 1
                                ? "раз"
                                : event.repeatedTimes < 5
                                ? "раза"
                                : "раз"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
