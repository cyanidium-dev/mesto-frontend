import { useRouter, useSearchParams } from "next/navigation";
import {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
    Dispatch,
    SetStateAction,
} from "react";
import { StepZero } from "./steps/StepZero";
import { LangCategory } from "./steps/LangCategory";
import { Interests } from "./steps/Interests";
import { Title } from "./steps/Title";
import { EventDateTime } from "./steps/EventDateTime";
import { Location } from "./steps/Location";
import { DescriptionSocials } from "./steps/DescriptionSocials";
import { ImagesUpload } from "./steps/ImagesUpload";
import { Submit } from "./steps/Submit";
import { BussinessType } from "./steps/BussinessType";
import { WorkingHours } from "./steps/WorkingHours";
import { ReusableForm } from "./ReusableForm";
import {
    EventFormValues,
    BusinessFormValues,
    BaseFormValues,
} from "@/types/formValues";
import { createEventValidationSchema } from "@/schemas/createEventValidation";
import { createBusinessValidationSchema } from "@/schemas/createBussinessValidation";
import { FormikProps, useFormikContext } from "formik";
import { useUserStore } from "@/store/userStore";
import { useBusinessStore } from "@/store/businessStore";
import { useEventsStore } from "@/store/eventsStore";
import { Event } from "@/types/event";
import { Business } from "@/types/business";

interface CreateFormProps {
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    onCreateTypeChange?: (type: "event" | "business" | null) => void;
    onUserTypeChange?: (userType: "business" | "individual" | null) => void;
}

export const CreateForm = ({
    currentStep,
    setCurrentStep,
    onCreateTypeChange,
    onUserTypeChange,
}: CreateFormProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const urlType = searchParams.get("type");
    const urlUserType = searchParams.get("userType") as
        | "business"
        | "individual"
        | null;

    const getBusiness = useBusinessStore(s => s.getBusiness);
    const getEvent = useEventsStore(s => s.getEvent);
    const initializeBusinessMockData = useBusinessStore(
        s => s.initializeMockData
    );
    const initializeEventsMockData = useEventsStore(s => s.initializeMockData);

    const [createType, setCreateType] = useState<"event" | "business" | null>(
        urlType === "event" || urlType === "business" ? urlType : null
    );

    useEffect(() => {
        initializeBusinessMockData();
        initializeEventsMockData();
    }, [initializeBusinessMockData, initializeEventsMockData]);

    const stepInitializedRef = useRef<string | null>(null);

    const editItem = useMemo(() => {
        if (!editId) {
            stepInitializedRef.current = null;
            return null;
        }
        if (urlType === "event") {
            return getEvent(editId);
        } else if (urlType === "business") {
            return getBusiness(editId);
        }
        return null;
    }, [editId, urlType, getEvent, getBusiness]);

    const convertEventToFormValues = (event: Event): EventFormValues => {
        const formatDate = (date: Date | string | undefined): string => {
            if (!date) return "";
            const dateObj = date instanceof Date ? date : new Date(date);
            if (isNaN(dateObj.getTime())) return "";
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        return {
            type: "",
            category: event.category,
            languages: event.languages,
            tags: event.tags || [],
            title: event.title,
            startDate: formatDate(event.startDate),
            startTime: event.startTime || "",
            hasEndDate: !!event.endDate,
            endDate: formatDate(event.endDate),
            hasEndTime: !!event.endTime,
            endTime: event.endTime || "",
            position: event.location,
            description: event.description || "",
            socialMediaUrls: event.socialMediaUrls || [],
            siteLink: event.siteLink || "",
            imageUrls: event.imageUrls || [],
        };
    };

    const convertBusinessToFormValues = (
        business: Business
    ): BusinessFormValues => {
        return {
            type: "",
            userType: business.userType,
            category: business.category,
            languages: business.languages,
            tags: business.tags,
            title: business.title || "",
            workingHours:
                business.workingHours?.map(wh =>
                    wh
                        ? { start: wh.start, end: wh.end }
                        : { start: "", end: "" }
                ) || [],
            position: business.location,
            description: business.description,
            socialMediaUrls: business.socialMediaUrls || [],
            siteLink: business.siteLink || "",
            imageUrls: business.imageUrls || [],
            services: business.services || [],
        };
    };

    const handleCreateTypeChange = useCallback(
        (type: "event" | "business" | null) => {
            setCreateType(type);
            onCreateTypeChange?.(type);
            // Reset userType when switching to event
            if (type === "event" && onUserTypeChange) {
                onUserTypeChange(null);
            }
        },
        [onCreateTypeChange, onUserTypeChange]
    );

    const submitForm = () => {
        router.push("/main");
    };

    const eventInitialValues: EventFormValues = useMemo(() => {
        if (editItem && "startDate" in editItem) {
            return convertEventToFormValues(editItem as Event);
        }
        return {
            type: "",
            category: "",
            languages: [],
            tags: [],
            title: "",
            startDate: "",
            startTime: "",
            hasEndDate: false,
            endDate: "",
            hasEndTime: false,
            endTime: "",
            position: null,
            description: "",
            socialMediaUrls: [],
            siteLink: "",
            imageUrls: [],
        };
    }, [editItem]);

    const businessInitialValues: BusinessFormValues = useMemo(() => {
        if (editItem && !("startDate" in editItem)) {
            return convertBusinessToFormValues(editItem as Business);
        }
        return {
            type: "",
            userType: urlUserType || "business",
            category: "",
            languages: [],
            tags: [],
            title: "",
            workingHours: [],
            position: null,
            description: "",
            socialMediaUrls: [],
            siteLink: "",
            imageUrls: [],
            services: [],
        };
    }, [editItem, urlUserType]);

    useEffect(() => {
        if (editId && stepInitializedRef.current === editId) {
            if (editItem && createType) {
                const maxStep = createType === "event" ? 8 : 9;
                if (currentStep > maxStep) {
                    const itemType =
                        "startDate" in editItem ? "event" : "business";
                    if (itemType === "business") {
                        setCurrentStep(2);
                    } else {
                        setCurrentStep(1);
                    }
                }
            }
            return;
        }
        if (!editId) {
            stepInitializedRef.current = null;
            return;
        }

        if (editId && editItem) {
            if (!createType) {
                stepInitializedRef.current = editId;
                const itemType = "startDate" in editItem ? "event" : "business";
                handleCreateTypeChange(itemType);
                if (itemType === "business") {
                    setCurrentStep(2);
                } else {
                    setCurrentStep(1);
                }
            } else if (currentStep === 0 && !stepInitializedRef.current) {
                stepInitializedRef.current = editId;
                const itemType = "startDate" in editItem ? "event" : "business";
                if (itemType === "business") {
                    setCurrentStep(2);
                } else {
                    setCurrentStep(1);
                }
            }
        } else if (urlType && !createType && !editId) {
            handleCreateTypeChange(urlType as "event" | "business");
        }
    }, [
        editId,
        urlType,
        createType,
        editItem,
        currentStep,
        handleCreateTypeChange,
        setCurrentStep,
    ]);

    // Initialize userType from URL or edit item
    useEffect(() => {
        if (onUserTypeChange) {
            if (urlUserType) {
                onUserTypeChange(urlUserType);
            } else if (editItem && !("startDate" in editItem)) {
                const business = editItem as Business;
                onUserTypeChange(business.userType);
            } else if (createType === "event") {
                onUserTypeChange(null);
            }
        }
    }, [urlUserType, editItem, createType, onUserTypeChange]);

    if (!editId && (currentStep === 0 || !createType)) {
        return (
            <StepZero
                setCreateType={(type: "event" | "business") => {
                    handleCreateTypeChange(type);
                    setCurrentStep(1);
                }}
            />
        );
    }

    if (editId && (!editItem || !createType || currentStep > 9)) {
        return <div>Загрузка...</div>;
    }

    if (createType === "event") {
        return (
            <ReusableForm<EventFormValues>
                initialValues={eventInitialValues}
                validationSchema={createEventValidationSchema()}
                onSubmit={submitForm}
                enableReinitialize
            >
                {props => (
                    <>
                        {currentStep === 1 ? (
                            <LangCategory
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        ) : currentStep === 2 ? (
                            <Interests
                                formProps={
                                    props as unknown as FormikProps<
                                        BaseFormValues & { tagPreset?: string }
                                    >
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        ) : currentStep === 3 ? (
                            <Title
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        ) : currentStep === 4 ? (
                            <EventDateTime
                                formProps={props}
                                setCurrentStep={setCurrentStep}
                            />
                        ) : currentStep === 5 ? (
                            <Location
                                formProps={
                                    props as unknown as FormikProps<
                                        EventFormValues | BusinessFormValues
                                    >
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        ) : currentStep === 6 ? (
                            <DescriptionSocials
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        ) : currentStep === 7 ? (
                            <ImagesUpload
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        ) : (
                            <Submit
                                formProps={
                                    props as unknown as FormikProps<
                                        EventFormValues | BusinessFormValues
                                    >
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        )}
                    </>
                )}
            </ReusableForm>
        );
    }

    const IndividualBusinessTitleSetter = () => {
        const { values, setFieldValue } =
            useFormikContext<BusinessFormValues>();
        const currentUser = useUserStore(s => s.currentUser);
        const isIndividual = values.userType === "individual";

        useEffect(() => {
            if (
                isIndividual &&
                currentUser &&
                values.title !== currentUser.name
            ) {
                setFieldValue("title", currentUser.name);
            } else if (
                !isIndividual &&
                currentUser &&
                values.title === currentUser.name
            ) {
                setFieldValue("title", "");
            }
        }, [isIndividual, currentUser, values.title, setFieldValue]);

        return null;
    };

    const UserTypeNotifier = ({
        userType,
        onUserTypeChange,
    }: {
        userType: "business" | "individual" | undefined;
        onUserTypeChange?: (userType: "business" | "individual" | null) => void;
    }) => {
        useEffect(() => {
            if (onUserTypeChange) {
                onUserTypeChange(userType || null);
            }
        }, [userType, onUserTypeChange]);

        return null;
    };

    return (
        <ReusableForm<BusinessFormValues>
            initialValues={businessInitialValues}
            validationSchema={createBusinessValidationSchema()}
            onSubmit={submitForm}
            enableReinitialize
        >
            {props => {
                const isIndividual = props.values.userType === "individual";

                const getBusinessStep = () => {
                    if (currentStep === 1 && isIndividual) {
                        return (
                            <LangCategory
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    }
                    if (currentStep === 1) {
                        return (
                            <BussinessType
                                formProps={props}
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 2) {
                        return (
                            <LangCategory
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 3) {
                        return (
                            <Interests
                                formProps={
                                    props as unknown as FormikProps<
                                        BaseFormValues & { tagPreset?: string }
                                    >
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 4) {
                        if (isIndividual) {
                            return (
                                <WorkingHours
                                    formProps={props}
                                    setCurrentStep={setCurrentStep}
                                />
                            );
                        }
                        return (
                            <Title
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 5) {
                        if (isIndividual) {
                            return (
                                <Location
                                    formProps={
                                        props as unknown as FormikProps<
                                            EventFormValues | BusinessFormValues
                                        >
                                    }
                                    setCurrentStep={setCurrentStep}
                                />
                            );
                        }
                        return (
                            <WorkingHours
                                formProps={props}
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 6) {
                        if (isIndividual) {
                            return (
                                <DescriptionSocials
                                    formProps={
                                        props as unknown as FormikProps<BaseFormValues>
                                    }
                                    setCurrentStep={setCurrentStep}
                                />
                            );
                        }
                        return (
                            <Location
                                formProps={
                                    props as unknown as FormikProps<
                                        EventFormValues | BusinessFormValues
                                    >
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 7) {
                        if (isIndividual) {
                            return (
                                <ImagesUpload
                                    formProps={
                                        props as unknown as FormikProps<BaseFormValues>
                                    }
                                    setCurrentStep={setCurrentStep}
                                />
                            );
                        }
                        return (
                            <DescriptionSocials
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 8) {
                        if (isIndividual) {
                            return (
                                <Submit
                                    formProps={
                                        props as unknown as FormikProps<
                                            EventFormValues | BusinessFormValues
                                        >
                                    }
                                    setCurrentStep={setCurrentStep}
                                />
                            );
                        }
                        return (
                            <ImagesUpload
                                formProps={
                                    props as unknown as FormikProps<BaseFormValues>
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else if (currentStep === 9) {
                        return (
                            <Submit
                                formProps={
                                    props as unknown as FormikProps<
                                        EventFormValues | BusinessFormValues
                                    >
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    } else {
                        if (editId && currentStep > 9) {
                            return <div>Загрузка...</div>;
                        }
                        return (
                            <Submit
                                formProps={
                                    props as unknown as FormikProps<
                                        EventFormValues | BusinessFormValues
                                    >
                                }
                                setCurrentStep={setCurrentStep}
                            />
                        );
                    }
                };

                return (
                    <>
                        <IndividualBusinessTitleSetter />
                        <UserTypeNotifier
                            userType={props.values.userType}
                            onUserTypeChange={onUserTypeChange}
                        />
                        {getBusinessStep()}
                    </>
                );
            }}
        </ReusableForm>
    );
};
