"use client";
import Image from "next/image";

interface ProfileImageGalleryProps {
    imageUrls: string[];
    userName?: string;
}

export default function ProfileImageGallery({
    imageUrls,
    userName,
}: ProfileImageGalleryProps) {
    if (imageUrls.length === 0) return null;

    return (
        <div className="h-[168px] w-full mb-3">
            <div className="grid grid-cols-2 gap-2 h-full">
                <div className="relative w-full h-full rounded-[16px] overflow-hidden">
                    <Image
                        src={imageUrls[0]}
                        alt={userName || "Profile image"}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                {imageUrls.length > 1 && (
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                        {imageUrls.slice(1, 5).map((imageUrl, index) => (
                            <div
                                key={index + 1}
                                className="relative w-full h-full rounded-[16px] overflow-hidden"
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
        </div>
    );
}

