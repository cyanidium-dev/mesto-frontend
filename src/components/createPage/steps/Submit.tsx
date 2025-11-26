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

    const handleSave = (navigateToMap = false) => {
        try {
            let itemId: string | null = null;

            if (isEventForm(values)) {
                itemId = `event-${Date.now()}`;
                const newEvent: Event = {
                    id: itemId,
                    category: values.category,
                    languages: values.languages,
                    tags: values.tags,
                    title: values.title,
                    description: values.description,
                    imageUrls: values.imageUrls,
                    socialMediaUrls: values.socialMediaUrls,
                    location: values.position!,
                    startDate: new Date(values.startDate),
                    startTime: values.startTime,
                    endDate:
                        values.hasEndDate && values.endDate
                            ? new Date(values.endDate)
                            : undefined,
                    endTime:
                        values.hasEndTime && values.endTime
                            ? values.endTime
                            : undefined,
                    creatorId: currentUser?.id || "anonymous",
                    attendees: [],
                    siteLink: values.siteLink,
                };
                addEvent(newEvent);
            } else {
                itemId = `business-${Date.now()}`;
                const newBusiness: Business = {
                    id: itemId,
                    userType: values.userType,
                    category: values.category,
                    languages: values.languages,
                    tags: values.tags,
                    title: values.title,
                    description: values.description,
                    imageUrls: values.imageUrls,
                    socialMediaUrls: values.socialMediaUrls,
                    location: values.position!,
                    workingHours: values.workingHours,
                    services: values.services,
                    creatorId: currentUser?.id || "anonymous",
                    siteLink: values.siteLink,
                };
                addBusiness(newBusiness);
            }

            if (navigateToMap && itemId) {
                router.push(`/main?view=map&focus=${itemId}`);
            } else {
                router.push("/main");
            }
        } catch (error) {
            console.error("Error saving:", error);
            router.push("/main");
        }
    };

    const handleViewOnMap = () => {
        handleSave(true);
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
