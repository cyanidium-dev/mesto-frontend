"use client";
import MainButton from "@/components/shared/buttons/MainButton";
import CalendlyIcon from "@/components/shared/icons/CalendlyIcon";

interface BusinessCalendlyButtonProps {
    onOpen: () => void;
}

export default function BusinessCalendlyButton({
    onOpen,
}: BusinessCalendlyButtonProps) {
    const handleClick = () => {
        console.log("Calendly button clicked");
        onOpen();
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-ultra-light px-4 py-6 z-[60]">
            <MainButton
                variant="bordered"
                className="flex items-center justify-center gap-2 h-12 w-full"
                onClick={handleClick}
                type="button"
            >
                <CalendlyIcon className="w-5 h-5" />
                Забронировать через Calendly
            </MainButton>
        </div>
    );
}
