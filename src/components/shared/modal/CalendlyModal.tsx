"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import ArrowIcon from "../icons/ArrowIcon";
import Image from "next/image";
import ShareIcon from "../icons/ShareIcon";

// Declare Calendly type for TypeScript
declare global {
    interface Window {
        Calendly?: {
            initBadgeWidget: (options: {
                url: string;
                text: string;
                color: string;
                textColor: string;
                branding: boolean;
            }) => void;
            initInlineWidget: (options: {
                url: string;
                parentElement: HTMLElement;
            }) => void;
            initPopupWidget: (options: { url: string }) => void;
        };
    }
}

interface CalendlyModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendlyUrl: string;
    userName?: string;
    userPhotoUrl?: string;
}

export default function CalendlyModal({
    isOpen,
    onClose,
    calendlyUrl,
    userName = "John Mobbin",
    userPhotoUrl,
}: CalendlyModalProps) {
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [calendlyLoaded, setCalendlyLoaded] = useState(false);

    // Extract Calendly username from URL
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

    // Normalize the Calendly URL - ensure it's a full URL
    let fullCalendlyUrl: string;
    if (
        calendlyUrl.startsWith("http://") ||
        calendlyUrl.startsWith("https://")
    ) {
        fullCalendlyUrl = calendlyUrl;
    } else if (calendlyUrl.startsWith("calendly.com/")) {
        fullCalendlyUrl = `https://${calendlyUrl}`;
    } else if (calendlyUrl.includes("/")) {
        // If it has a path, assume it's a full path
        fullCalendlyUrl = `https://calendly.com/${calendlyUrl}`;
    } else {
        // Just username, use default event type or landing page
        fullCalendlyUrl = `https://calendly.com/${calendlyUrl}`;
    }

    // Prepare Calendly URL with parameters (add params if not already present)
    let calendlyUrlWithParams: string;
    try {
        const urlObj = new URL(fullCalendlyUrl);
        // Only add params if they don't already exist
        if (!urlObj.searchParams.has("hide_landing_page_details")) {
            urlObj.searchParams.set("hide_landing_page_details", "1");
        }
        if (!urlObj.searchParams.has("hide_gdpr_banner")) {
            urlObj.searchParams.set("hide_gdpr_banner", "1");
        }
        if (!urlObj.searchParams.has("text_color")) {
            urlObj.searchParams.set("text_color", "0022ff");
        }
        calendlyUrlWithParams = urlObj.toString();
    } catch (error) {
        console.error(
            "Error parsing Calendly URL:",
            error,
            "URL:",
            fullCalendlyUrl
        );
        // Fallback if URL parsing fails
        const separator = fullCalendlyUrl.includes("?") ? "&" : "?";
        calendlyUrlWithParams = `${fullCalendlyUrl}${separator}hide_landing_page_details=1&hide_gdpr_banner=1&text_color=0022ff`;
    }

    // Get user initial for profile icon
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
                // User cancelled or error occurred
                console.log("Share cancelled");
            }
        } else {
            // Fallback: copy to clipboard
            handleCopyLink("regular");
        }
    };

    const handleViewBookingPage = () => {
        window.open(fullCalendlyUrl, "_blank", "noopener,noreferrer");
    };

    // Add Calendly CSS link to head when modal opens
    useEffect(() => {
        if (isOpen) {
            const link = document.createElement("link");
            link.href =
                "https://assets.calendly.com/assets/external/widget.css";
            link.rel = "stylesheet";
            document.head.appendChild(link);

            // Add custom styles to ensure Calendly iframe fills container
            const style = document.createElement("style");
            style.textContent = `
                #calendly-inline-widget {
                    height: 100% !important;
                    width: 100% !important;
                }
                #calendly-inline-widget iframe {
                    height: 100% !important;
                    width: 100% !important;
                    min-height: 600px !important;
                }
            `;
            document.head.appendChild(style);

            return () => {
                // Cleanup: remove link and style when modal closes
                const existingLink = document.querySelector(
                    'link[href="https://assets.calendly.com/assets/external/widget.css"]'
                );
                if (existingLink) {
                    document.head.removeChild(existingLink);
                }
                const existingStyle = document.querySelector(
                    "style[data-calendly-modal]"
                );
                if (existingStyle) {
                    document.head.removeChild(existingStyle);
                } else {
                    // Fallback: remove the style we just added
                    const styles = document.querySelectorAll("style");
                    styles.forEach(s => {
                        if (s.textContent?.includes("calendly-inline-widget")) {
                            document.head.removeChild(s);
                        }
                    });
                }
            };
        }
    }, [isOpen]);

    // Initialize Calendly inline widget when modal opens and script is loaded
    useEffect(() => {
        if (isOpen && calendlyLoaded && window.Calendly) {
            const calendlyContainer = document.getElementById(
                "calendly-inline-widget"
            );
            if (calendlyContainer) {
                console.log(
                    "Initializing Calendly widget with URL:",
                    calendlyUrlWithParams
                );
                // Clear any existing widget
                calendlyContainer.innerHTML = "";

                // Set up error handler for iframe load errors
                const handleIframeError = () => {
                    console.error("Calendly iframe failed to load");
                    calendlyContainer.innerHTML = `
                        <div class="flex items-center justify-center min-h-[600px] p-4">
                            <div class="text-center">
                                <p class="text-red mb-2 font-semibold">Ошибка загрузки календаря</p>
                                <p class="text-sm text-gray-dark mb-4">Страница не найдена. Проверьте правильность Calendly URL.</p>
                                <p class="text-xs text-gray-placeholder mb-4">URL: ${calendlyUrlWithParams}</p>
                                <a href="${fullCalendlyUrl}" target="_blank" rel="noopener noreferrer" class="text-primary underline text-sm">
                                    Открыть в новой вкладке
                                </a>
                            </div>
                        </div>
                    `;
                };

                try {
                    // Initialize inline widget
                    window.Calendly.initInlineWidget({
                        url: calendlyUrlWithParams,
                        parentElement: calendlyContainer,
                    });

                    // Listen for iframe load and check for errors
                    setTimeout(() => {
                        const iframe =
                            calendlyContainer.querySelector("iframe");
                        if (iframe) {
                            console.log("Calendly iframe found");
                            iframe.onerror = handleIframeError;
                            iframe.onload = () => {
                                console.log(
                                    "Calendly iframe loaded successfully"
                                );
                                // Check if the iframe content shows an error page
                                setTimeout(() => {
                                    try {
                                        // Try to access iframe content to check for errors
                                        // Note: This might fail due to CORS, but we can try
                                        const iframeDoc =
                                            iframe.contentDocument ||
                                            iframe.contentWindow?.document;
                                        if (iframeDoc) {
                                            const errorText =
                                                iframeDoc.body?.textContent ||
                                                "";
                                            if (
                                                errorText.includes("404") ||
                                                errorText.includes(
                                                    "not found"
                                                ) ||
                                                errorText.includes(
                                                    "Page Not Found"
                                                )
                                            ) {
                                                console.error(
                                                    "Calendly page not found detected"
                                                );
                                                handleIframeError();
                                            }
                                        }
                                    } catch (e) {
                                        // CORS error is expected, ignore
                                        console.log(
                                            "Cannot access iframe content (CORS), assuming it loaded correctly"
                                        );
                                    }
                                }, 2000);
                            };

                            // Also listen for postMessage errors from Calendly
                            window.addEventListener("message", event => {
                                if (
                                    event.data &&
                                    typeof event.data === "string" &&
                                    (event.data.includes("calendly") ||
                                        event.data.includes("error"))
                                ) {
                                    console.log(
                                        "Calendly message event:",
                                        event.data
                                    );
                                }
                            });
                        } else {
                            console.warn("No iframe found after 1 second");
                            // If no iframe after 3 seconds, show error
                            setTimeout(() => {
                                if (
                                    !calendlyContainer.querySelector("iframe")
                                ) {
                                    console.error(
                                        "No iframe found after timeout"
                                    );
                                    handleIframeError();
                                }
                            }, 3000);
                        }
                    }, 1000);
                } catch (error) {
                    console.error("Error initializing Calendly widget:", error);
                    handleIframeError();
                }
            }
        }
    }, [isOpen, calendlyLoaded, calendlyUrlWithParams, fullCalendlyUrl]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Debug: log when modal state changes
    useEffect(() => {
        console.log(
            "CalendlyModal isOpen:",
            isOpen,
            "calendlyLoaded:",
            calendlyLoaded,
            "calendlyUrl:",
            calendlyUrl,
            "fullCalendlyUrl:",
            fullCalendlyUrl,
            "calendlyUrlWithParams:",
            calendlyUrlWithParams
        );
    }, [
        isOpen,
        calendlyLoaded,
        calendlyUrl,
        fullCalendlyUrl,
        calendlyUrlWithParams,
    ]);

    return (
        <>
            {/* Calendly Script - Load always, not just when modal is open */}
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                type="text/javascript"
                async
                onLoad={() => {
                    console.log("Calendly script loaded");
                    setCalendlyLoaded(true);
                }}
                onError={e => {
                    console.error("Calendly script failed to load:", e);
                }}
            />

            {isOpen && (
                <div
                    className="fixed inset-0 z-[500] bg-white"
                    onClick={handleBackdropClick}
                >
                    <div className="flex flex-col h-full max-w-[440px] mx-auto bg-white">
                        {/* Header */}
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
                                    Забронировать
                                </h1>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden flex flex-col">
                            {!calendlyLoaded ? (
                                <div className="flex items-center justify-center flex-1">
                                    <div className="text-center">
                                        <p className="text-gray-dark mb-2">
                                            Загрузка календаря...
                                        </p>
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    </div>
                                </div>
                            ) : (
                                /* Calendly Inline Widget */
                                <div
                                    id="calendly-inline-widget"
                                    className="calendly-inline-widget w-full flex-1"
                                    style={{
                                        height: "100%",
                                        minHeight: "600px",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
