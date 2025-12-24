"use client";
import { Event } from "@/types/event";

interface EventTagsProps {
    event: Event;
}

export default function EventTags({ event }: EventTagsProps) {
    // Tags functionality commented out - unused
    return null;
    
    // if (!event.tags || event.tags.length === 0) return null;

    // const capitalizeFirstLetter = (str: string): string => {
    //     if (!str) return str;
    //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // };

    // return (
    //     <div className="flex flex-wrap gap-2 mb-4">
    //         {event.tags.map((tag, index) => (
    //             <span
    //                 key={index}
    //                 className="px-3 py-1 bg-transparent border-1 border-primary rounded-full text-[12px]"
    //             >
    //                 {capitalizeFirstLetter(tag)}
    //             </span>
    //         ))}
    //     </div>
    // );
}
