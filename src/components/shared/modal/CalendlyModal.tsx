"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import ArrowIcon from "../icons/ArrowIcon";

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

    let fullCalendlyUrl: string;
    if (
        calendlyUrl.startsWith("http://") ||
        calendlyUrl.startsWith("https://")
    ) {
        fullCalendlyUrl = calendlyUrl;
    } else if (calendlyUrl.startsWith("calendly.com/")) {
        fullCalendlyUrl = `https://${calendlyUrl}`;
    } else if (calendlyUrl.includes("/")) {
        fullCalendlyUrl = `https://calendly.com/${calendlyUrl}`;
    } else {
        fullCalendlyUrl = `https://calendly.com/${calendlyUrl}`;
    }

    let calendlyUrlWithParams: string;
    try {
        const urlObj = new URL(fullCalendlyUrl);
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
        const separator = fullCalendlyUrl.includes("?") ? "&" : "?";
        calendlyUrlWithParams = `${fullCalendlyUrl}${separator}hide_landing_page_details=1&hide_gdpr_banner=1&text_color=0022ff`;
    }

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
            }
        } else {
            handleCopyLink("regular");
        }
    };

    const handleViewBookingPage = () => {
        window.open(fullCalendlyUrl, "_blank", "noopener,noreferrer");
    };

    useEffect(() => {
        if (isOpen) {
            const link = document.createElement("link");
            link.href =
                "https://assets.calendly.com/assets/external/widget.css";
            link.rel = "stylesheet";
            document.head.appendChild(link);

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

    useEffect(() => {
        if (isOpen && calendlyLoaded && window.Calendly) {
            const calendlyContainer = document.getElementById(
                "calendly-inline-widget"
            );
            if (calendlyContainer) {
                calendlyContainer.innerHTML = "";

                const handleIframeError = () => {
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
                    window.Calendly.initInlineWidget({
                        url: calendlyUrlWithParams,
                        parentElement: calendlyContainer,
                    });

                    setTimeout(() => {
                        const iframe =
                            calendlyContainer.querySelector("iframe");
                        if (iframe) {
                            iframe.onerror = handleIframeError;
                            iframe.onload = () => {
                                setTimeout(() => {
                                    try {
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
                                                handleIframeError();
                                            }
                                        }
                                    } catch (e) {
                                    }
                                }, 2000);
                            };

                            window.addEventListener("message", event => {
                                if (
                                    event.data &&
                                    typeof event.data === "string" &&
                                    (event.data.includes("calendly") ||
                                        event.data.includes("error"))
                                ) {
                                }
                            });
                        } else {
                            setTimeout(() => {
                                if (
                                    !calendlyContainer.querySelector("iframe")
                                ) {
                                    handleIframeError();
                                }
                            }, 3000);
                        }
                    }, 1000);
                } catch (error) {
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


    return (
        <>
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                type="text/javascript"
                async
                onLoad={() => {
                    setCalendlyLoaded(true);
                }}
                onError={() => {}}
            />

            {isOpen && (
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
                                    Забронировать
                                </h1>
                            </div>
                        </div>

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
