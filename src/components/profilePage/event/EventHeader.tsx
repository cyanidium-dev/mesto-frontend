"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import { useShare } from "@/hooks/useShare";
import Toast from "@/components/shared/toast/Toast";

export default function EventHeader() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const eventId = params.id as string;
    const { handleShare, showToast, setShowToast } = useShare();

    const handleBack = () => {
        const returnTo = searchParams.get("returnTo");
        if (returnTo) {
            router.push(returnTo);
        } else {
            router.back();
        }
    };

    return (
        <>
            <div className="flex items-center mb-4 relative">
                <NavigationButton onClick={handleBack} className="absolute left-0">
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <h1 className="text-lg font-semibold text-center w-full">
                    Событие
                </h1>
                <button
                    onClick={() => handleShare(eventId, "event")}
                    className="absolute right-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-ultra-light transition-colors"
                >
                    <ShareIcon className="w-5 h-5" />
                </button>
            </div>
            <Toast
                message="Ссылка скопирована"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
}
