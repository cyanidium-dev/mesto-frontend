"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export function useShare() {
    const [showToast, setShowToast] = useState(false);
    const pathname = usePathname();

    const copyToClipboard = useCallback(
        async (url?: string) => {
            const linkToCopy = url || `${window.location.origin}${pathname}`;

            try {
                await navigator.clipboard.writeText(linkToCopy);
                setShowToast(true);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = linkToCopy;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand("copy");
                    setShowToast(true);
                } catch (fallbackErr) {
                    console.error("Failed to copy link:", fallbackErr);
                }
                document.body.removeChild(textArea);
            }
        },
        [pathname]
    );

    const handleShare = useCallback(
        async (itemId?: string, itemType?: "event" | "business") => {
            let url: string;

            if (itemId && itemType) {
                url = `${window.location.origin}/profile/${itemType}/${itemId}`;
            } else {
                url = `${window.location.origin}${pathname}`;
            }

            await copyToClipboard(url);
        },
        [copyToClipboard, pathname]
    );

    return {
        handleShare,
        showToast,
        setShowToast,
    };
}

