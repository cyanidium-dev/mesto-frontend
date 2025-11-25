"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface EventImageGalleryProps {
    imageUrls: string[];
    eventTitle: string;
}

export default function EventImageGallery({ imageUrls, eventTitle }: EventImageGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const displayImages = imageUrls.length > 0 ? imageUrls : ["/images/mockedData/girl.jpg"];

    // Auto-rotate images every 3 seconds
    useEffect(() => {
        if (displayImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [displayImages.length]);

    return (
        <div className="relative mb-4" style={{ minHeight: "154px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            {displayImages.map((imageUrl, imageIndex) => {
                const isActive = currentImageIndex === imageIndex;
                const isLeftSide = imageIndex < currentImageIndex;
                const isRightSide = imageIndex > currentImageIndex;
                
                // Calculate position for each card
                let leftPosition = "50%";
                let topPosition = "0px";
                let transform = "translateX(-50%)";
                let width = "232px";
                let height = "154px";
                const zIndex = isActive ? 10 : 1;
                const opacity = isActive ? 1 : 0.5;
                const filter = isActive ? "none" : "grayscale(100%)";
                
                if (!isActive) {
                    // Position side images
                    if (isLeftSide) {
                        // Left side - stack vertically (in order from top)
                        const leftIndex = imageIndex;
                        leftPosition = "0px";
                        topPosition = `10px`;
                        transform = "none";
                        width = "168px";
                        height = "129px";
                    } else if (isRightSide) {
                        // Right side - stack vertically
                        const rightIndex = imageIndex - currentImageIndex - 1;
                        leftPosition = "auto";
                        topPosition = `10px`;
                        transform = "none";
                        width = "168px";
                        height = "129px";
                    }
                }
                
                return (
                    <div
                        key={imageIndex}
                        className="absolute rounded-[16px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
                        style={{
                            left: leftPosition === "auto" ? undefined : leftPosition,
                            right: leftPosition === "auto" ? "0px" : undefined,
                            top: topPosition,
                            transform: transform,
                            width: width,
                            height: height,
                            zIndex: zIndex,
                            opacity: opacity,
                            filter: filter,
                        }}
                        onClick={() => {
                            if (!isActive) {
                                setCurrentImageIndex(imageIndex);
                            } else {
                                setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
                            }
                        }}
                    >
                        <Image
                            src={imageUrl}
                            alt={`${eventTitle} - Image ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                            draggable={false}
                        />
                    </div>
                );
            })}
        </div>
    );
}

