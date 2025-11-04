"use client";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { useState } from "react";
import ProgressBar from "@/components/shared/progress/ProgressBar";
import { CreateForm } from "@/components/CreatePage/CreateForm";

export default function CreatePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [createType, setCreateType] = useState<"event" | "business" | null>(null);

    // Determine which steps have required fields (skip button should be hidden)
    const getStepsWithRequiredFields = (type: "event" | "business" | null): number[] => {
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
    const shouldHideSkip = stepsWithRequiredFields.includes(currentStep) || 
                           currentStep === 8 || // Submit step (events)
                           currentStep === 9;    // Submit step (business)

    return (
        <Container className="flex flex-col min-h-screen pt-2 pb-14">
            {currentStep > 0 && (
                <>
                    <div className="flex justify-between items-center mb-2">
                        <NavigationButton
                            onClick={
                                currentStep === 1
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
                        stepsQty={currentStep <= 8 ? 8 : 9}
                        currentStep={currentStep}
                        className="mb-6"
                    />
                </>
            )}
            <CreateForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                onCreateTypeChange={setCreateType}
            />
        </Container>
    );
}
