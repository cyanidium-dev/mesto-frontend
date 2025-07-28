"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationButton from "../shared/buttons/NavigationButton";
import Container from "../shared/container/Container";
import ProgressBar from "../shared/progress/ProgressBar";
import SignUpForm from "./SignUpForm";
import ArrowIcon from "../shared/icons/ArrowIcon";

export default function SignUp() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Container className="min-h-screen pt-2 pb-14">
      <div className="flex justify-between items-center mb-2">
        <NavigationButton
          onClick={
            currentStep === 1
              ? () => router.back()
              : () => setCurrentStep((prev) => prev - 1)
          }
        >
          <ArrowIcon />
          Назад
        </NavigationButton>
        <NavigationButton
          onClick={() => setCurrentStep((prev) => prev + 1)}
          className={`${
            currentStep === 1 || currentStep === 2 || currentStep === 10
              ? "hidden"
              : ""
          }`}
        >
          Пропустить
          <ArrowIcon className="rotate-180" />
        </NavigationButton>
      </div>
      <ProgressBar stepsQty={10} currentStep={currentStep} className="mb-6" />
      <SignUpForm />
    </Container>
  );
}
