"use client";
import Image from "next/image";

interface BusinessImageGalleryProps {
    imageUrls: string[];
    businessTitle?: string;
}

export default function BusinessImageGallery({ imageUrls, businessTitle }: BusinessImageGalleryProps) {
    if (imageUrls.length === 0) return null;

    return (
        <div className="flex gap-2">
            {/* Large first image */}
            <div className="relative flex-1 aspect-[4/3] rounded-[16px] overflow-hidden">
                <Image
                    src={imageUrls[0]}
                    alt={businessTitle || "Business image"}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            {/* 2x2 grid of remaining images (up to 4) */}
            {imageUrls.length > 1 && (
                <div className="grid grid-cols-2 gap-2 w-[120px] shrink-0">
                    {imageUrls.slice(1, 5).map((imageUrl, index) => (
                        <div
                            key={index + 1}
                            className="relative w-full aspect-square rounded-[16px] overflow-hidden"
                        >
                            <Image
                                src={imageUrl}
                                alt={`Gallery ${index + 2}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

