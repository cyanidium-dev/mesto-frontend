"use client";

import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";
import Image from "next/image";
import ShareIcon from "../icons/ShareIcon";
import CalendlyModal from "./CalendlyModal";

interface CalendlyEventTypesModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendlyUrl: string;
    userName?: string;
    userPhotoUrl?: string;
}

export default function CalendlyEventTypesModal({
    isOpen,
    onClose,
    calendlyUrl,
    userName = "John Mobbin",
    userPhotoUrl,
}: CalendlyEventTypesModalProps) {
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [isCalendlyWidgetOpen, setIsCalendlyWidgetOpen] = useState(false);

    const getCalendlyUsername = (url: string): string => {
        try {
            const match = url.match(/calendly\.com\/([^/?]+)/);
            return match ? match[1] : "demo";
        } catch {
            return "demo";
        }
    };

    const calendlyUsername = getCalendlyUsername(calendlyUrl);
    const calendlyLink = `calendly.com/${calendlyUsername}`;
    const fullCalendlyUrl = calendlyUrl.startsWith("http")
        ? calendlyUrl
        : `https://${calendlyUrl}`;

    const getUserInitial = (name: string): string => {
        return name.charAt(0).toUpperCase();
    };

    const handleCopyLink = (type: "regular" | "single-use") => {
        const link =
            type === "regular"
                ? fullCalendlyUrl
                : `${fullCalendlyUrl}?utm_source=calendar&utm_medium=email&utm_campaign=single-use-link`;

        navigator.clipboard.writeText(link);
        setCopiedLink(type);
        setTimeout(() => setCopiedLink(null), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Book a meeting",
                    text: `Book a meeting with ${userName}`,
                    url: fullCalendlyUrl,
                });
            } catch {
                console.log("Share cancelled");
            }
        } else {
            handleCopyLink("regular");
        }
    };

    const handleViewBookingPage = () => {
        setIsCalendlyWidgetOpen(true);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[500] bg-white"
                onClick={handleBackdropClick}
            >
                <div className="flex flex-col h-full max-w-[440px] mx-auto bg-white">
                    <div className="flex items-center justify-between p-4 border-b border-gray-ultra-light">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-ultra-light transition-colors"
                                aria-label="Back"
                            >
                                <ArrowIcon className="w-5 h-5" />
                            </button>
                            <h1 className="text-lg font-semibold">
                                Event types
                            </h1>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-12 h-12 rounded-full bg-gray-ultra-light flex items-center justify-center shrink-0">
                                {userPhotoUrl ? (
                                    <Image
                                        src={userPhotoUrl}
                                        alt={userName}
                                        fill
                                        className="object-cover rounded-full"
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-lg font-semibold text-gray-dark">
                                        {getUserInitial(userName)}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base font-semibold mb-1">
                                    {userName}
                                </h2>
                                <a
                                    href={fullCalendlyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary flex items-center gap-1"
                                    aria-label={`Open ${calendlyLink} in new tab`}
                                >
                                    {calendlyLink}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M10 2L2 10M10 2H6M10 2V6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div
                            className="bg-white border border-gray-light rounded-[16px] p-4 mb-4 relative cursor-pointer hover:border-primary transition-colors"
                            onClick={handleViewBookingPage}
                            role="button"
                            tabIndex={0}
                            aria-label="30 Minute Meeting - View booking page"
                            onKeyDown={e => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleViewBookingPage();
                                }
                            }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[#6B46C1] rounded-t-[16px]"></div>

                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-placeholder mb-1">
                                            30 MIN • ONE-ON-ONE
                                        </p>
                                        <h3 className="text-base font-semibold mb-2">
                                            30 Minute Meeting
                                        </h3>
                                        <p className="text-sm text-gray-placeholder">
                                            M-F • 9:00am - 5:00pm
                                        </p>
                                    </div>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-gray-placeholder"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M7.5 15L12.5 10L7.5 5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleViewBookingPage();
                                    }}
                                    className="text-sm text-primary flex items-center gap-1 mt-3"
                                    aria-label="View booking page"
                                >
                                    View booking page
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M10 2L2 10M10 2H6M10 2V6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center border-t border-b border-gray-ultra-light">
                            <button
                                onClick={() => handleCopyLink("regular")}
                                className="flex-1 py-3 text-sm text-gray-dark hover:bg-gray-ultra-light transition-colors"
                                aria-label={
                                    copiedLink === "regular"
                                        ? "Link copied"
                                        : "Copy link"
                                }
                            >
                                {copiedLink === "regular"
                                    ? "Copied!"
                                    : "Copy link"}
                            </button>
                            <div
                                className="w-px h-6 bg-gray-light"
                                aria-hidden="true"
                            ></div>
                            <button
                                onClick={() => handleCopyLink("single-use")}
                                className="flex-1 py-3 text-sm text-gray-dark hover:bg-gray-ultra-light transition-colors"
                                aria-label={
                                    copiedLink === "single-use"
                                        ? "Single-use link copied"
                                        : "Copy single-use link"
                                }
                            >
                                {copiedLink === "single-use"
                                    ? "Copied!"
                                    : "Copy single-use link"}
                            </button>
                            <div
                                className="w-px h-6 bg-gray-light"
                                aria-hidden="true"
                            ></div>
                            <button
                                onClick={handleShare}
                                className="flex-1 py-3 text-sm text-gray-dark hover:bg-gray-ultra-light transition-colors flex items-center justify-center gap-1"
                                aria-label="Share meeting link"
                            >
                                <ShareIcon className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CalendlyModal
                isOpen={isCalendlyWidgetOpen}
                onClose={() => setIsCalendlyWidgetOpen(false)}
                calendlyUrl={calendlyUrl}
                userName={userName}
                userPhotoUrl={userPhotoUrl}
            />
        </>
    );
}
