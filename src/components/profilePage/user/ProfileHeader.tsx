"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import GearIcon from "@/components/shared/icons/GearIcon";
import { User } from "@/types/user";
import { useShare } from "@/hooks/useShare";
import Toast from "@/components/shared/toast/Toast";

interface ProfileHeaderProps {
    user: User;
    categoryLabel?: string;
}

export default function ProfileHeader({
    user,
    categoryLabel,
}: ProfileHeaderProps) {
    const router = useRouter();
    const { handleShare, showToast, setShowToast } = useShare();

    return (
        <>
            <div className="flex items-center mb-3 relative">
                <NavigationButton
                    onClick={() => router.back()}
                    className="absolute left-0"
                >
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <h1 className="text-[16px] font-bold text-center w-full">
                    Мой профиль
                </h1>
            </div>
            <div className="flex items-center justify-between w-full mb-3">
                <div className="flex items-center gap-2 flex-1">
                    <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden shrink-0">
                        <Image
                            src={
                                user.photoUrl ||
                                user.profilePictureUrl ||
                                "/images/mockedData/girl.jpg"
                            }
                            alt={user.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-[14px] font-medium mb-1">
                            {user.name}
                        </h2>
                        {(categoryLabel || user.title) && (
                            <p className="text-[12px] text-gray-placeholder">
                                {categoryLabel || user.title}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                    <button
                        onClick={() => handleShare()}
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                        <GearIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <Toast
                message="Ссылка скопирована"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
}
