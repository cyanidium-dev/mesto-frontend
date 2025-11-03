"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import { useRouter } from "next/navigation";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import { useEventsStore } from "@/store/eventsStore";
import { useUserStore } from "@/store/userStore";
import { EventFormValues, BusinessFormValues } from "@/types/formValues";
import { Event } from "@/types/event";

interface SubmitProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues | BusinessFormValues>;
}

export const Submit = ({ setCurrentStep, formProps }: SubmitProps) => {
    const { values, handleSubmit, isSubmitting } = formProps;
    const router = useRouter();
    const addEvent = useEventsStore(s => s.addEvent);
    const currentUser = useUserStore(s => s.currentUser);

    const isEventForm = (
        values: EventFormValues | BusinessFormValues
    ): values is EventFormValues => {
        return "startDate" in values;
    };

    const handleSave = () => {
        if (!currentUser) {
            console.error("User not logged in");
            return;
        }

        if (isEventForm(values)) {
            const newEvent: Event = {
                id: `event-${Date.now()}`,
                category: values.category,
                languages: values.languages,
                tags: values.tags,
                title: values.title,
                description: values.description,
                imageUrls: values.imageUrls,
                socialMediaUrls: values.socialLinks,
                position: values.position!,
                startDate: new Date(values.startDate),
                startTime: values.startTime,
                endDate:
                    values.hasEndDate && values.endDate
                        ? new Date(values.endDate)
                        : undefined,
                endTime: values.endTime,
                creatorId: currentUser.id,
                attendees: [],
            };
            addEvent(newEvent);
        } else {
            // Handle business form submission
            // TODO: Implement business form submission
            console.log("Business form submission not yet implemented", values);
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
                <SectionTitle className="mb-6">Событие создано!</SectionTitle>
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
