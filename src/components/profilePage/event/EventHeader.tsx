"use client";
import { useRouter } from "next/navigation";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";

export default function EventHeader() {
    const router = useRouter();

    return (
        <div className="flex items-center mb-4 relative">
            <NavigationButton onClick={() => router.back()} className="absolute left-0">
                <ArrowIcon />
                Назад
            </NavigationButton>
            <h1 className="text-lg font-semibold text-center w-full">
                Событие
            </h1>
            <button className="absolute right-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-ultra-light transition-colors">
                <ShareIcon className="w-5 h-5" />
            </button>
        </div>
    );
}

