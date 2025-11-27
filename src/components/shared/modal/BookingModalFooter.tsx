"use client";

import MainButton from "../buttons/MainButton";

interface BookingModalFooterProps {
    step: "details" | "contact" | "success";
    quantity: number;
    formData: {
        firstName: string;
        lastName: string;
        email: string;
    };
    checkboxes: {
        terms: boolean;
    };
    onContinue: () => void;
    onSuccessContinue: () => void;
}

export default function BookingModalFooter({
    step,
    quantity,
    formData,
    checkboxes,
    onContinue,
    onSuccessContinue,
}: BookingModalFooterProps) {
    return (
        <div className="border-t border-gray-ultra-light px-4 py-4 bg-white">
            {step === "details" && (
                <MainButton onClick={onContinue} className="w-full h-12">
                    Продолжить
                </MainButton>
            )}

            {step === "contact" && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-placeholder">Итого:</span>
                        <span className="font-semibold">
                            {quantity}{" "}
                            {quantity === 1
                                ? "билет"
                                : quantity < 5
                                ? "билета"
                                : "билетов"}
                        </span>
                    </div>
                    <MainButton
                        onClick={onContinue}
                        disabled={
                            !formData.firstName ||
                            !formData.lastName ||
                            !formData.email ||
                            !checkboxes.terms
                        }
                        className="w-full h-12"
                    >
                        Забронировать
                    </MainButton>
                </div>
            )}

            {step === "success" && (
                <MainButton
                    onClick={onSuccessContinue}
                    className="w-full h-12"
                >
                    Профиль события
                </MainButton>
            )}
        </div>
    );
}

