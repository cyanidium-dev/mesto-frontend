"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Business } from "@/types/business";
import { Event } from "@/types/event";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import GearIcon from "@/components/shared/icons/GearIcon";
import MainButton from "@/components/shared/buttons/MainButton";

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
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);
    const startYRef = useRef(0);
    const DRAG_THRESHOLD = 100; // Minimum drag distance to open profile
    const EXPAND_THRESHOLD = 50; // Minimum drag distance to expand sheet

    const isEvent = item && "startDate" in item;
    const isBusiness = item && !isEvent;

    // Get type label
    const getTypeLabel = () => {
        if (!item) return "";
        if (isEvent) return "Событие";
        if (isBusiness) {
            const business = item as Business;
            if (business.userType === "individual") return "Индивидуал";
            if (business.userType === "business") return "Бизнес";
        }
        return "";
    };

    // Get title
    const getTitle = () => {
        if (!item) return "";
        if (isEvent) return (item as Event).title;
        return (item as Business).title || "Бизнес";
    };

    // Get profile image
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

    // Get gallery images (all images except the first one)
    const getGalleryImages = () => {
        if (!item || !item.imageUrls) return [];
        const imageUrls = item.imageUrls.filter(
            url =>
                url &&
                (url.startsWith("http") ||
                    url.startsWith("data:") ||
                    url.startsWith("/"))
        );
        // Return all images except the first one (which is the profile image)
        return imageUrls.slice(1);
    };

    // Handle drag start
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

    // Handle drag move
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        const currentY = e.touches[0].clientY;
        const deltaY = startYRef.current - currentY; // Positive when dragging up, negative when dragging down
        setDragY(deltaY);
    };

    // Document-level mouse move handler
    const handleDocumentMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentY = e.clientY;
        const deltaY = startYRef.current - currentY; // Positive when dragging up, negative when dragging down
        setDragY(deltaY);
    }, [isDragging]);

    const handleCloseBottomSheet = useCallback(() => {
        onClose();
    }, [onClose]);

    // Navigate to profile page with smooth transition
    const navigateToProfile = useCallback(() => {
        if (!item) return;
        
        setIsNavigating(true);
        setIsExpanded(true);
        
        // Wait for full-screen expansion animation to complete
        setTimeout(() => {
            // Navigate to profile page
            if (isEvent) {
                router.push(`/profile/event/${item.id}`);
            } else {
                router.push(`/profile/business/${item.id}`);
            }
            
            // Keep sheet visible during navigation to prevent flashing
            // Use a longer delay to allow the new page to start rendering
            // This prevents the flash of the map/background
            setTimeout(() => {
                onClose();
            }, 600); // Longer delay to allow page to start loading
        }, 400); // Animation duration for expansion
    }, [item, isEvent, router, onClose]);

    // Handle drag end (touch)
    const handleTouchEnd = () => {
        if (dragY >= DRAG_THRESHOLD && item && !isNavigating) {
            // Start smooth transition to profile page
            navigateToProfile();
        } else if (dragY >= EXPAND_THRESHOLD && !isNavigating) {
            // Expand sheet when dragged up moderately
            setIsExpanded(true);
        } else if (dragY <= -50 && !isNavigating) {
            // Close sheet when dragged down enough
            if (isExpanded) {
                setIsExpanded(false);
            } else {
                handleCloseBottomSheet();
            }
        }
        setIsDragging(false);
        setDragY(0);
    };

    // Document-level mouse up handler
    const handleDocumentMouseUp = useCallback(() => {
        if (dragY >= DRAG_THRESHOLD && item && !isNavigating) {
            // Start smooth transition to profile page
            navigateToProfile();
        } else if (dragY >= EXPAND_THRESHOLD && !isNavigating) {
            // Expand sheet when dragged up moderately
            setIsExpanded(true);
        } else if (dragY <= -50 && !isNavigating) {
            // Close sheet when dragged down enough
            if (isExpanded) {
                setIsExpanded(false);
            } else {
                handleCloseBottomSheet();
            }
        }
        setIsDragging(false);
        setDragY(0);
    }, [dragY, item, isExpanded, isNavigating, navigateToProfile, handleCloseBottomSheet]);

    // Add document-level mouse event listeners for dragging
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleDocumentMouseMove);
            document.addEventListener('mouseup', handleDocumentMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleDocumentMouseMove);
                document.removeEventListener('mouseup', handleDocumentMouseUp);
            };
        }
    }, [isDragging, handleDocumentMouseMove, handleDocumentMouseUp]);

    // Reset drag when sheet closes
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
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300"
                onClick={onClose}
                style={{
                    opacity: isOpen && !isNavigating ? 1 : 0,
                    pointerEvents: isOpen && !isNavigating ? "auto" : "none",
                }}
            />

            {/* Bottom Sheet */}
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
                {/* Drag Handle - Make it draggable */}
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
                
                {/* Scrollable Content */}
                <div 
                    className="overflow-y-auto flex-1" 
                    style={{ 
                        touchAction: isDragging ? "none" : "pan-y",
                    }}
                    onTouchStart={(e) => {
                        // Allow dragging if at top of scroll
                        const scrollContainer = e.currentTarget;
                        if (scrollContainer.scrollTop <= 5) {
                            handleTouchStart(e);
                        }
                    }}
                    onTouchMove={(e) => {
                        if (isDragging) {
                            handleTouchMove(e);
                        }
                    }}
                    onTouchEnd={() => {
                        if (isDragging) {
                            handleTouchEnd();
                        }
                    }}
                    onMouseDown={(e) => {
                        const scrollContainer = e.currentTarget;
                        if (scrollContainer.scrollTop <= 5) {
                            handleMouseDown(e as React.MouseEvent<HTMLDivElement>);
                        }
                    }}
                >

                {/* Content */}
                <div className="px-4 pb-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                            {/* Profile Image */}
                            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={profileImage}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Title and Type */}
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-placeholder mb-1">
                                    {typeLabel}
                                </p>
                                <h2 className="text-lg font-semibold line-clamp-2">
                                    {title}
                                </h2>
                            </div>
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                aria-label="Share"
                            >
                                <ShareIcon className="w-5 h-5" />
                            </button>
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                aria-label="More options"
                            >
                                <GearIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-4">
                        <MainButton
                            variant="primary"
                            className="flex-1 h-10 text-sm"
                            onClick={() => {
                                // Remember functionality - to be implemented
                            }}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Image
                                    src="/images/navbar/user.svg"
                                    alt="remember icon"
                                    width={16}
                                    height={16}
                                />
                                Запомнить
                            </div>
                        </MainButton>
                        <MainButton
                            variant="primary"
                            className="flex-1 h-10 text-sm"
                            onClick={() => {
                                // Move to functionality - to be implemented
                            }}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Image
                                    src="/images/icons/arrowDiagonal.svg"
                                    alt="move to icon"
                                    width={16}
                                    height={16}
                                    className="brightness-0 invert"
                                />
                                В путь
                            </div>
                        </MainButton>
                    </div>

                    {/* Gallery Images */}
                    {galleryImages.length > 0 && (
                        <div>
                            <div className="grid grid-cols-4 gap-2">
                                {galleryImages.slice(0, 8).map((imageUrl, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full aspect-square rounded-[12px] overflow-hidden"
                                    >
                                        <Image
                                            src={imageUrl}
                                            alt={`Gallery ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>

            {/* White Backdrop - appears when dragging to cover area below card */}
            {dragY > 0 && (
                <div
                    className="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white z-[100] rounded-t-[24px]"
                    style={{
                        height: `${Math.min(dragY, window.innerHeight)}px`,
                    }}
                />
            )}
        </>
    );
}

