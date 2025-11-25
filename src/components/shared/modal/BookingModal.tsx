"use client";

import { useState, useEffect } from "react";
import ArrowIcon from "../icons/ArrowIcon";
import MainButton from "../buttons/MainButton";
import { Event } from "@/types/event";
import { useBookingStore } from "@/store/bookingStore";
import { useUserStore } from "@/store/userStore";
import { useEventsStore } from "@/store/eventsStore";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
}

type BookingStep = "details" | "contact" | "success";

export default function BookingModal({ isOpen, onClose, event }: BookingModalProps) {
    const addBooking = useBookingStore(s => s.addBooking);
    const currentUser = useUserStore(s => s.currentUser);
    const updateEventAttendees = useEventsStore(s => s.updateEventAttendees);

    const [step, setStep] = useState<BookingStep>("details");
    const [quantity, setQuantity] = useState(2);
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
    const [formData, setFormData] = useState({
        firstName: currentUser?.name?.split(" ")[0] || "Алексей Founder \"Mesto\"",
        lastName: currentUser?.name?.split(" ").slice(1).join(" ") || "",
        email: currentUser?.email || "mesto@gmail.com",
    });
    const [checkboxes, setCheckboxes] = useState({
        otherEvents: true,
        similarEvents: true,
        terms: true,
    });
    const [bookingId, setBookingId] = useState<string | null>(null);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setStep("details");
            setQuantity(2);
            setTimeRemaining(600);
            setFormData({
                firstName: currentUser?.name?.split(" ")[0] || "Алексей Founder \"Mesto\"",
                lastName: currentUser?.name?.split(" ").slice(1).join(" ") || "",
                email: currentUser?.email || "mesto@gmail.com",
            });
            setCheckboxes({
                otherEvents: true,
                similarEvents: true,
                terms: true,
            });
            setBookingId(null);
        }
    }, [isOpen, currentUser]);

    // Format date
    const formatDate = (date: Date): string => {
        const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        const months = [
            "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
        ];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${dayOfWeek}, ${day} ${month}, ${year}`;
    };

    const formatTime = (time: string): string => {
        if (!time) return "";
        return time;
    };

    // Timer countdown
    useEffect(() => {
        if (step === "contact" && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining((prev) => {
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

    const formatTimeRemaining = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleContinue = () => {
        if (step === "details") {
            setStep("contact");
        } else if (step === "contact") {
            // Validate form
            if (!formData.firstName || !formData.lastName || !formData.email || !checkboxes.terms) {
                return;
            }
            
            // Create booking
            const userId = currentUser?.id || "guest";
            const booking = addBooking({
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
            
            setBookingId(booking.id);
            
            // Update event attendees
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
        // Could navigate to event profile here
    };

    if (!isOpen) return null;

    const progress = step === "details" ? 33 : step === "contact" ? 66 : 100;
    const startDate = new Date(event.startDate);

    return (
        <div className="fixed inset-0 z-[500] bg-white">
            <div className="flex flex-col h-full max-w-[440px] mx-auto bg-white">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-ultra-light">
                    <button
                        onClick={step === "success" ? onClose : handleBack}
                        className="flex items-center gap-2 text-primary"
                    >
                        <ArrowIcon className="w-5 h-5" />
                        Назад
                    </button>
                    <h1 className="text-lg font-semibold">
                        {step === "success" ? "Забронировано" : "Бронирование"}
                    </h1>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-ultra-light transition-colors"
                        aria-label="Close"
                    >
                        <span className="text-xl">×</span>
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-ultra-light">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    {step === "details" && (
                        <div className="space-y-6">
                            {/* Event Title */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">
                                    {event.title}
                                </h2>
                                <div className="flex items-center justify-between text-sm text-gray-placeholder">
                                    <span>{formatDate(startDate)}</span>
                                    <span>
                                        {formatTime(event.startTime)}
                                        {event.endTime && `-${formatTime(event.endTime)}`} [EC]
                                    </span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="bg-gray-ultra-light rounded-[12px] p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-base">Бронь на событие</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold"
                                        >
                                            −
                                        </button>
                                        <span className="w-12 text-center font-semibold bg-white rounded px-3 py-1">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity((prev) => prev + 1)}
                                            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === "contact" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold mb-2">Контактная информация</h2>
                                {timeRemaining > 0 && (
                                    <p className="text-sm text-gray-placeholder">
                                        Осталось времени {formatTimeRemaining(timeRemaining)}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm text-gray-placeholder">Ваше имя:</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    placeholder="Введите ваше имя"
                                    className="w-full px-4 h-12 text-base bg-white border border-gray-light rounded-full outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm text-gray-placeholder">Ваша фамилия:</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    placeholder="Введите вашу фамилию"
                                    className="w-full px-4 h-12 text-base bg-white border border-gray-light rounded-full outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm text-gray-placeholder">Ваша почта:</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Введите вашу почту"
                                    className="w-full px-4 h-12 text-base bg-white border border-gray-light rounded-full outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.otherEvents}
                                        onChange={(e) => setCheckboxes({ ...checkboxes, otherEvents: e.target.checked })}
                                        className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm flex-1">
                                        Отправлять другие события созданные этим организатором
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.similarEvents}
                                        onChange={(e) => setCheckboxes({ ...checkboxes, similarEvents: e.target.checked })}
                                        className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm flex-1">
                                        Отправлять уведомления о похожих ивентах поблизости
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.terms}
                                        onChange={(e) => setCheckboxes({ ...checkboxes, terms: e.target.checked })}
                                        className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm flex-1">
                                        Я соглашаюсь с{" "}
                                        <a href="#" className="text-primary underline">Terms of Service</a>
                                        ,{" "}
                                        <a href="#" className="text-primary underline">Community Guidelines</a>
                                        {" "}и{" "}
                                        <a href="#" className="text-primary underline">Privacy Policy</a>
                                        {" "}(обязательно)
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
                            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">
                                    Супер, вы забронировали место!
                                </h2>
                                <p className="text-base text-gray-placeholder">
                                    Вы забронировали место для {quantity} {quantity === 1 ? "человека" : quantity < 5 ? "человек" : "человек"}, не забудьте придти!
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-ultra-light px-4 py-4 bg-white">
                    {step === "details" && (
                        <MainButton
                            onClick={handleContinue}
                            className="w-full h-12"
                        >
                            Продолжить
                        </MainButton>
                    )}

                    {step === "contact" && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-placeholder">Итого:</span>
                                <span className="font-semibold">{quantity} {quantity === 1 ? "билет" : quantity < 5 ? "билета" : "билетов"}</span>
                            </div>
                            <MainButton
                                onClick={handleContinue}
                                disabled={!formData.firstName || !formData.lastName || !formData.email || !checkboxes.terms}
                                className="w-full h-12"
                            >
                                Забронировать
                            </MainButton>
                        </div>
                    )}

                    {step === "success" && (
                        <MainButton
                            onClick={handleSuccessContinue}
                            className="w-full h-12"
                        >
                            Профиль события
                        </MainButton>
                    )}
                </div>
            </div>
        </div>
    );
}

