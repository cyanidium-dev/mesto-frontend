"use client";
import { Business } from "@/types/business";

interface BusinessTagsProps {
    business: Business;
}

export default function BusinessTags({ business }: BusinessTagsProps) {
    if (!business.tags || business.tags.length === 0) return null;

    return (
        <div>
            <p className="text-sm text-gray-placeholder mb-2">
                Теги
            </p>
            <div className="flex flex-wrap gap-2">
                {business.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-transparent border-2 border-primary text-primary rounded-full text-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

