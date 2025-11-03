"use client";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { useState } from "react";
import ProgressBar from "@/components/shared/progress/ProgressBar";
import { CreateForm } from "@/components/createPage/CreateForm";

export default function CreatePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
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
                            className={`${
                                currentStep === 1 ||
                                currentStep === 8 ||
                                currentStep === 9
                                    ? "hidden"
                                    : ""
                            }`}
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
            />
        </Container>
    );
}
