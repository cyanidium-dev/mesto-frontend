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
            className="fixed inset-0 z-500 px-[16px] py-[24px] flex items-end justify-center bg-black/50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white  rounded-[24px] p-4 w-full max-w-md shadow-lg">
                <h3 className="text-[16px] font-bold mb-10">{title}</h3>
                <div className="flex flex-col gap-2">
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
