"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import { CATEGORIES } from "@/constants/filters";
import { useBusinessStore } from "@/store/businessStore";
import ArrowDiagonalIcon from "@/components/shared/icons/ArrowDiagonalIcon";

interface EventParticipantsTabProps {
    event: Event;
    organizers: User[];
    attendees: User[];
}

export default function EventParticipantsTab({
    event,
    organizers,
    attendees,
}: EventParticipantsTabProps) {
    const router = useRouter();
    const initializeBusinessMockData = useBusinessStore(
        s => s.initializeMockData
    );

    useEffect(() => {
        initializeBusinessMockData();
    }, [initializeBusinessMockData]);

    const handleUserClick = (userId: string) => {
        router.push(`/profile/user/${userId}`);
    };

    return (
        <div className="space-y-4 mt-4">
            <div>
                <p className="text-[12px] font-semibold mb-2">
                    Организатор ({organizers.length})
                </p>
                {organizers.length > 0 ? (
                    organizers.map(organizer => (
                        <button
                            key={organizer.id}
                            onClick={() => handleUserClick(organizer.id)}
                            className="flex items-center gap-3 p-3 rounded-[12px] w-full text-left hover:bg-gray-ultra-light transition-colors"
                        >
                            <div className="relative size-10 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={
                                        organizer.photoUrl ||
                                        organizer.profilePictureUrl ||
                                        "/images/mockedData/girl.jpg"
                                    }
                                    alt={organizer.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-medium">
                                    {organizer.name}
                                </p>
                                <p className="text-[10px] font-medium text-gray-placeholder">
                                    {CATEGORIES.find(
                                        cat => cat.key === event.category
                                    )?.label || event.category}
                                </p>
                            </div>
                            <div className="flex items-center justify-center size-8 rounded-full bg-gray-ultra-light">
                                <ArrowDiagonalIcon className="text-black shrink-0 w-5 h-5" />
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="p-3 rounded-[12px] bg-gray-ultra-light">
                        <p className="text-[12px] font-light text-gray-placeholder">
                            Организатор не указан
                        </p>
                    </div>
                )}
            </div>

            <div>
                <p className="text-[12px] font-semibold mb-2">
                    Участники ({attendees.length})
                </p>
                {attendees.length > 0 ? (
                    attendees.map(attendee => (
                        <button
                            key={attendee.id}
                            onClick={() => handleUserClick(attendee.id)}
                            className="flex items-center gap-3 p-3 rounded-[12px] w-full text-left hover:bg-gray-ultra-light transition-colors"
                        >
                            <div className="relative size-10 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={
                                        attendee.photoUrl ||
                                        attendee.profilePictureUrl ||
                                        "/images/mockedData/girl.jpg"
                                    }
                                    alt={attendee.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-medium">
                                    {attendee.name}
                                </p>
                                <p className="text-[10px] font-medium text-gray-placeholder">
                                    Персональный аккаунт
                                </p>
                            </div>
                            <div className="flex items-center justify-center size-8 rounded-full bg-gray-ultra-light">
                                <ArrowDiagonalIcon className="text-black shrink-0 w-5 h-5" />
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="p-3 rounded-[12px] bg-gray-ultra-light">
                        <p className="text-[12px] font-light text-gray-placeholder">
                            Пока нет участников
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
