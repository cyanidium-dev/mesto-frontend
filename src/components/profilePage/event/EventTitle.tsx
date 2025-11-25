"use client";
import { Event } from "@/types/event";

interface EventTitleProps {
    event: Event;
}

export default function EventTitle({ event }: EventTitleProps) {
    return (
        <h2 className="text-xl font-semibold mb-3">
            {event.title}
        </h2>
    );
}

