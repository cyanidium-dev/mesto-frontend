import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";
import { StepZero } from "./steps/StepZero";
import { LangCategory } from "./steps/LangCategory";
import { Interests } from "./steps/Interests";
import { Title } from "./steps/Title";
import { EvetDateTime } from "./steps/EvetDateTime";
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
}

export const CreateForm = ({
    currentStep,
    setCurrentStep,
}: CreateFormProps) => {
    const router = useRouter();
    const [createType, setCreateType] = useState<"event" | "business" | null>(
        null
    );

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
        endTime: "",
        position: null,
        description: "",
        socialLinks: [],
        siteLink: "",
        imageUrls: [],
    };

    const businessInitialValues: BusinessFormValues = {
        type: "",
        userType: "company",
        category: "",
        languages: [],
        tags: [],
        title: "",
        workingHours: [],
        position: null,
        description: "",
        socialLinks: [],
        siteLink: "",
        imageUrls: [],
        services: [],
    };

    if (currentStep === 0 || !createType) {
        return (
            <StepZero
                setCreateType={(type: "event" | "business") => {
                    setCreateType(type);
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
                            <EvetDateTime
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
            {props => (
                <>
                    {currentStep === 1 ? (
                        <BussinessType
                            formProps={props}
                            setCurrentStep={setCurrentStep}
                        />
                    ) : currentStep === 2 ? (
                        <LangCategory
                            formProps={
                                props as unknown as FormikProps<BaseFormValues>
                            }
                            setCurrentStep={setCurrentStep}
                        />
                    ) : currentStep === 3 ? (
                        <Interests
                            formProps={
                                props as unknown as FormikProps<
                                    BaseFormValues & { tagPreset?: string }
                                >
                            }
                            setCurrentStep={setCurrentStep}
                        />
                    ) : currentStep === 4 ? (
                        <Title
                            formProps={
                                props as unknown as FormikProps<BaseFormValues>
                            }
                            setCurrentStep={setCurrentStep}
                        />
                    ) : currentStep === 5 ? (
                        <WorkingHours
                            formProps={props}
                            setCurrentStep={setCurrentStep}
                        />
                    ) : currentStep === 6 ? (
                        <Location
                            formProps={
                                props as unknown as FormikProps<
                                    EventFormValues | BusinessFormValues
                                >
                            }
                            setCurrentStep={setCurrentStep}
                        />
                    ) : currentStep === 7 ? (
                        <DescriptionSocials
                            formProps={
                                props as unknown as FormikProps<BaseFormValues>
                            }
                            setCurrentStep={setCurrentStep}
                        />
                    ) : currentStep === 8 ? (
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
};
