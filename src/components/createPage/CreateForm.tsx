import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
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
}

export const CreateForm = ({
    currentStep,
    setCurrentStep,
    onCreateTypeChange,
}: CreateFormProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const urlType = searchParams.get("type");

    const getBusiness = useBusinessStore(s => s.getBusiness);
    const getEvent = useEventsStore(s => s.getEvent);

    const [createType, setCreateType] = useState<"event" | "business" | null>(
        urlType === "event" || urlType === "business" ? urlType : null
    );

    // Load item for editing
    const editItem = useMemo(() => {
        if (!editId) return null;
        if (urlType === "event") {
            return getEvent(editId);
        } else if (urlType === "business") {
            return getBusiness(editId);
        }
        return null;
    }, [editId, urlType, getEvent, getBusiness]);

    // Convert Event to EventFormValues
    const convertEventToFormValues = (event: Event): EventFormValues => {
        return {
            type: "",
            category: event.category,
            languages: event.languages,
            tags: event.tags || [],
            title: event.title,
            startDate:
                event.startDate instanceof Date
                    ? event.startDate.toISOString().split("T")[0]
                    : new Date(event.startDate).toISOString().split("T")[0],
            startTime: event.startTime,
            hasEndDate: !!event.endDate,
            endDate: event.endDate
                ? event.endDate instanceof Date
                    ? event.endDate.toISOString().split("T")[0]
                    : new Date(event.endDate).toISOString().split("T")[0]
                : "",
            hasEndTime: !!event.endTime,
            endTime: event.endTime || "",
            position: event.location,
            description: event.description || "",
            socialMediaUrls: event.socialMediaUrls || [],
            siteLink: event.siteLink || "",
            imageUrls: event.imageUrls || [],
        };
    };

    // Convert Business to BusinessFormValues
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

    const handleCreateTypeChange = (type: "event" | "business" | null) => {
        setCreateType(type);
        onCreateTypeChange?.(type);
    };

    const submitForm = () => {
        router.push("/main");
    };

    const eventInitialValues: EventFormValues =
        editItem && "startDate" in editItem
            ? convertEventToFormValues(editItem as Event)
            : {
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

    const businessInitialValues: BusinessFormValues =
        editItem && !("startDate" in editItem)
            ? convertBusinessToFormValues(editItem as Business)
            : {
                  type: "",
                  userType: "business",
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

    // If editing, skip StepZero and go directly to the form
    useEffect(() => {
        if (editId && urlType && !createType) {
            handleCreateTypeChange(urlType as "event" | "business");
            setCurrentStep(1);
        }
    }, [editId, urlType, createType, handleCreateTypeChange, setCurrentStep]);

    if (currentStep === 0 || (!createType && !editId)) {
        return (
            <StepZero
                setCreateType={(type: "event" | "business") => {
                    handleCreateTypeChange(type);
                    setCurrentStep(1);
                }}
            />
        );
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
                        <FormValuesLogger step={currentStep} formType="event" />
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

    // Helper component to log form values on step change
    const FormValuesLogger = ({
        step,
        formType,
    }: {
        step: number;
        formType: "event" | "business";
    }) => {
        const { values } = useFormikContext<
            EventFormValues | BusinessFormValues
        >();

        useEffect(() => {
            console.log(`[Step ${step}] Form Values (${formType}):`, JSON.parse(JSON.stringify(values)));
        }, [step, formType]); // Only log when step or formType changes, not on every value change

        return null;
    };

    // Helper component to auto-set title for individual businesses
    const IndividualBusinessTitleSetter = () => {
        const { values, setFieldValue } =
            useFormikContext<BusinessFormValues>();
        const currentUser = useUserStore(s => s.currentUser);
        const isIndividual = values.userType === "individual";

        useEffect(() => {
            if (isIndividual && currentUser) {
                // Set title to user's name when userType is "individual"
                if (values.title !== currentUser.name) {
                    setFieldValue("title", currentUser.name);
                }
            } else if (
                !isIndividual &&
                currentUser &&
                values.title === currentUser.name
            ) {
                // Clear title if switching back to business type and title is still user's name
                setFieldValue("title", "");
            }
        }, [isIndividual, currentUser, values.title, setFieldValue]);

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

                // Skip Title step (step 4) for individual users
                const getBusinessStep = () => {
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
                        // Skip Title step for individual, go to WorkingHours
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
                        // For individual: Location, for business: WorkingHours
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
                        // For individual: DescriptionSocials, for business: Location
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
                        // For individual: ImagesUpload, for business: DescriptionSocials
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
                        // For individual: Submit, for business: ImagesUpload
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
                    } else {
                        // Step 9: Submit (only for business)
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
                        <FormValuesLogger step={currentStep} formType="business" />
                        <IndividualBusinessTitleSetter />
                        {getBusinessStep()}
                    </>
                );
            }}
        </ReusableForm>
    );
};
