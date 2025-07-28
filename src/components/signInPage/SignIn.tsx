"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../shared/container/Container";
import SignInForm from "./SignInForm";
import NavigationButton from "../shared/buttons/NavigationButton";
import ArrowIcon from "../shared/icons/ArrowIcon";

export default function SignIn() {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  return (
    <Container className="flex flex-col min-h-screen">
      <NavigationButton
        onClick={
          currentStep === 1
            ? () => router.back()
            : () => setCurrentStep((prev) => prev - 1)
        }
        className="mb-2"
      >
        <ArrowIcon />
        Назад
      </NavigationButton>
      <SignInForm setCurrentStep={setCurrentStep} currentStep={currentStep} />
    </Container>
  );
}
