"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useBusinessStore } from "@/store/businessStore";
import { useEventsStore } from "@/store/eventsStore";
import { Tabs, Tab } from "@heroui/react";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { ItemsList } from "@/components/profilePage/ItemsList";
import { CATEGORIES } from "@/constants/filters";
import ProfileHeader from "@/components/profilePage/user/ProfileHeader";
import ProfileImageGallery from "@/components/profilePage/user/ProfileImageGallery";
import ProfileSocialLinks from "@/components/profilePage/user/ProfileSocialLinks";
import ProfileTags from "@/components/profilePage/user/ProfileTags";
import ProfileDescription from "@/components/profilePage/user/ProfileDescription";

type TabKey = "info" | "events" | "businesses";

function ProfilePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentUser = useUserStore(s => s.currentUser);
    const allBusinesses = useBusinessStore(s => s.getAllBusinesses());
    const allEvents = useEventsStore(s => s.getAllEvents());
    const tabParam = searchParams.get("tab");
    const [selectedTab, setSelectedTab] = useState<TabKey>(
        (tabParam && ["info", "events", "businesses"].includes(tabParam)
            ? tabParam
            : "info") as TabKey
    );

    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (tabParam && ["info", "events", "businesses"].includes(tabParam)) {
            setSelectedTab(tabParam as TabKey);
        }
    }, [searchParams]);

    const userBusinesses = useMemo(() => {
        if (!currentUser) return [];
        return allBusinesses.filter(
            business => business.creatorId === currentUser.id
        );
    }, [allBusinesses, currentUser]);

    const userEvents = useMemo(() => {
        if (!currentUser) return [];
        return allEvents.filter(event => event.creatorId === currentUser.id);
    }, [allEvents, currentUser]);

    const individualBusinesses = useMemo(() => {
        if (!currentUser) return [];
        return userBusinesses.filter(
            business => business.userType === "individual"
        );
    }, [userBusinesses, currentUser]);

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

    if (!currentUser) {
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
                        user={currentUser}
                        categoryLabel={individualBusinessCategory}
                    />
                </Container>
            </div>
            <div className="flex flex-col flex-1 min-h-0">
                <div className="sticky top-0 z-10 bg-white border-b border-gray-light shrink-0">
                    <Container className="pt-4 pb-2">
                        <Tabs
                            selectedKey={selectedTab}
                            onSelectionChange={key =>
                                setSelectedTab(key as TabKey)
                            }
                            classNames={{
                                base: "w-full",
                                tabList: "gap-0 w-full rounded-full p-0",
                                cursor: "bg-primary rounded-full",
                                tab: "text-sm data-[selected=true]:!text-white rounded-full",
                                tabContent: "text-sm",
                            }}
                        >
                            <Tab
                                key="info"
                                title={
                                    <span
                                        className={
                                            selectedTab === "info"
                                                ? "text-white"
                                                : ""
                                        }
                                    >
                                        Профиль
                                    </span>
                                }
                            />
                            <Tab
                                key="businesses"
                                title={
                                    <span
                                        className={
                                            selectedTab === "businesses"
                                                ? "text-white"
                                                : ""
                                        }
                                    >
                                        Бизнесы
                                    </span>
                                }
                            />
                            <Tab
                                key="events"
                                title={
                                    <span
                                        className={
                                            selectedTab === "events"
                                                ? "text-white"
                                                : ""
                                        }
                                    >
                                        События
                                    </span>
                                }
                            />
                        </Tabs>
                    </Container>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <Container className="pt-4 pb-24">
                        {selectedTab === "info" && (
                            <div className="w-full">
                                <ProfileImageGallery
                                    imageUrls={individualBusinessImages}
                                    userName={currentUser.name}
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
                        )}
                        {selectedTab === "events" && (
                            <div className="mt-4">
                                {userEvents.length > 0 ? (
                                    <ItemsList items={userEvents} />
                                ) : (
                                    <p className="text-center text-gray-placeholder py-8">
                                        Нет созданных событий
                                    </p>
                                )}
                            </div>
                        )}
                        {selectedTab === "businesses" && (
                            <div className="mt-4">
                                {userBusinesses.length > 0 ? (
                                    <ItemsList items={userBusinesses} />
                                ) : (
                                    <p className="text-center text-gray-placeholder py-8">
                                        Нет созданных бизнесов
                                    </p>
                                )}
                            </div>
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfilePageContent />
        </Suspense>
    );
}
