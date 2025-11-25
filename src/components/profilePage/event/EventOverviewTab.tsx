"use client";
import { Event } from "@/types/event";
import { getCoordinates } from "@/utils/distance";

interface EventOverviewTabProps {
    event: Event;
    locationAddress: string;
}

export default function EventOverviewTab({ event, locationAddress }: EventOverviewTabProps) {
    const eventCoords = getCoordinates(event.location);
    const startDate = new Date(event.startDate);
    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = [
        "янв", "фев", "мар", "апр", "май", "июн",
        "июл", "авг", "сен", "окт", "ноя", "дек"
    ];

    const formatDate = (date: Date): string => {
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${dayOfWeek}, ${day} ${month} ${year}`;
    };

    const getDaysUntil = (date: Date): number => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0);
        const diff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const daysUntil = getDaysUntil(startDate);
    const daysUntilText = daysUntil === 0 ? "сегодня" : daysUntil === 1 ? "завтра" : `через ${daysUntil} ${daysUntil === 1 ? "день" : daysUntil < 5 ? "дня" : "дней"}`;

    const formatTime = (time: string): string => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "pm" : "am";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes}${ampm}`;
    };

    const participantsCount = event.attendees?.length || 0;
    const spotsTaken = event.maxAttendees ? Math.min(participantsCount, event.maxAttendees) : participantsCount;

    return (
        <div className="space-y-4 mt-4">
            {/* Location */}
            {eventCoords && (
                <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0 mt-0.5">
                        <path d="M10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M10 18C14 14 18 10.4183 18 8C18 4.68629 14.4183 2 10 2C5.58172 2 2 4.68629 2 8C2 10.4183 6 14 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <div className="flex-1">
                        <p className="text-sm text-gray-placeholder">
                            {locationAddress ? locationAddress.split(",").slice(0, 2).join(", ") : "Местоположение"}
                        </p>
                        {locationAddress && (
                            <a
                                href={`https://www.google.com/maps?q=${eventCoords[0]},${eventCoords[1]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary underline flex items-center gap-1"
                            >
                                {locationAddress.split(",").slice(2).join(", ")}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M10 2L2 10M10 2H6M10 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Date and Time */}
            <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0 mt-0.5">
                    <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M13 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div className="flex-1">
                    <p className="text-sm text-gray-placeholder">
                        {formatDate(startDate)} ({daysUntilText})
                    </p>
                    <p className="text-sm">
                        {event.startTime && formatTime(event.startTime)}
                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </p>
                    <p className="text-xs text-gray-placeholder mt-1">
                        Время указано в вашем часовом поясе.
                    </p>
                </div>
            </div>

            {/* Attendees Count */}
            <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0 mt-0.5">
                    <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M15.8333 15.8333C15.8333 13.9924 13.175 12.5 10 12.5C6.825 12.5 4.16667 13.9924 4.16667 15.8333V17.5H15.8333V15.8333Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <p className="text-sm">
                    На это событие идут: {participantsCount.toLocaleString("ru-RU")} {participantsCount === 1 ? "человек" : participantsCount < 5 ? "человека" : "человек"}
                </p>
            </div>

            {/* Spots Taken */}
            {event.maxAttendees && (
                <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0 mt-0.5">
                        <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M15.8333 15.8333C15.8333 13.9924 13.175 12.5 10 12.5C6.825 12.5 4.16667 13.9924 4.16667 15.8333V17.5H15.8333V15.8333Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <p className="text-sm">
                        Мест занято: {spotsTaken} из {event.maxAttendees}
                    </p>
                </div>
            )}

            {/* Languages */}
            {event.languages && event.languages.length > 0 && (
                <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0 mt-0.5">
                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M10 2C12.5 5 14 7.5 14 10C14 12.5 12.5 15 10 18" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M10 2C7.5 5 6 7.5 6 10C6 12.5 7.5 15 10 18" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <p className="text-sm">
                        {event.languages.join(", ")}
                    </p>
                </div>
            )}

            {/* Recurring Event */}
            {event.isRepetitive && event.repeatedTimes && (
                <div className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0 mt-0.5">
                        <path d="M10 3V10L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <p className="text-sm">
                        Повторяющиеся событие Проводилось {event.repeatedTimes} {event.repeatedTimes === 1 ? "раз" : event.repeatedTimes < 5 ? "раза" : "раз"}
                    </p>
                </div>
            )}
        </div>
    );
}

