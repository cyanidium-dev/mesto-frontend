"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import { useUserStore } from "@/store/userStore";
import { Business } from "@/types/business";
import { User } from "@/types/user";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import MainButton from "@/components/shared/buttons/MainButton";
import ChatIcon from "@/components/shared/icons/ChatIcon";
import CalendlyEventTypesModal from "@/components/shared/modal/CalendlyEventTypesModal";
import BlockUserModal from "@/components/shared/modal/BlockUserModal";
import BusinessHeader from "@/components/profilePage/business/BusinessHeader";
import BusinessInfo from "@/components/profilePage/business/BusinessInfo";
import BusinessImageGallery from "@/components/profilePage/business/BusinessImageGallery";
import BusinessSocialLinks from "@/components/profilePage/business/BusinessSocialLinks";
import BusinessTags from "@/components/profilePage/business/BusinessTags";
import BusinessDescription from "@/components/profilePage/business/BusinessDescription";
import BusinessCalendlyButton from "@/components/profilePage/business/BusinessCalendlyButton";
import clsx from "clsx";

const DEFAULT_CALENDLY_URL = "https://calendly.com/shade09876";

export default function BusinessProfilePage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const businessId = params.id as string;
    const getBusiness = useBusinessStore(s => s.getBusiness);
    const getUser = useUserStore(s => s.getUser);
    const currentUser = useUserStore(s => s.currentUser);
    const [business, setBusiness] = useState<Business | null>(null);
    const [creator, setCreator] = useState<User | null>(null);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    const isCurrentUserCreator =
        currentUser && business && currentUser.id === business.creatorId;

    useEffect(() => {
        const businessData = getBusiness(businessId);
        if (businessData) {
            setBusiness(businessData);
            const creatorData = getUser(businessData.creatorId);
            setCreator(creatorData);
        }
    }, [businessId, getBusiness, getUser]);

    const handleBack = () => {
        const from = searchParams.get("from");
        if (from === "profile") {
            router.replace("/profile");
        } else {
            router.back();
        }
    };

    if (!business) {
        return (
            <Container>
                <NavigationButton onClick={handleBack} className="mb-2">
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <p>Бизнес не найден</p>
            </Container>
        );
    }

    const businessImageUrl =
        business.imageUrls?.find(
            url =>
                url &&
                (url.startsWith("http") ||
                    url.startsWith("data:") ||
                    url.startsWith("/"))
        ) ||
        ("imageUrl" in business
            ? (business as { imageUrl?: string }).imageUrl
            : undefined);
    const hasValidImage =
        businessImageUrl &&
        (businessImageUrl.startsWith("http") ||
            businessImageUrl.startsWith("data:") ||
            businessImageUrl.startsWith("/"));
    const imageUrl = hasValidImage
        ? businessImageUrl
        : "/images/mockedData/girl.jpg";

    const allImageUrls =
        business.imageUrls?.filter(
            url =>
                url &&
                (url.startsWith("http") ||
                    url.startsWith("data:") ||
                    url.startsWith("/"))
        ) || [];

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-10 bg-white">
                <Container className="pt-4">
                    <BusinessHeader business={business} />
                </Container>
            </div>
            <Container
                className={clsx(
                    "pt-4 flex-1 overflow-y-auto",
                    isCurrentUserCreator ? "pb-4" : "pb-24"
                )}
            >
                <BusinessInfo
                    business={business}
                    imageUrl={imageUrl}
                    onBlockUser={() => setIsBlockModalOpen(true)}
                />

                <div className="w-full">
                    <BusinessImageGallery
                        imageUrls={allImageUrls}
                        businessTitle={business.title}
                    />
                    <BusinessSocialLinks business={business} />
                    <BusinessTags business={business} />
                    <BusinessDescription business={business} />
                    {isCurrentUserCreator && (
                        <div className="mt-4">
                            <MainButton
                                variant="primary"
                                onClick={() => {
                                    router.push(
                                        `/create?fromBusiness=${businessId}&type=event`
                                    );
                                }}
                                className="flex items-center justify-center gap-2 h-12"
                            >
                                <ChatIcon className="w-5 h-5" />
                                Создать ивент от этого профиля
                            </MainButton>
                        </div>
                    )}
                </div>
            </Container>

            {!isCurrentUserCreator && (
                <BusinessCalendlyButton
                    onOpen={() => {
                        setIsCalendlyOpen(true);
                    }}
                />
            )}

            {business && (
                <CalendlyEventTypesModal
                    isOpen={isCalendlyOpen}
                    onClose={() => setIsCalendlyOpen(false)}
                    calendlyUrl={business.calendlyUrl || DEFAULT_CALENDLY_URL}
                    userName={creator?.name || business.title || "User"}
                    userPhotoUrl={
                        creator?.photoUrl || creator?.profilePictureUrl
                    }
                />
            )}

            <BlockUserModal
                isOpen={isBlockModalOpen}
                onClose={() => setIsBlockModalOpen(false)}
                onConfirm={() => {
                    // TODO: Implement block user functionality
                    setIsBlockModalOpen(false);
                }}
            />
        </div>
    );
}
