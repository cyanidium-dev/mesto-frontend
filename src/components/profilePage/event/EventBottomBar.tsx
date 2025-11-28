"use client";
import { useState } from "react";
import MainButton from "@/components/shared/buttons/MainButton";
import BookingModal from "@/components/shared/modal/BookingModal";
import { Event } from "@/types/event";
import HandUpIcon from "@/components/shared/icons/HandUpIcon";

interface EventBottomBarProps {
    event: Event;
}

export default function EventBottomBar({ event }: EventBottomBarProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-ultra-light px-4 py-4 z-10 max-w-[440px] mx-auto">
                <div className="flex items-center justify-between">
                    <span className="text-[16px] font-bold">Бесплатно</span>
                    <MainButton 
                        className="flex text-[14px] items-center gap-2 h-10 w-[165px]"
                        onClick={() => setIsBookingOpen(true)}
                    >
                        <HandUpIcon className="text-white" />
                        Забронировать
                    </MainButton>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                event={event}
            />
        </>
    );
}

