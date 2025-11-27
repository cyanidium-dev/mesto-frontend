"use client";
import { Event } from "@/types/event";

interface EventTitleProps {
    event: Event;
}

export default function EventTitle({ event }: EventTitleProps) {
    return <h2 className="text-[20px] font-bold mb-2">{event.title}</h2>;
}
