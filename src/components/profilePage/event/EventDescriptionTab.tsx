"use client";
import Image from "next/image";
import { Event } from "@/types/event";
import ArrowDiagonalIcon from "@/components/shared/icons/ArrowDiagonalIcon";

interface EventDescriptionTabProps {
    event: Event;
}

export default function EventDescriptionTab({
    event,
}: EventDescriptionTabProps) {
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
            {event.description && (
                <p className="text-[14px] whitespace-pre-wrap">
                    {event.description}
                </p>
            )}

            {(event.socialMediaUrls && event.socialMediaUrls.length > 0) ||
            event.siteLink ? (
                <div>
                    <p className="text-[14px] font-semibold mb-2">Ссылки</p>
                    <div className="flex flex-wrap gap-2">
                        {event.siteLink && (
                            <a
                                href={event.siteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[32px] h-[32px] flex items-center justify-center rounded-full relative group"
                                aria-label="Website link"
                            >
                                <Image
                                    src="/images/icons/globe.svg"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="flex-shrink-0"
                                />
                                <ArrowDiagonalIcon className="absolute bottom-0 right-0 w-3 h-3 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        )}
                        {event.socialMediaUrls?.map((url, index) => {
                            const icon = getSocialIcon(url);
                            return (
                                <a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full relative group"
                                    aria-label={`Social media link ${
                                        index + 1
                                    }`}
                                >
                                    {icon && (
                                        <Image
                                            src={icon}
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="flex-shrink-0"
                                        />
                                    )}
                                    <ArrowDiagonalIcon className="absolute bottom-0 right-0 w-3 h-3 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
