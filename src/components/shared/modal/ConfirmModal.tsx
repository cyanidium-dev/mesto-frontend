"use client";

import MainButton from "../buttons/MainButton";
import ArrowIcon from "../icons/ArrowIcon";
import TrashIcon from "../icons/TrashIcon";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Удалить",
    cancelText = "Отмена",
}: ConfirmModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-t-[16px] p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-base text-gray-placeholder mb-6">
                    {message}
                </p>
                <div className="flex flex-col gap-3">
                    <MainButton
                        variant="red"
                        onClick={onConfirm}
                        className="gap-2"
                    >
                        <TrashIcon className="w-5 h-5" />
                        {confirmText}
                    </MainButton>
                    <MainButton
                        variant="secondary"
                        onClick={onClose}
                        className="gap-2"
                    >
                        <ArrowIcon className="rotate-180" />
                        {cancelText}
                    </MainButton>
                </div>
            </div>
        </div>
    );
}
