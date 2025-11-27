"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useBusinessStore } from "@/store/businessStore";
import { useEventsStore } from "@/store/eventsStore";
import { Tabs, Tab } from "@heroui/react";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import Image from "next/image";
import { ItemsList } from "@/components/profilePage/ItemsList";
import { CATEGORIES } from "@/constants/filters";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import GearIcon from "@/components/shared/icons/GearIcon";
import LinkIcon from "@/components/shared/icons/LinkIcon";
import SocialIconFromUrl from "@/components/shared/icons/SocialIconFromUrl";

type TabKey = "info" | "events" | "businesses";

export default function ProfilePage() {
    const router = useRouter();
    const currentUser = useUserStore(s => s.currentUser);
    const allBusinesses = useBusinessStore(s => s.getAllBusinesses());
    const allEvents = useEventsStore(s => s.getAllEvents());
    const [selectedTab, setSelectedTab] = useState<TabKey>("info");

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
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-10 bg-white">
                <Container className="pt-4 pb-4">
                    <NavigationButton
                        onClick={() => router.back()}
                        className="mb-4"
                    >
                        <ArrowIcon />
                        Назад
                    </NavigationButton>

                    <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center ">
                            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden mr-2">
                                <Image
                                    src={
                                        currentUser.photoUrl ||
                                        "/images/mockedData/girl.jpg"
                                    }
                                    alt={currentUser.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl font-semibold mb-[4px]">
                                    {currentUser.name}
                                </h1>
                                {(individualBusinessCategory ||
                                    currentUser.title) && (
                                    <p className="text-sm text-gray-placeholder">
                                        {individualBusinessCategory ||
                                            currentUser.title}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                                <ShareIcon className="w-5 h-5" />
                            </button>
                            <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                                <GearIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
            <Container className="pb-8 flex-1 overflow-y-auto">
                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={key => setSelectedTab(key as TabKey)}
                    classNames={{
                        base: "w-full",
                        tabList: "w-full",
                        cursor: "bg-primary",
                        tab: "text-sm",
                    }}
                >
                    <Tab key="info" title="Профиль">
                        <div className="w-full space-y-3 mt-4">
                            {individualBusinessImages.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-placeholder mb-2">
                                        Фото
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {individualBusinessImages.map(
                                            (imageUrl, index) => (
                                                <div
                                                    key={index}
                                                    className="relative w-full aspect-square rounded-[16px] overflow-hidden"
                                                >
                                                    <Image
                                                        src={imageUrl}
                                                        alt={`Image ${
                                                            index + 1
                                                        }`}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {(individualBusinessSocialLinks.length > 0 ||
                                individualBusinessSiteLinks.length > 0) && (
                                <div>
                                    <p className="text-sm text-gray-placeholder mb-2">
                                        Социальные сети
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {individualBusinessSocialLinks.map(
                                            (url, index) => {
                                                return (
                                                    <a
                                                        key={index}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                                        aria-label={`Social media link ${
                                                            index + 1
                                                        }`}
                                                    >
                                                        <SocialIconFromUrl
                                                            url={url}
                                                            className="flex-shrink-0"
                                                            size={20}
                                                        />
                                                    </a>
                                                );
                                            }
                                        )}
                                        {individualBusinessSiteLinks.map(
                                            (url, index) => (
                                                <a
                                                    key={`site-${index}`}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light hover:bg-gray-light transition-colors"
                                                    aria-label="Website link"
                                                >
                                                    <LinkIcon className="flex-shrink-0 w-5 h-5" />
                                                </a>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {individualBusinessTags.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-placeholder mb-2">
                                        Теги
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {individualBusinessTags.map(
                                            (tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-ultra-light rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {individualBusinessDescription && (
                                <div>
                                    <p className="text-sm text-gray-placeholder">
                                        Описание
                                    </p>
                                    <p className="text-base whitespace-pre-wrap">
                                        {individualBusinessDescription}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Tab>
                    <Tab key="events" title={`События (${userEvents.length})`}>
                        <div className="mt-4">
                            {userEvents.length > 0 ? (
                                <ItemsList items={userEvents} />
                            ) : (
                                <p className="text-center text-gray-placeholder py-8">
                                    Нет созданных событий
                                </p>
                            )}
                        </div>
                    </Tab>
                    <Tab
                        key="businesses"
                        title={`Бизнесы (${userBusinesses.length})`}
                    >
                        <div className="mt-4">
                            {userBusinesses.length > 0 ? (
                                <ItemsList items={userBusinesses} />
                            ) : (
                                <p className="text-center text-gray-placeholder py-8">
                                    Нет созданных бизнесов
                                </p>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}
