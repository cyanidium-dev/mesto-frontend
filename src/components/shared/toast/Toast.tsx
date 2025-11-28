"use client";

import { useEffect } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({
    message,
    isVisible,
    onClose,
    duration = 2000,
}: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[600] pointer-events-none">
            <div
                className="bg-dark text-white px-4 py-3 rounded-full text-[14px] font-medium shadow-lg transition-all duration-300 ease-out"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                        ? "translateY(0) translateX(-50%)"
                        : "translateY(20px) translateX(-50%)",
                }}
            >
                {message}
            </div>
        </div>
    );
}

