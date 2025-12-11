"use client";
import { useMemo, useEffect, Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useBusinessStore } from "@/store/businessStore";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { CATEGORIES } from "@/constants/filters";
import ProfileHeader from "@/components/profilePage/user/ProfileHeader";
import ProfileImageGallery from "@/components/profilePage/user/ProfileImageGallery";
import ProfileSocialLinks from "@/components/profilePage/user/ProfileSocialLinks";
import ProfileTags from "@/components/profilePage/user/ProfileTags";
import ProfileDescription from "@/components/profilePage/user/ProfileDescription";
import { User } from "@/types/user";

function UserProfilePageContent() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    const getUser = useUserStore(s => s.getUser);
    const initializeUserMockData = useUserStore(s => s.initializeMockData);
    const initializeBusinessMockData = useBusinessStore(
        s => s.initializeMockData
    );
    const allBusinesses = useBusinessStore(s => s.getAllBusinesses());
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        initializeUserMockData();
        initializeBusinessMockData();
    }, [initializeUserMockData, initializeBusinessMockData]);

    useEffect(() => {
        const userData = getUser(userId);
        if (userData) {
            setUser(userData);
        }
    }, [userId, getUser]);

    const userBusinesses = useMemo(() => {
        if (!user) return [];
        return allBusinesses.filter(
            business => business.creatorId === user.id
        );
    }, [allBusinesses, user]);

    const individualBusinesses = useMemo(() => {
        if (!user) return [];
        return userBusinesses.filter(
            business => business.userType === "individual"
        );
    }, [userBusinesses, user]);

    const individualBusinessImages = useMemo(() => {
        const images: string[] = [];
        individualBusinesses.forEach(business => {
            if (business.imageUrls) {
                business.imageUrls.forEach(url => {
                    if (url && !images.includes(url)) {
                        images.push(url);
                    }
                });
            }
        });
        return images;
    }, [individualBusinesses]);

    const individualBusinessSocialLinks = useMemo(() => {
        const links: string[] = [];
        individualBusinesses.forEach(business => {
            if (business.socialMediaUrls) {
                business.socialMediaUrls.forEach(url => {
                    if (url && !links.includes(url)) {
                        links.push(url);
                    }
                });
            }
        });
        return links;
    }, [individualBusinesses]);

    const individualBusinessSiteLinks = useMemo(() => {
        const links: string[] = [];
        individualBusinesses.forEach(business => {
            if (business.siteLink && !links.includes(business.siteLink)) {
                links.push(business.siteLink);
            }
        });
        return links;
    }, [individualBusinesses]);

    const individualBusinessTags = useMemo(() => {
        const tags: string[] = [];
        individualBusinesses.forEach(business => {
            if (business.tags) {
                business.tags.forEach(tag => {
                    if (tag && !tags.includes(tag)) {
                        tags.push(tag);
                    }
                });
            }
        });
        return tags;
    }, [individualBusinesses]);

    const individualBusinessCategory = useMemo(() => {
        const firstIndividual = individualBusinesses[0];
        if (!firstIndividual?.category) return "";
        const categoryOption = CATEGORIES.find(
            cat => cat.key === firstIndividual.category
        );
        return categoryOption?.label || firstIndividual.category;
    }, [individualBusinesses]);

    const individualBusinessDescription = useMemo(() => {
        const firstIndividual = individualBusinesses[0];
        return firstIndividual?.description || "";
    }, [individualBusinesses]);

    if (!user) {
        return (
            <Container>
                <NavigationButton
                    onClick={() => router.back()}
                    className="mb-2"
                >
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <p>Пользователь не найден</p>
            </Container>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="sticky top-0 z-10 bg-white shrink-0">
                <Container className="pt-4">
                    <ProfileHeader
                        user={user}
                        categoryLabel={individualBusinessCategory}
                        title={user.name}
                    />
                </Container>
            </div>
            <div className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto">
                    <Container className="pt-4 pb-24">
                        <div className="w-full">
                            <ProfileImageGallery
                                imageUrls={individualBusinessImages}
                                userName={user.name}
                            />
                            <ProfileSocialLinks
                                socialLinks={individualBusinessSocialLinks}
                                siteLinks={individualBusinessSiteLinks}
                            />
                            <ProfileTags tags={individualBusinessTags} />
                            <ProfileDescription
                                description={individualBusinessDescription}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default function UserProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserProfilePageContent />
        </Suspense>
    );
}

