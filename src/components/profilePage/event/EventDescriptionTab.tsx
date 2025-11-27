"use client";
import Image from "next/image";
import { Event } from "@/types/event";
import ArrowDiagonalIcon from "@/components/shared/icons/ArrowDiagonalIcon";
import GlobeIcon from "@/components/shared/icons/GlobeIcon";
import SocialIconFromUrl from "@/components/shared/icons/SocialIconFromUrl";

interface EventDescriptionTabProps {
    event: Event;
}

export default function EventDescriptionTab({
    event,
}: EventDescriptionTabProps) {

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
                                <GlobeIcon className="flex-shrink-0 w-8 h-8" />
                                <ArrowDiagonalIcon className="absolute bottom-0 right-0 w-3 h-3 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        )}
                        {event.socialMediaUrls?.map((url, index) => {
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
                                    <SocialIconFromUrl
                                        url={url}
                                        className="flex-shrink-0"
                                        size={32}
                                    />
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
