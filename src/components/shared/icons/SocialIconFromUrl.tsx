import Image from "next/image";
import FacebookIcon from "./FacebookIcon";

interface SocialIconFromUrlProps {
    url: string;
    className?: string;
    size?: number;
}

export default function SocialIconFromUrl({
    url,
    className = "",
    size = 20,
}: SocialIconFromUrlProps) {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("facebook.com")) {
        return <FacebookIcon className={className} />;
    }
    if (lowerUrl.includes("instagram.com")) {
        return (
            <Image
                src="/images/icons/instagram.png"
                alt="Instagram"
                width={size}
                height={size}
                className={className}
            />
        );
    }
    if (lowerUrl.includes("telegram.org") || lowerUrl.includes("t.me")) {
        return (
            <Image
                src="/images/icons/telegram.png"
                alt="Telegram"
                width={size}
                height={size}
                className={className}
            />
        );
    }
    return null;
}

