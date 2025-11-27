"use client";
import Image from "next/image";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import DotsIcon from "@/components/shared/icons/DotsIcon";
import { Business } from "@/types/business";
import { CATEGORIES } from "@/constants/filters";

interface BusinessInfoProps {
    business: Business;
    imageUrl: string;
}

export default function BusinessInfo({
    business,
    imageUrl,
}: BusinessInfoProps) {
    const categoryLabel = business.category
        ? CATEGORIES.find(cat => cat.key === business.category)?.label ||
          business.category
        : business.userType === "business"
        ? "Бизнес"
        : "Индивидуал";

    return (
        <div className="flex items-center justify-between w-full mb-3">
            <div className="flex items-center gap-2 flex-1">
                <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden shrink-0">
                    <Image
                        src={imageUrl}
                        alt={business.title || "Business"}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-[14px] font-medium mb-1">
                        {business.title || "Бизнес"}
                    </h2>
                    {categoryLabel && (
                        <p className="text-[12px] text-gray-placeholder">
                            {categoryLabel}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
                <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                    <ShareIcon className="w-5 h-5" />
                </button>
                <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                    <DotsIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
