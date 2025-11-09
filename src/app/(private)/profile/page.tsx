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
import Card from "@/components/mainPage/Card";
import EventCard from "@/components/mainPage/EventCard";

type TabKey = "info" | "events" | "businesses";

export default function ProfilePage() {
    const router = useRouter();
    const currentUser = useUserStore(s => s.currentUser);
    const allBusinesses = useBusinessStore(s => s.getAllBusinesses());
    const allEvents = useEventsStore(s => s.getAllEvents());
    const [selectedTab, setSelectedTab] = useState<TabKey>("info");

    // Filter businesses and events by creatorId
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
        <Container className="pt-4 pb-8">
            <NavigationButton onClick={() => router.back()} className="mb-4">
                <ArrowIcon />
                Назад
            </NavigationButton>

            {/* Static Header - PFP, Name, Title */}
            <div className="flex items-center mb-3">
                <div className="flex items-center justify-between w-full">
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
                        {currentUser.title && (
                            <p className="text-sm text-gray-placeholder">
                                {currentUser.title}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                        <svg className="w-5 h-5">
                            <use href="/images/icons/share.svg" />
                        </svg>
                    </button>
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-ultra-light">
                        <svg className="w-5 h-5">
                            <use href="/images/icons/gear.svg" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Tabs */}
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
                        <div>
                            <p className="text-sm text-gray-placeholder">
                                Email
                            </p>
                            <p className="text-base">{currentUser.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-placeholder">
                                Город
                            </p>
                            <p className="text-base">{currentUser.city}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-placeholder">
                                Дата рождения
                            </p>
                            <p className="text-base">
                                {new Date(
                                    currentUser.birthDay
                                ).toLocaleDateString("ru-RU")}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-placeholder">Пол</p>
                            <p className="text-base">{currentUser.gender}</p>
                        </div>
                        {currentUser.interests &&
                            currentUser.interests.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-placeholder">
                                        Интересы
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {currentUser.interests.map(
                                            (interest, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-ultra-light rounded-full text-sm"
                                                >
                                                    {interest}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        {currentUser.description && (
                            <div>
                                <p className="text-sm text-gray-placeholder">
                                    Описание
                                </p>
                                <p className="text-base whitespace-pre-wrap">
                                    {currentUser.description}
                                </p>
                            </div>
                        )}
                        {currentUser.tags && currentUser.tags.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-placeholder">
                                    Теги
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {currentUser.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-ultra-light rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {currentUser.socialMediaUrls &&
                            currentUser.socialMediaUrls.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-placeholder">
                                        Социальные сети
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {currentUser.socialMediaUrls.map(
                                            (url, index) => (
                                                <a
                                                    key={index}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary text-sm underline"
                                                >
                                                    {url}
                                                </a>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        {currentUser.siteLink && (
                            <div>
                                <p className="text-sm text-gray-placeholder">
                                    Сайт
                                </p>
                                <a
                                    href={currentUser.siteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary text-sm underline"
                                >
                                    {currentUser.siteLink}
                                </a>
                            </div>
                        )}
                    </div>
                </Tab>
                <Tab key="events" title={`События (${userEvents.length})`}>
                    <div className="mt-4">
                        {userEvents.length > 0 ? (
                            <ul className="flex flex-col gap-2">
                                {userEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </ul>
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
                            <ul className="flex flex-col gap-2">
                                {userBusinesses.map(business => (
                                    <Card
                                        key={business.id}
                                        business={business}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-placeholder py-8">
                                Нет созданных бизнесов
                            </p>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </Container>
    );
}
