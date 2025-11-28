"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Business } from "@/types/business";
import { useBusinessStore } from "@/store/businessStore";
import { useEventsStore } from "@/store/eventsStore";
import { CATEGORIES } from "@/constants/filters";
import Image from "next/image";
import ConfirmModal from "@/components/shared/modal/ConfirmModal";
import GearIcon from "@/components/shared/icons/GearIcon";
import TrashIcon from "@/components/shared/icons/TrashIcon";
import ArrowDiagonalIcon from "../shared/icons/ArrowDiagonalIcon";

interface ListItemProps {
    item: Event | Business;
}

export const ListItem = ({ item }: ListItemProps) => {
    const router = useRouter();
    const deleteBusiness = useBusinessStore(s => s.deleteBusiness);
    const deleteEvent = useEventsStore(s => s.deleteEvent);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const title = "title" in item ? item.title : (item as Business).title || "";
    const categoryValue = item.category;
    const categoryLabel = categoryValue
        ? CATEGORIES.find(cat => cat.key === categoryValue)?.label ||
          categoryValue
        : "";
    const isEvent = "startDate" in item;

    const handleOpen = () => {
        if (isEvent) {
            router.push(`/profile/event/${item.id}?from=profile`);
        } else {
            router.push(`/profile/business/${item.id}?from=profile`);
        }
    };

    const handleEdit = () => {
        const type = isEvent ? "event" : "business";
        router.push(`/create?edit=${item.id}&type=${type}`);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (isEvent) {
            deleteEvent(item.id);
        } else {
            deleteBusiness(item.id);
        }
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
                <div className="relative size-10 rounded-full overflow-hidden mr-2 shrink-0">
                    <Image
                        src={
                            item.imageUrls?.[0] ||
                            "/images/icons/classical-building.png"
                        }
                        alt={title || ""}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-[14px] font-medium mb-[4px]">
                        {title}
                    </h2>
                    {categoryLabel && (
                        <p className="text-[10px] font-medium text-gray-placeholder">
                            {categoryLabel}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleOpen}
                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light"
                    aria-label="open"
                >
                    <ArrowDiagonalIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={handleEdit}
                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light"
                    aria-label="edit"
                >
                    <GearIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light"
                    aria-label="delete"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title={
                    isEvent
                        ? "Вы действительно хотите удалить событие?"
                        : "Вы действительно хотите удалить бизнес-точку?"
                }
                confirmText="Удалить"
                cancelText="Отмена"
            />
        </div>
    );
};
