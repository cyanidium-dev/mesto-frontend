"use client";
import { Business } from "@/types/business";

interface BusinessDescriptionProps {
    business: Business;
}

export default function BusinessDescription({
    business,
}: BusinessDescriptionProps) {
    if (!business.description) return null;

    return (
        <div className="mb-3">
            <p className="text-[14px] font-semibold mb-2">Описание</p>
            <p className="text-[14px] whitespace-pre-wrap">
                {business.description}
            </p>
        </div>
    );
}
