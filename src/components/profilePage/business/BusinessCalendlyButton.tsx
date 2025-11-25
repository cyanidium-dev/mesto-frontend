"use client";
import MainButton from "@/components/shared/buttons/MainButton";
import CalendlyIcon from "@/components/shared/icons/CalendlyIcon";

interface BusinessCalendlyButtonProps {
    onOpen: () => void;
}

export default function BusinessCalendlyButton({ onOpen }: BusinessCalendlyButtonProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-ultra-light px-4 py-4 z-10">
            <MainButton 
                variant="bordered" 
                className="flex items-center justify-center gap-2 h-12 w-full"
                onClick={onOpen}
            >
                <CalendlyIcon className="w-5 h-5" />
                Забронировать через Calendly
            </MainButton>
        </div>
    );
}

