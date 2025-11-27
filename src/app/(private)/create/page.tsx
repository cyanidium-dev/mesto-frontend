"use client";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import ProgressBar from "@/components/shared/progress/ProgressBar";
import { CreateForm } from "@/components/createPage/CreateForm";

export default function CreatePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [createType, setCreateType] = useState<"event" | "business" | null>(
        null
    );

    // Determine which steps have required fields (skip button should be hidden)
    const getStepsWithRequiredFields = (
        type: "event" | "business" | null
    ): number[] => {
        if (type === "event") {
            // Event: step 1 (LangCategory), step 3 (Title), step 4 (EventDateTime), step 5 (Location)
            return [1, 3, 4, 5];
        } else if (type === "business") {
            // Business: step 1 (BussinessType), step 2 (LangCategory), step 6 (Location)
            return [1, 2, 6];
        }
        return [];
    };

    const stepsWithRequiredFields = getStepsWithRequiredFields(createType);
    const shouldHideSkip =
        stepsWithRequiredFields.includes(currentStep) ||
        currentStep === 0 || // StepZero
        currentStep === 8 || // Submit step (events)
        currentStep === 9; // Submit step (business)

    // Calculate total steps: step 0 + event steps (1-8) = 9, or step 0 + business steps (1-9) = 10
    const getTotalSteps = () => {
        if (createType === "event") return 9; // step 0 + 8 steps
        if (createType === "business") return 10; // step 0 + 9 steps
        return 9; // default to event steps when type is not yet selected
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="sticky top-0 z-50 bg-white">
                <Container className="pt-2 pb-2">
                    <div className="flex justify-between items-center mb-2">
                        <NavigationButton
                            onClick={
                                currentStep === 0 || currentStep === 1
                                    ? () => router.back()
                                    : () => setCurrentStep(prev => prev - 1)
                            }
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
                        />
                    </Suspense>
                </Container>
            </div>
        </div>
    );
}
