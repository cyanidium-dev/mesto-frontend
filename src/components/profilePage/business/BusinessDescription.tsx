"use client";
import { Business } from "@/types/business";

interface BusinessDescriptionProps {
    business: Business;
}

export default function BusinessDescription({ business }: BusinessDescriptionProps) {
    if (!business.description) return null;

    return (
        <div>
            <p className="text-sm text-gray-placeholder mb-2">
                Описание
            </p>
            <p className="text-base whitespace-pre-wrap">
                {business.description}
            </p>
        </div>
    );
}

