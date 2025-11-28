"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Business } from "@/types/business";
import { Event } from "@/types/event";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import DotsIcon from "@/components/shared/icons/DotsIcon";
import MainButton from "@/components/shared/buttons/MainButton";
import ArrowDiagonalIcon from "@/components/shared/icons/ArrowDiagonalIcon";
import AddProfileIcon from "@/components/shared/icons/AddProfileIcon";
import { useShare } from "@/hooks/useShare";
import Toast from "@/components/shared/toast/Toast";

interface MapBottomSheetProps {
    item: Business | Event | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function MapBottomSheet({
    item,
    isOpen,
    onClose,
}: MapBottomSheetProps) {
    const router = useRouter();
    const { handleShare, showToast, setShowToast } = useShare();
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);
    const startYRef = useRef(0);
    const DRAG_THRESHOLD = 100;
    const EXPAND_THRESHOLD = 50;

    const isEvent = item && "startDate" in item;
    const isBusiness = item && !isEvent;

    const getTypeLabel = () => {
        if (!item) return "";
        if (isEvent) return "Событие";
        if (isBusiness) {
            const business = item as Business;
            if (business.userType === "individual") return "Пользователь";
            if (business.userType === "business") return "Бизнес";
        }
        return "";
    };

    const getTitle = () => {
        if (!item) return "";
        if (isEvent) return (item as Event).title;
        return (item as Business).title || "Бизнес";
    };

    const getProfileImage = () => {
        if (!item) return "/images/mockedData/girl.jpg";
        const imageUrls = item.imageUrls || [];
        const firstImage = imageUrls.find(
            url =>
                url &&
                (url.startsWith("http") ||
                    url.startsWith("data:") ||
                    url.startsWith("/"))
        );
        return firstImage || "/images/mockedData/girl.jpg";
    };

    const getGalleryImages = () => {
        if (!item || !item.imageUrls) return [];
        const imageUrls = item.imageUrls.filter(
            url =>
                url &&
                (url.startsWith("http") ||
                    url.startsWith("data:") ||
                    url.startsWith("/"))
        );
        return imageUrls.slice(1);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
        startYRef.current = e.touches[0].clientY;
        setIsDragging(true);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        startYRef.current = e.clientY;
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        const currentY = e.touches[0].clientY;
        const deltaY = startYRef.current - currentY;
        setDragY(deltaY);
    };

    const handleDocumentMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentY = e.clientY;
            const deltaY = startYRef.current - currentY;
            setDragY(deltaY);
        },
        [isDragging]
    );

    const handleCloseBottomSheet = useCallback(() => {
        onClose();
    }, [onClose]);

    const navigateToProfile = useCallback(() => {
        if (!item) return;

        setIsNavigating(true);
        setIsExpanded(true);

        setTimeout(() => {
            if (isEvent) {
                router.push(`/profile/event/${item.id}`);
            } else {
                router.push(`/profile/business/${item.id}`);
            }
        }, 400);
    }, [item, isEvent, router]);

    const handleTouchEnd = () => {
        if (dragY >= DRAG_THRESHOLD && item && !isNavigating) {
            navigateToProfile();
        } else if (dragY >= EXPAND_THRESHOLD && !isNavigating) {
            setIsExpanded(true);
        } else if (dragY <= -50 && !isNavigating) {
            if (isExpanded) {
                setIsExpanded(false);
            } else {
                handleCloseBottomSheet();
            }
        }
        setIsDragging(false);
        setDragY(0);
    };

    const handleDocumentMouseUp = useCallback(() => {
        if (dragY >= DRAG_THRESHOLD && item && !isNavigating) {
            navigateToProfile();
        } else if (dragY >= EXPAND_THRESHOLD && !isNavigating) {
            setIsExpanded(true);
        } else if (dragY <= -50 && !isNavigating) {
            if (isExpanded) {
                setIsExpanded(false);
            } else {
                handleCloseBottomSheet();
            }
        }
        setIsDragging(false);
        setDragY(0);
    }, [
        dragY,
        item,
        isExpanded,
        isNavigating,
        navigateToProfile,
        handleCloseBottomSheet,
    ]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleDocumentMouseMove);
            document.addEventListener("mouseup", handleDocumentMouseUp);
            return () => {
                document.removeEventListener(
                    "mousemove",
                    handleDocumentMouseMove
                );
                document.removeEventListener("mouseup", handleDocumentMouseUp);
            };
        }
    }, [isDragging, handleDocumentMouseMove, handleDocumentMouseUp]);

    useEffect(() => {
        if (!isOpen) {
            setDragY(0);
            setIsDragging(false);
            setIsExpanded(false);
            setIsNavigating(false);
        }
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const profileImage = getProfileImage();
    const galleryImages = getGalleryImages();
    const typeLabel = getTypeLabel();
    const title = getTitle();

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300"
                onClick={onClose}
                style={{
                    opacity: isOpen && !isNavigating ? 1 : 0,
                    pointerEvents: isOpen && !isNavigating ? "auto" : "none",
                }}
            />

            <div
                ref={sheetRef}
                className={`fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white rounded-t-[24px] z-[101] transition-all ease-out flex flex-col ${
                    isNavigating
                        ? "max-h-[100vh] h-[100vh]"
                        : isExpanded
                        ? "max-h-[85vh]"
                        : "max-h-[60vh]"
                }`}
                style={{
                    transform: isNavigating
                        ? `translateY(0)`
                        : `translateY(${Math.min(0, -dragY)}px)`,
                    touchAction: isDragging ? "none" : "pan-y",
                    transitionDuration: isNavigating ? "400ms" : "300ms",
                }}
            >
                <div
                    className="drag-handle-area flex justify-center pt-3 pb-3 cursor-grab active:cursor-grabbing flex-shrink-0 select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    style={{ touchAction: "pan-y" }}
                >
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full pointer-events-none" />
                </div>

                <div
                    className="overflow-y-auto flex-1"
                    style={{
                        touchAction: isDragging ? "none" : "pan-y",
                    }}
                    onTouchStart={e => {
                        const scrollContainer = e.currentTarget;
                        if (scrollContainer.scrollTop <= 5) {
                            handleTouchStart(e);
                        }
                    }}
                    onTouchMove={e => {
                        if (isDragging) {
                            handleTouchMove(e);
                        }
                    }}
                    onTouchEnd={() => {
                        if (isDragging) {
                            handleTouchEnd();
                        }
                    }}
                    onMouseDown={e => {
                        const scrollContainer = e.currentTarget;
                        if (scrollContainer.scrollTop <= 5) {
                            handleMouseDown(
                                e as React.MouseEvent<HTMLDivElement>
                            );
                        }
                    }}
                >
                    <div className="px-4 pb-6">
                        <p className="text-center mb-2 text-[16px] font-bold">
                            {typeLabel}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="relative w-13 h-13 rounded-full overflow-hidden shrink-0">
                                    <Image
                                        src={profileImage}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <button
                                        onClick={navigateToProfile}
                                        className="text-left w-full"
                                    >
                                        <h2 className="text-[14px] font-medium line-clamp-2 mb-1 hover:underline">
                                            {title}
                                        </h2>
                                    </button>
                                    <p className="text-[12px] text-gray-placeholder">
                                        {typeLabel}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-2">
                                <button
                                    onClick={() => {
                                        if (item) {
                                            handleShare(
                                                item.id,
                                                isEvent ? "event" : "business"
                                            );
                                        }
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                    aria-label="Share"
                                >
                                    <ShareIcon className="w-5 h-5" />
                                </button>
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                    aria-label="More options"
                                >
                                    <DotsIcon className="w-5 h-5 rotate-90" />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-4">
                            <MainButton
                                variant="primary"
                                className="flex-1 h-10 text-sm"
                                onClick={() => {}}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <AddProfileIcon className="text-white" />
                                    Запомнить
                                </div>
                            </MainButton>
                            <MainButton
                                variant="primary"
                                className="flex-1 h-10 text-sm"
                                onClick={() => {}}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <ArrowDiagonalIcon className="brightness-0 invert w-5 h-5" />
                                    В путь
                                </div>
                            </MainButton>
                        </div>

                        {galleryImages.length > 0 && (
                            <div className="h-[168px] w-full">
                                <div className="grid grid-cols-2 gap-2 h-full">
                                    <div className="relative w-full h-full rounded-[12px] overflow-hidden">
                                        <Image
                                            src={galleryImages[0]}
                                            alt="Gallery 1"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                                        {galleryImages
                                            .slice(1, 5)
                                            .map((imageUrl, index) => (
                                                <div
                                                    key={index + 1}
                                                    className="relative w-full h-full rounded-[12px] overflow-hidden"
                                                >
                                                    <Image
                                                        src={imageUrl}
                                                        alt={`Gallery ${
                                                            index + 2
                                                        }`}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {dragY > 0 && (
                <div
                    className="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white z-[100] rounded-t-[24px]"
                    style={{
                        height: `${Math.min(dragY, window.innerHeight)}px`,
                    }}
                />
            )}
            <Toast
                message="Ссылка скопирована"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
}
