"use client";
import Image from "next/image";
import { Business } from "@/types/business";

interface BusinessSocialLinksProps {
    business: Business;
}

export default function BusinessSocialLinks({
    business,
}: BusinessSocialLinksProps) {
    const hasSocialLinks =
        (business.socialMediaUrls && business.socialMediaUrls.length > 0) ||
        business.siteLink;

    if (!hasSocialLinks) return null;

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
        <div className="mb-3">
            <p className="text-[14px] font-semibold mb-2">Социальные сети</p>
            <div className="flex flex-wrap gap-2">
                {business.siteLink && (
                    <a
                        href={business.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                        aria-label="Website link"
                    >
                        <Image
                            src="/images/icons/globe.svg"
                            alt=""
                            width={32}
                            height={32}
                            className="flex-shrink-0"
                        />
                    </a>
                )}
                {business.socialMediaUrls?.map((url, index) => {
                    const icon = getSocialIcon(url);
                    return (
                        <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-gray-ultra-light hover:bg-gray-light transition-colors"
                            aria-label={`Social media link ${index + 1}`}
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
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
