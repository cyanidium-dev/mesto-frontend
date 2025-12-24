"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import { useEventsStore } from "@/store/eventsStore";
import { useBusinessStore } from "@/store/businessStore";
import { useUserStore } from "@/store/userStore";
import { EventFormValues, BusinessFormValues } from "@/types/formValues";
import { Event } from "@/types/event";
import { Business } from "@/types/business";
import CheckCircleIcon from "@/components/shared/icons/CheckCircleIcon";

const DEFAULT_CALENDLY_URL = "https://calendly.com/shade09876";

interface SubmitProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues | BusinessFormValues>;
}

const description = {
    event: {
        create: {
            title: "Супер, вы создали событие!",
            description:
                "Теперь вы можете увидеть его на карте или изменить детали события зайдя через ваш профиль",
        },
        edit: {
            title: "Супер, вы изменили событие!",
            description:
                "Изменения сохранены. Вы можете увидеть его на карте или изменить детали события зайдя через ваш профиль",
        },
    },
    company: {
        create: {
            title: "Супер, вы создали бизнес-точку!",
            description:
                "Теперь вы можете увидеть её на карте или изменить детали бизнес-точки зайдя через ваш профиль",
        },
        edit: {
            title: "Супер, вы изменили бизнес-точку!",
            description:
                "Изменения сохранены. Вы можете увидеть её на карте или изменить детали бизнес-точки зайдя через ваш профиль",
        },
    },
    individual: {
        create: {
            title: "Супер, вы создали бизнес-точку!",
            description:
                "Теперь вы можете увидеть её на карте или изменить детали бизнес-точки зайдя через ваш профиль",
        },
        edit: {
            title: "Супер, вы изменили бизнес-точку!",
            description:
                "Изменения сохранены. Вы можете увидеть её на карте или изменить детали бизнес-точки зайдя через ваш профиль",
        },
    },
};

export const Submit = ({ formProps }: SubmitProps) => {
    const { values, isSubmitting } = formProps;
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const urlType = searchParams.get("type");
    const addEvent = useEventsStore(s => s.addEvent);
    const updateEvent = useEventsStore(s => s.updateEvent);
    const getEvent = useEventsStore(s => s.getEvent);
    const addBusiness = useBusinessStore(s => s.addBusiness);
    const updateBusiness = useBusinessStore(s => s.updateBusiness);
    const getBusiness = useBusinessStore(s => s.getBusiness);
    const currentUser = useUserStore(s => s.currentUser);

    const parseDateString = (dateString: string): Date => {
        if (!dateString) {
            throw new Error("Date string is empty");
        }

        if (dateString.includes("-")) {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        const parts = dateString.split(/\D/);
        if (parts.length === 3) {
            const formatter = new Intl.DateTimeFormat(navigator.language, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            const formatParts = formatter.formatToParts(new Date(2024, 11, 25));
            const orderedParts = formatParts.filter(p => p.type !== "literal");

            let year = "";
            let month = "";
            let day = "";

            orderedParts.forEach((part, i) => {
                if (part.type === "month") month = parts[i].padStart(2, "0");
                if (part.type === "day") day = parts[i].padStart(2, "0");
                if (part.type === "year") year = parts[i];
            });

            if (year && month && day) {
                const isoDate = `${year}-${month}-${day}`;
                const date = new Date(isoDate);
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date string: ${dateString}`);
        }
        return date;
    };

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
                itemId = editId || `event-${Date.now()}`;

                const getDefaultMaxAttendees = (category: string): number => {
                    const categoryDefaults: Record<string, number> = {
                        sports: 30,
                        art: 100,
                        food: 25,
                        work: 20,
                    };
                    return categoryDefaults[category] || 50;
                };

                if (editId) {
                    const existingEvent = getEvent(editId);
                    if (existingEvent) {
                        updateEvent(editId, {
                            category: values.category,
                            subcategory: values.subcategory,
                            languages: values.languages,
                            tags: values.tags,
                            title: values.title,
                            description: values.description,
                            imageUrls: values.imageUrls,
                            socialMediaUrls: values.socialMediaUrls,
                            location: values.position!,
                            startDate: parseDateString(values.startDate),
                            startTime: values.startTime,
                            endDate:
                                values.hasEndDate && values.endDate
                                    ? parseDateString(values.endDate)
                                    : undefined,
                            endTime:
                                values.hasEndTime && values.endTime
                                    ? values.endTime
                                    : undefined,
                            siteLink: values.siteLink,
                        });
                        itemId = editId;
                    }
                } else {
                    const getDefaultMaxAttendees = (
                        category: string
                    ): number => {
                        const categoryDefaults: Record<string, number> = {
                            sports: 30,
                            art: 100,
                            food: 25,
                            work: 20,
                        };
                        return categoryDefaults[category] || 50;
                    };

                    const newEvent: Event = {
                        id: itemId,
                        category: values.category,
                        subcategory: values.subcategory,
                        languages: values.languages,
                        tags: values.tags,
                        title: values.title,
                        description: values.description,
                        imageUrls: values.imageUrls,
                        socialMediaUrls: values.socialMediaUrls,
                        location: values.position!,
                        startDate: parseDateString(values.startDate),
                        startTime: values.startTime,
                        endDate:
                            values.hasEndDate && values.endDate
                                ? parseDateString(values.endDate)
                                : undefined,
                        endTime:
                            values.hasEndTime && values.endTime
                                ? values.endTime
                                : undefined,
                        creatorId: currentUser?.id || "anonymous",
                        attendees: [],
                        maxAttendees: getDefaultMaxAttendees(values.category),
                        siteLink: values.siteLink,
                    };
                    addEvent(newEvent);
                }
            } else {
                if (editId) {
                    const existingBusiness = getBusiness(editId);
                    if (existingBusiness) {
                        updateBusiness(editId, {
                            userType: values.userType,
                            category: values.category,
                            subcategory: values.subcategory,
                            languages: values.languages,
                            tags: values.tags,
                            title: values.title,
                            description: values.description,
                            imageUrls: values.imageUrls,
                            socialMediaUrls: values.socialMediaUrls,
                            location: values.position!,
                            workingHours: values.workingHours,
                            services: values.services,
                            siteLink: values.siteLink,
                        });
                        itemId = editId;
                    }
                } else {
                    itemId = `business-${Date.now()}`;
                    const newBusiness: Business = {
                        id: itemId,
                        userType: values.userType,
                        category: values.category,
                        subcategory: values.subcategory,
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
                        calendlyUrl: DEFAULT_CALENDLY_URL,
                    };
                    addBusiness(newBusiness);
                }
            }

            if (editId) {
                router.push("/profile");
            } else if (navigateToMap && itemId) {
                router.push(`/main?view=map&focus=${itemId}`);
            } else {
                router.push("/main");
            }
        } catch (error) {
            if (editId) {
                router.push("/profile");
            } else {
                router.push("/main");
            }
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
                    {editId
                        ? description[type].edit.title
                        : description[type].create.title}
                </SectionTitle>
                <p className="text-center max-w-[265px]">
                    {editId
                        ? description[type].edit.description
                        : description[type].create.description}
                </p>
            </div>
            <div className="flex flex-col gap-3">
                <MainButton
                    onClick={handleSave}
                    variant="primary"
                    className="h-12"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Сохранение..."
                        : editId
                        ? "Вернуться в профиль"
                        : "На главную"}
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
