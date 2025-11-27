"use client";
import { useRouter } from "next/navigation";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { Business } from "@/types/business";

interface BusinessHeaderProps {
    business: Business;
}

export default function BusinessHeader({ business }: BusinessHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex items-center mb-[19px] relative">
            <NavigationButton
                onClick={() => router.back()}
                className="absolute left-0"
            >
                <ArrowIcon />
                Назад
            </NavigationButton>
            <h1 className="text-[16px] font-bold text-center w-full">
                {business.userType === "business" ? "Бизнес" : "Пользователь"}
            </h1>
        </div>
    );
}
