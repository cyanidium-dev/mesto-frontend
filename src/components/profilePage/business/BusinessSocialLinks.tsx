"use client";
import { Business } from "@/types/business";
import GlobeIcon from "@/components/shared/icons/GlobeIcon";
import SocialIconFromUrl from "@/components/shared/icons/SocialIconFromUrl";

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
                        <GlobeIcon className="flex-shrink-0 w-8 h-8" />
                    </a>
                )}
                {business.socialMediaUrls?.map((url, index) => {
                    return (
                        <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-gray-ultra-light hover:bg-gray-light transition-colors"
                            aria-label={`Social media link ${index + 1}`}
                        >
                            <SocialIconFromUrl
                                url={url}
                                className="flex-shrink-0"
                                size={32}
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
