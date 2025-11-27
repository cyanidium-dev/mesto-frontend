"use client";

import { Event } from "@/types/event";
import MinusIcon from "@/components/shared/icons/MinusIcon";
import PlusIcon from "@/components/shared/icons/PlusIcon";

interface BookingDetailsStepProps {
    event: Event;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

export default function BookingDetailsStep({
    event,
    quantity,
    onQuantityChange,
}: BookingDetailsStepProps) {
    const formatDate = (date: Date): string => {
        const daysOfWeek = [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
        ];
        const months = [
            "Января",
            "Февраля",
            "Марта",
            "Апреля",
            "Мая",
            "Июня",
            "Июля",
            "Августа",
            "Сентября",
            "Октября",
            "Ноября",
            "Декабря",
        ];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${dayOfWeek}, ${day} ${month}, ${year}`;
    };

    const formatTime = (time: string): string => {
        if (!time) return "";
        return time;
    };

    const startDate = new Date(event.startDate);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[20px] font-bold mb-3">{event.title}</h2>
                <div className="flex items-center justify-between text-[14px]">
                    <span>{formatDate(startDate)}</span>
                    <span>
                        {formatTime(event.startTime)}
                        {event.endTime && `-${formatTime(event.endTime)}`}
                    </span>
                </div>
            </div>

            <div className="bg-gray-ultra-light rounded-[12px] p-3">
                <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold">
                        Бронь на событие
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                onQuantityChange(Math.max(1, quantity - 1))
                            }
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <MinusIcon className="flex-shrink-0 text-white" />
                        </button>
                        <span className="w-[80px] h-[32px] flex items-center justify-center shrink-0 text-[12px] text-center font-medium bg-white rounded-full px-3 py-1">
                            {quantity}
                        </span>
                        <button
                            onClick={() => onQuantityChange(quantity + 1)}
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <PlusIcon className="flex-shrink-0 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
