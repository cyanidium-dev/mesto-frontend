"use client";
import GlobeIcon from "@/components/shared/icons/GlobeIcon";
import SocialIconFromUrl from "@/components/shared/icons/SocialIconFromUrl";

interface ProfileSocialLinksProps {
    socialLinks: string[];
    siteLinks: string[];
}

export default function ProfileSocialLinks({
    socialLinks,
    siteLinks,
}: ProfileSocialLinksProps) {
    const hasLinks = socialLinks.length > 0 || siteLinks.length > 0;

    if (!hasLinks) return null;

    return (
        <div className="mb-3">
            <p className="text-[14px] font-semibold mb-2">Социальные сети</p>
            <div className="flex flex-wrap gap-2">
                {siteLinks.map((url, index) => (
                    <a
                        key={`site-${index}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                        aria-label="Website link"
                    >
                        <GlobeIcon className="flex-shrink-0 w-8 h-8" />
                    </a>
                ))}
                {socialLinks.map((url, index) => {
                    return (
                        <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[32px] h-[32px] rounded-full overflow-hidden flex items-center justify-center bg-gray-ultra-light hover:bg-gray-light transition-colors"
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
