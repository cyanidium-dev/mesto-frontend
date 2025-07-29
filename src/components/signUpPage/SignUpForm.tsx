"use client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { SignUpValidation } from "@/schemas/signUpValidation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import StepEight from "./StepEight";
import StepNine from "./StepNine";

interface SignUpFormProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export interface ValuesSignUpFormType {
  email: string;
  code: string;
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  city: string;
  gender: string;
}

export default function SignUpForm({
  currentStep,
  setCurrentStep,
}: SignUpFormProps) {
  const router = useRouter();

  const initialValues = {
    email: "",
    code: "",
    name: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    city: "",
    gender: "male",
  };

  const validationSchema = SignUpValidation();

  const submitForm = () => {
    router.push("/main");
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form className="flex flex-col flex-1 h-full">
            {currentStep === 1 ? (
              <StepOne formProps={props} setCurrentStep={setCurrentStep} />
            ) : currentStep === 2 ? (
              <StepTwo formProps={props} setCurrentStep={setCurrentStep} />
            ) : currentStep === 3 ? (
              <StepThree formProps={props} setCurrentStep={setCurrentStep} />
            ) : currentStep === 4 ? (
              <StepFour formProps={props} setCurrentStep={setCurrentStep} />
            ) : currentStep === 5 ? (
              <StepFive formProps={props} setCurrentStep={setCurrentStep} />
            ) : currentStep === 6 ? (
              <StepSix formProps={props} setCurrentStep={setCurrentStep} />
            ) : currentStep === 7 ? (
              <StepSeven formProps={props} setCurrentStep={setCurrentStep} />
            ) : currentStep === 8 ? (
              <StepEight formProps={props} setCurrentStep={setCurrentStep} />
            ) : (
              <StepNine setCurrentStep={setCurrentStep} />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
