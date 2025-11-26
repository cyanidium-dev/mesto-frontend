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
import CheckCircleIcon from "@/components/shared/icons/CheckCircleIcon";

interface SubmitProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues | BusinessFormValues>;
}

const description = {
    event: {
        title: "Супер, вы создали событие!",
        description:
            "Теперь вы можете увидеть его на карте или изменить детали события зайдя через ваш профиль",
    },
    company: {
        title: "Супер, вы создали бизнес точку!",
        description:
            "Теперь вы можете увидеть её на карте или изменить детали бизнес точки зайдя через ваш профиль",
    },
    individual: {
        title: "Супер, вы создали бизнес точку!",
        description:
            "Теперь вы можете увидеть её на карте или изменить детали бизнес точки зайдя через ваш профиль",
    },
};

export const Submit = ({ formProps }: SubmitProps) => {
    const { values, isSubmitting } = formProps;
    const router = useRouter();
    const addEvent = useEventsStore(s => s.addEvent);
    const addBusiness = useBusinessStore(s => s.addBusiness);
    const currentUser = useUserStore(s => s.currentUser);

    let type: "event" | "company" | "individual";
    if ("userType" in values && values.userType) {
        type = values.userType === "individual" ? "individual" : "company";
    } else {
        type = "event";
    }

    const isEventForm = (
        values: EventFormValues | BusinessFormValues
    ): values is EventFormValues => {
        return "startDate" in values;
    };

    const handleSave = () => {
        try {
            if (isEventForm(values)) {
                const eventValues: EventFormValues = values;
                console.log(
                    "📸 Saving Event with imageUrls:",
                    eventValues.imageUrls
                );
                console.log(
                    "📸 ImageUrls length:",
                    eventValues.imageUrls?.length
                );
                console.log(
                    "📸 First imageUrl:",
                    eventValues.imageUrls?.[0]?.substring(0, 50) + "..."
                );
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
                console.log(
                    "📸 Saving Business with imageUrls:",
                    businessValues.imageUrls
                );
                console.log(
                    "📸 ImageUrls length:",
                    businessValues.imageUrls?.length
                );
                console.log(
                    "📸 First imageUrl:",
                    businessValues.imageUrls?.[0]?.substring(0, 50) + "..."
                );
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
            // Navigate to main page after saving
            router.push("/main");
        } catch (error) {
            console.error("Error saving:", error);
            // Still navigate even if there's an error
            router.push("/main");
        }
    };

    const handleViewOnMap = () => {
        // handleSave already navigates to /main
        handleSave();
        // TODO: Navigate to map with event selected
    };

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div className="flex flex-col items-center justify-center mt-[95px] h-full">
                <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6">
                    <CheckCircleIcon className="w-[72px] h-[72px] text-[#00C950]" />
                </div>
                <SectionTitle className="mb-3 text-center relative">
                    {description[type].title}
                </SectionTitle>
                <p className="text-center max-w-[265px]">
                    {description[type].description}
                </p>
            </div>
            <div className="flex flex-col gap-3">
                <MainButton
                    onClick={handleSave}
                    variant="primary"
                    className="h-12"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Сохранение..." : "На главную"}
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
