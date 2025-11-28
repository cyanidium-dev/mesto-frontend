import FacebookIcon from "./FacebookIcon";
import Image from "next/image";

interface SocialIconProps {
    platform: "facebook" | "instagram" | "telegram";
    className?: string;
}

export default function SocialIcon({ platform, className = "" }: SocialIconProps) {
    switch (platform) {
        case "facebook":
            return <FacebookIcon className={className} />;
        case "instagram":
            return (
                <Image
                    src="/images/icons/instagram.png"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className={className}
                />
            );
        case "telegram":
            return (
                <Image
                    src="/images/icons/telegram.png"
                    alt="Telegram"
                    width={20}
                    height={20}
                    className={className}
                />
            );
        default:
            return null;
    }
}

