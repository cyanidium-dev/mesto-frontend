"use client";
import Image from "next/image";
import { Event } from "@/types/event";

interface EventDescriptionTabProps {
    event: Event;
}

export default function EventDescriptionTab({ event }: EventDescriptionTabProps) {
    const getSocialIcon = (url: string): string | null => {
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.includes("facebook.com")) {
            return "/images/icons/facebook.svg";
        }
        if (lowerUrl.includes("instagram.com")) {
            return "/images/icons/instagram.png";
        }
        if (lowerUrl.includes("telegram.org") || lowerUrl.includes("t.me")) {
            return "/images/icons/telegram.png";
        }
        return null;
    };

    return (
        <div className="space-y-4 mt-4">
            {/* Description */}
            {event.description && (
                <p className="text-base whitespace-pre-wrap">
                    {event.description}
                </p>
            )}

            {/* Links Section */}
            {(event.socialMediaUrls && event.socialMediaUrls.length > 0) || event.siteLink ? (
                <div>
                    <p className="text-sm text-gray-placeholder mb-2">
                        Ссылки
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {/* Site Link */}
                        {event.siteLink && (
                            <a
                                href={event.siteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                aria-label="Website link"
                            >
                                <Image
                                    src="/images/icons/globe.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="flex-shrink-0"
                                />
                            </a>
                        )}
                        {/* Social Media Links */}
                        {event.socialMediaUrls?.map((url, index) => {
                            const icon = getSocialIcon(url);
                            return (
                                <a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                    aria-label={`Social media link ${index + 1}`}
                                >
                                    {icon && (
                                        <Image
                                            src={icon}
                                            alt=""
                                            width={20}
                                            height={20}
                                            className="flex-shrink-0"
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

