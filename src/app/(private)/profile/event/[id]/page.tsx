"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEventsStore } from "@/store/eventsStore";
import { useUserStore } from "@/store/userStore";
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

type TabKey = "overview" | "description" | "participants";

export default function EventProfilePage() {
    const params = useParams();
    const eventId = params.id as string;
    const getEvent = useEventsStore(s => s.getEvent);
    const getUser = useUserStore(s => s.getUser);
    const [event, setEvent] = useState<Event | null>(null);
    const [creator, setCreator] = useState<User | null>(null);
    const [selectedTab, setSelectedTab] = useState<TabKey>("overview");
    const [locationAddress, setLocationAddress] = useState<string>("");

    useEffect(() => {
        const eventData = getEvent(eventId);
        if (eventData) {
            setEvent(eventData);
            const creatorData = getUser(eventData.creatorId);
            setCreator(creatorData);

            // Get location address
            const coords = getCoordinates(eventData.location);
            if (coords) {
                fetch(`/api/geocode/reverse?lat=${coords[0]}&lon=${coords[1]}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.display_name) {
                            setLocationAddress(data.display_name);
                        }
                    })
                    .catch(() => {});
            }
        }
    }, [eventId, getEvent, getUser]);

    // Get all valid image URLs
    const allImageUrls = event?.imageUrls?.filter(
        url =>
            url &&
            (url.startsWith("http") ||
                url.startsWith("data:") ||
                url.startsWith("/"))
    ) || [];

    if (!event) {
        return (
            <Container>
                <NavigationButton
                    onClick={() => window.history.back()}
                    className="mb-2"
                >
                    <ArrowIcon />
                    Назад
                </NavigationButton>
                <p>Событие не найдено</p>
            </Container>
        );
    }

    // Get participants (for now, using attendees array length)
    const participantsCount = event.attendees?.length || 0;

    return (
        <div className="flex flex-col h-screen">
            <Container className="pt-4 pb-24 flex-1 overflow-y-auto">
                <EventHeader />
                <EventImageGallery imageUrls={allImageUrls} eventTitle={event.title} />
                <EventTitle event={event} />
                <EventTags event={event} />

                {/* Tabs */}
                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as TabKey)}
                    classNames={{
                        base: "w-full",
                        tabList: "gap-0 w-full",
                        cursor: "bg-primary",
                        tab: "text-sm data-[selected=true]:!text-white",
                        tabContent: "text-sm",
                    }}
                >
                    <Tab 
                        key="overview" 
                        title={<span className={selectedTab === "overview" ? "text-white" : ""}>Обзор</span>}
                    >
                        <EventOverviewTab event={event} locationAddress={locationAddress} />
                    </Tab>

                    <Tab 
                        key="description" 
                        title={<span className={selectedTab === "description" ? "text-white" : ""}>Описание</span>}
                    >
                        <EventDescriptionTab event={event} />
                    </Tab>

                    <Tab 
                        key="participants" 
                        title={<span className={selectedTab === "participants" ? "text-white" : ""}>Участники</span>}
                    >
                        <EventParticipantsTab event={event} creator={creator} participantsCount={participantsCount} />
                    </Tab>
                </Tabs>
            </Container>

            <EventBottomBar event={event} />
        </div>
    );
}
