"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ArrowIcon from "../icons/ArrowIcon";
import ProgressBar from "../progress/ProgressBar";
import { Event } from "@/types/event";
import { useBookingStore } from "@/store/bookingStore";
import { useUserStore } from "@/store/userStore";
import { useEventsStore } from "@/store/eventsStore";
import BookingDetailsStep from "./BookingDetailsStep";
import BookingContactStep from "./BookingContactStep";
import BookingSuccessStep from "./BookingSuccessStep";
import BookingModalFooter from "./BookingModalFooter";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
}

type BookingStep = "details" | "contact" | "success";

export default function BookingModal({
    isOpen,
    onClose,
    event,
}: BookingModalProps) {
    const addBooking = useBookingStore(s => s.addBooking);
    const currentUser = useUserStore(s => s.currentUser);
    const updateEventAttendees = useEventsStore(s => s.updateEventAttendees);

    const [step, setStep] = useState<BookingStep>("details");
    const [quantity, setQuantity] = useState(2);
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
    const [formData, setFormData] = useState({
        firstName:
            currentUser?.name?.split(" ")[0] || 'Алексей Founder "Mesto"',
        lastName: currentUser?.name?.split(" ").slice(1).join(" ") || "",
        email: currentUser?.email || "mesto@gmail.com",
    });
    const [checkboxes, setCheckboxes] = useState({
        otherEvents: true,
        similarEvents: true,
        terms: true,
    });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setStep("details");
            setQuantity(2);
            setTimeRemaining(600);
            setFormData({
                firstName:
                    currentUser?.name?.split(" ")[0] ||
                    'Алексей Founder "Mesto"',
                lastName:
                    currentUser?.name?.split(" ").slice(1).join(" ") || "",
                email: currentUser?.email || "mesto@gmail.com",
            });
            setCheckboxes({
                otherEvents: true,
                similarEvents: true,
                terms: true,
            });
        }
    }, [isOpen, currentUser]);

    useEffect(() => {
        if (step === "contact" && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, timeRemaining]);

    const handleContinue = () => {
        if (step === "details") {
            setStep("contact");
        } else if (step === "contact") {
            if (
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !checkboxes.terms
            ) {
                return;
            }

            const userId = currentUser?.id || "guest";
            addBooking({
                eventId: event.id,
                userId: userId,
                quantity: quantity,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                preferences: {
                    otherEvents: checkboxes.otherEvents,
                    similarEvents: checkboxes.similarEvents,
                    termsAccepted: checkboxes.terms,
                },
            });

            updateEventAttendees(event.id, userId, quantity);

            setStep("success");
        }
    };

    const handleBack = () => {
        if (step === "contact") {
            setStep("details");
        } else if (step === "success") {
            onClose();
        }
    };

    const handleSuccessContinue = () => {
        onClose();
    };

    if (!isOpen) return null;

    const getCurrentStep = () => {
        if (step === "details") return 1;
        if (step === "contact") return 2;
        return 3;
    };

    return (
        <div className="fixed inset-0 z-[500] bg-white">
            <div className="flex flex-col h-full max-w-[440px] mx-auto bg-white">
                <div className="flex items-center justify-between p-4 pb-6 border-b border-gray-ultra-light">
                    <button
                        onClick={step === "success" ? onClose : handleBack}
                        className="flex items-center gap-2 text-primary"
                    >
                        <ArrowIcon className="w-5 h-5" />
                        Назад
                    </button>
                    <h1 className="text-[16px] leading-[120%] font-bold absolute left-1/2 -translate-x-1/2">
                        {step === "details"
                            ? "Забронировать"
                            : step === "contact"
                            ? "Бронирование"
                            : "Забронировано"}
                    </h1>
                    <button
                        onClick={onClose}
                        className="size-8 flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                        aria-label="Close"
                    >
                        <Image
                            src="/images/icons/closeX.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="flex-shrink-0"
                        />
                    </button>
                </div>

                <div className="px-4">
                    <ProgressBar stepsQty={3} currentStep={getCurrentStep()} />
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                    {step === "details" && (
                        <BookingDetailsStep
                            event={event}
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                        />
                    )}

                    {step === "contact" && (
                        <BookingContactStep
                            formData={formData}
                            onFormDataChange={setFormData}
                            checkboxes={checkboxes}
                            onCheckboxesChange={setCheckboxes}
                            timeRemaining={timeRemaining}
                        />
                    )}

                    {step === "success" && (
                        <BookingSuccessStep quantity={quantity} />
                    )}
                </div>

                <BookingModalFooter
                    step={step}
                    quantity={quantity}
                    formData={formData}
                    checkboxes={checkboxes}
                    onContinue={handleContinue}
                    onSuccessContinue={handleSuccessContinue}
                />
            </div>
        </div>
    );
}
