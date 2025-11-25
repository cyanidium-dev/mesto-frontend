"use client";
import { Event } from "@/types/event";

interface EventTagsProps {
    event: Event;
}

export default function EventTags({ event }: EventTagsProps) {
    if (!event.tags || event.tags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag, index) => (
                <span
                    key={index}
                    className="px-3 py-1 bg-transparent border-2 border-primary text-primary rounded-full text-sm"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}

