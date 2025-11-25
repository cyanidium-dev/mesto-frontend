"use client";
import Image from "next/image";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import { CATEGORIES } from "@/constants/filters";

interface EventParticipantsTabProps {
    event: Event;
    creator: User | null;
    participantsCount: number;
}

export default function EventParticipantsTab({ event, creator, participantsCount }: EventParticipantsTabProps) {
    return (
        <div className="space-y-4 mt-4">
            {/* Organizer Block */}
            <div>
                <p className="text-sm text-gray-placeholder mb-2">
                    Организатор
                </p>
                {creator ? (
                    <div className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-gray-ultra-light transition-colors cursor-pointer">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <Image
                                src={creator.photoUrl || "/images/mockedData/girl.jpg"}
                                alt={creator.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold">
                                {creator.name}
                            </p>
                            <p className="text-sm text-gray-placeholder">
                                {CATEGORIES.find(cat => cat.key === event.category)?.label || event.category}
                            </p>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                ) : (
                    <div className="p-3 rounded-[12px] bg-gray-ultra-light">
                        <p className="text-sm text-gray-placeholder">Организатор не указан</p>
                    </div>
                )}
            </div>

            {/* Participants */}
            <div>
                <p className="text-sm text-gray-placeholder mb-2">
                    Участники ({participantsCount.toLocaleString("ru-RU")})
                </p>
                {/* For now, show creator as participant (in real app, would show actual participants) */}
                {creator && (
                    <div className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-gray-ultra-light transition-colors cursor-pointer">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <Image
                                src={creator.photoUrl || "/images/mockedData/girl.jpg"}
                                alt={creator.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold">
                                {creator.name}
                            </p>
                            <p className="text-sm text-gray-placeholder">
                                Персональный аккаунт
                            </p>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-placeholder shrink-0">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}

