"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import { useRouter } from "next/navigation";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import { useEventsStore } from "@/store/eventsStore";
import { useBusinessStore } from "@/store/businessStore";
import { useUserStore } from "@/store/userStore";
import { EventFormValues, BusinessFormValues } from "@/types/formValues";
import { Event } from "@/types/event";
import { Business } from "@/types/business";

interface SubmitProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues | BusinessFormValues>;
}

export const Submit = ({ formProps }: SubmitProps) => {
    const { values, handleSubmit, isSubmitting } = formProps;
    const router = useRouter();
    const addEvent = useEventsStore(s => s.addEvent);
    const addBusiness = useBusinessStore(s => s.addBusiness);
    const currentUser = useUserStore(s => s.currentUser);

    const isEventForm = (
        values: EventFormValues | BusinessFormValues
    ): values is EventFormValues => {
        return "startDate" in values;
    };

    const handleSave = () => {
        if (isEventForm(values)) {
            const eventValues: EventFormValues = values;
            console.log("📸 Saving Event with imageUrls:", eventValues.imageUrls);
            console.log("📸 ImageUrls length:", eventValues.imageUrls?.length);
            console.log("📸 First imageUrl:", eventValues.imageUrls?.[0]?.substring(0, 50) + "...");
            const newEvent: Event = {
                id: `event-${Date.now()}`,
                category: eventValues.category,
                languages: eventValues.languages,
                tags: eventValues.tags,
                title: eventValues.title,
                description: eventValues.description,
                imageUrls: eventValues.imageUrls,
                socialMediaUrls: eventValues.socialMediaUrls,
                location: eventValues.position!,
                startDate: new Date(eventValues.startDate),
                startTime: eventValues.startTime,
                endDate:
                    eventValues.hasEndDate && eventValues.endDate
                        ? new Date(eventValues.endDate)
                        : undefined,
                endTime:
                    eventValues.hasEndTime && eventValues.endTime
                        ? eventValues.endTime
                        : undefined,
                creatorId: currentUser?.id || "anonymous",
                attendees: [],
                siteLink: eventValues.siteLink,
            };
            console.log("✅ Event saved:", newEvent);
            addEvent(newEvent);
        } else {
            const businessValues: BusinessFormValues = values;
            console.log("📸 Saving Business with imageUrls:", businessValues.imageUrls);
            console.log("📸 ImageUrls length:", businessValues.imageUrls?.length);
            console.log("📸 First imageUrl:", businessValues.imageUrls?.[0]?.substring(0, 50) + "...");
            const newBusiness: Business = {
                id: `business-${Date.now()}`,
                userType: businessValues.userType,
                category: businessValues.category,
                languages: businessValues.languages,
                tags: businessValues.tags,
                title: businessValues.title,
                description: businessValues.description,
                imageUrls: businessValues.imageUrls,
                socialMediaUrls: businessValues.socialMediaUrls,
                location: businessValues.position!,
                workingHours: businessValues.workingHours,
                services: businessValues.services,
                creatorId: currentUser?.id || "anonymous",
                siteLink: businessValues.siteLink,
            };
            console.log("✅ Business saved:", newBusiness);
            addBusiness(newBusiness);
        }
        handleSubmit();
    };

    const handleViewOnMap = () => {
        handleSave();
        // TODO: Navigate to map with event selected
        router.push("/main");
    };

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">
                    {isEventForm(values) ? "Событие создано!" : "Бизнес создан!"}
                </SectionTitle>
                <div className="space-y-4">
                    <div>
                        <p className="text-[12px] text-gray-placeholder mb-1">
                            Название
                        </p>
                        <p className="text-[16px] font-medium">
                            {values.title}
                        </p>
                    </div>
                    {values.description && (
                        <div>
                            <p className="text-[12px] text-gray-placeholder mb-1">
                                Описание
                            </p>
                            <p className="text-[16px]">{values.description}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-[12px] text-gray-placeholder mb-1">
                            Категория
                        </p>
                        <p className="text-[16px] font-medium">
                            {values.category}
                        </p>
                    </div>
                    {isEventForm(values) && values.startDate && (
                        <div>
                            <p className="text-[12px] text-gray-placeholder mb-1">
                                Дата начала
                            </p>
                            <p className="text-[16px]">
                                {new Date(values.startDate).toLocaleDateString(
                                    "ru-RU"
                                )}
                                {values.startTime && ` в ${values.startTime}`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <MainButton
                    onClick={handleSave}
                    variant="primary"
                    className="h-12"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Сохранение..." : "Вернуться на главную"}
                </MainButton>
                <MainButton
                    onClick={handleViewOnMap}
                    variant="secondary"
                    className="h-12"
                    disabled={isSubmitting}
                >
                    Посмотреть на карте
                </MainButton>
            </div>
        </div>
    );
};
