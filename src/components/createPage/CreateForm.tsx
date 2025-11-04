import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";
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
import { FormikProps } from "formik";

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
    const [createType, setCreateType] = useState<"event" | "business" | null>(
        null
    );

    const handleCreateTypeChange = (type: "event" | "business" | null) => {
        setCreateType(type);
        onCreateTypeChange?.(type);
    };

    const submitForm = () => {
        router.push("/main");
    };

    const eventInitialValues: EventFormValues = {
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

    const businessInitialValues: BusinessFormValues = {
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

    if (currentStep === 0 || !createType) {
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
                        return <BussinessType formProps={props} setCurrentStep={setCurrentStep} />;
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

                return <>{getBusinessStep()}</>;
            }}
        </ReusableForm>
    );
};
