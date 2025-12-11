"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import ProgressBar from "@/components/shared/progress/ProgressBar";
import { CreateForm } from "@/components/createPage/CreateForm";

function CreatePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const stepParam = searchParams.get("step");
    const editId = searchParams.get("edit");
    const userTypeParam = searchParams.get("userType");
    const initialStep = stepParam ? parseInt(stepParam, 10) : 0;
    const [currentStep, setCurrentStep] = useState(editId ? 0 : initialStep);
    const [createType, setCreateType] = useState<"event" | "business" | null>(
        null
    );
    const [userType, setUserType] = useState<"business" | "individual" | null>(
        null
    );

    useEffect(() => {
        if (stepParam) {
            const step = parseInt(stepParam, 10);
            if (!isNaN(step) && step >= 0) {
                setCurrentStep(step);
            }
        }
    }, [stepParam]);
    const getStepsWithRequiredFields = (
        type: "event" | "business" | null,
        isIndividual: boolean | null
    ): number[] => {
        if (type === "event") {
            // Event: Step 1 (LangCategory), Step 2 (Interests - component requires tags), Step 3 (Title), Step 4 (EventDateTime), Step 5 (Location)
            return [1, 2, 3, 4, 5];
        } else if (type === "business") {
            if (isIndividual) {
                // Individual business: Step 1 (LangCategory), Step 2 (Interests - tags required), Step 4 (Location), Step 5 (DescriptionSocials - description required)
                return [1, 2, 4, 5];
            } else {
                // Regular business: Step 1 (BussinessType), Step 2 (LangCategory), Step 3 (Interests - tags required), Step 4 (Title), Step 6 (Location), Step 7 (DescriptionSocials - description required)
                return [1, 2, 3, 4, 6, 7];
            }
        }
        return [];
    };

    const isIndividual = userType === "individual";
    const stepsWithRequiredFields = getStepsWithRequiredFields(createType, isIndividual);
    const shouldHideSkip =
        stepsWithRequiredFields.includes(currentStep) ||
        currentStep === 0 ||
        currentStep === 8 ||
        currentStep === 9;

    const getTotalSteps = () => {
        if (createType === "event") return 9;
        if (createType === "business") return 10;
        return 9;
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="sticky top-0 z-50 bg-white">
                <Container className="pt-2 pb-2">
                    <div className="flex justify-between items-center mb-2">
                        <NavigationButton
                            onClick={() => {
                                if (
                                    currentStep === 0 ||
                                    currentStep === 1 ||
                                    (currentStep === 2 &&
                                        userTypeParam === "individual")
                                ) {
                                    router.back();
                                } else {
                                    setCurrentStep(prev => prev - 1);
                                }
                            }}
                        >
                            <ArrowIcon />
                            Назад
                        </NavigationButton>
                        <NavigationButton
                            onClick={() => setCurrentStep(prev => prev + 1)}
                            className={shouldHideSkip ? "hidden" : ""}
                        >
                            Пропустить
                            <ArrowIcon className="rotate-180" />
                        </NavigationButton>
                    </div>
                    <ProgressBar
                        stepsQty={getTotalSteps()}
                        currentStep={currentStep + 1}
                        className="mb-2"
                    />
                </Container>
            </div>
            <div className="flex-1 overflow-y-auto h-full">
                <Container className="pt-4 pb-14 h-full">
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreateForm
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            onCreateTypeChange={setCreateType}
                            onUserTypeChange={setUserType}
                        />
                    </Suspense>
                </Container>
            </div>
        </div>
    );
}

export default function CreatePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreatePageContent />
        </Suspense>
    );
}
