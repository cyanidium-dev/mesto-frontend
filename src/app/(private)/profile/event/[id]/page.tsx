"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEventsStore } from "@/store/eventsStore";
import { useUserStore } from "@/store/userStore";
import { useBusinessStore } from "@/store/businessStore";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { Tabs, Tab } from "@heroui/react";
import { getCoordinates } from "@/utils/distance";
import EventHeader from "@/components/profilePage/event/EventHeader";
import EventImageGallery from "@/components/profilePage/event/EventImageGallery";
import EventTitle from "@/components/profilePage/event/EventTitle";
import EventTags from "@/components/profilePage/event/EventTags";
import EventOverviewTab from "@/components/profilePage/event/EventOverviewTab";
import EventDescriptionTab from "@/components/profilePage/event/EventDescriptionTab";
import EventParticipantsTab from "@/components/profilePage/event/EventParticipantsTab";
import EventBottomBar from "@/components/profilePage/event/EventBottomBar";
import clsx from "clsx";

type TabKey = "overview" | "description" | "participants";

export default function EventProfilePage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const eventId = params.id as string;
    const getEvent = useEventsStore(s => s.getEvent);
    const getUser = useUserStore(s => s.getUser);
    const currentUser = useUserStore(s => s.currentUser);
    const initializeBusinessMockData = useBusinessStore(
        s => s.initializeMockData
    );
    const [event, setEvent] = useState<Event | null>(null);
    const [organizers, setOrganizers] = useState<User[]>([]);
    const [attendees, setAttendees] = useState<User[]>([]);
    const tabParam = searchParams.get("tab");
    const [selectedTab, setSelectedTab] = useState<TabKey>(
        (tabParam as TabKey) || "overview"
    );
    const [locationAddress, setLocationAddress] = useState<string>("");
    const [locationCity, setLocationCity] = useState<string>("");
    const [locationCountry, setLocationCountry] = useState<string>("");

    const isCurrentUserCreator =
        currentUser && event && currentUser.id === event.creatorId;

    useEffect(() => {
        initializeBusinessMockData();
    }, [initializeBusinessMockData]);

    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (
            tabParam &&
            ["overview", "description", "participants"].includes(tabParam)
        ) {
            setSelectedTab(tabParam as TabKey);
        }
    }, [searchParams]);

    useEffect(() => {
        const eventData = getEvent(eventId);
        if (eventData) {
            setEvent(eventData);
            const creatorData = getUser(eventData.creatorId);
            if (creatorData) {
                setOrganizers([creatorData]);
            }

            const attendeesData = eventData.attendees.map(attendeeId =>
                getUser(attendeeId)
            );
            if (attendeesData) {
                setAttendees(attendeesData.filter(user => user !== null));
            }

            const coords = getCoordinates(eventData.location);
            if (coords) {
                fetch(`/api/geocode/reverse?lat=${coords[0]}&lon=${coords[1]}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.display_name) {
                            setLocationAddress(data.display_name);
                        }
                        if (data.address) {
                            const city =
                                data.address.city ||
                                data.address.town ||
                                data.address.village ||
                                data.address.municipality ||
                                "";
                            const country = data.address.country || "";
                            setLocationCity(city);
                            setLocationCountry(country);
                        }
                    })
                    .catch(() => {});
            }
        }
    }, [eventId, getEvent, getUser]);

    const handleBack = () => {
        const returnTo = searchParams.get("returnTo");
        if (returnTo) {
            router.push(returnTo);
        } else {
            router.back();
        }
    };

    const allImageUrls =
        event?.imageUrls?.filter(
            url =>
                url &&
                (url.startsWith("http") ||
                    url.startsWith("data:") ||
                    url.startsWith("/"))
        ) || [];

    if (!event) {
        return (
            <Container>
                <NavigationButton onClick={handleBack} className="mb-2">
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <p>Событие не найдено</p>
            </Container>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-10 bg-white">
                <Container className="pt-4">
                    <EventHeader />
                </Container>
            </div>

            <Container
                className={clsx(
                    "pt-4 flex-1 overflow-y-auto",
                    isCurrentUserCreator ? "pb-4" : "pb-24"
                )}
            >
                <EventImageGallery
                    imageUrls={allImageUrls}
                    eventTitle={event.title}
                />
                <EventTitle event={event} />
                <EventTags event={event} />

                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={key => setSelectedTab(key as TabKey)}
                    classNames={{
                        base: "w-full",
                        tabList: "gap-0 w-full rounded-full p-0",
                        cursor: "bg-primary rounded-full",
                        tab: "text-sm data-[selected=true]:!text-white rounded-full",
                        tabContent: "text-sm",
                    }}
                >
                    <Tab
                        key="overview"
                        title={
                            <span
                                className={
                                    selectedTab === "overview"
                                        ? "text-white"
                                        : ""
                                }
                            >
                                Обзор
                            </span>
                        }
                    >
                        <EventOverviewTab
                            event={event}
                            locationAddress={locationAddress}
                            locationCity={locationCity}
                            locationCountry={locationCountry}
                        />
                    </Tab>

                    <Tab
                        key="description"
                        title={
                            <span
                                className={
                                    selectedTab === "description"
                                        ? "text-white"
                                        : ""
                                }
                            >
                                Описание
                            </span>
                        }
                    >
                        <EventDescriptionTab event={event} />
                    </Tab>

                    <Tab
                        key="participants"
                        title={
                            <span
                                className={
                                    selectedTab === "participants"
                                        ? "text-white"
                                        : ""
                                }
                            >
                                Участники
                            </span>
                        }
                    >
                        <EventParticipantsTab
                            event={event}
                            organizers={organizers}
                            attendees={attendees}
                        />
                    </Tab>
                </Tabs>
            </Container>

            {!isCurrentUserCreator && <EventBottomBar event={event} />}
        </div>
    );
}
