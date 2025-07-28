"use client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { SignInValidation } from "@/schemas/signInValidation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

interface SignInFormProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export interface ValuesSignInFormType {
  email: string;
  code: string;
}

export default function SignInForm({
  currentStep,
  setCurrentStep,
}: SignInFormProps) {
  const router = useRouter();

  const initialValues = {
    email: "",
    code: "",
  };

  const validationSchema = SignInValidation();

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
          <Form className="">
            {currentStep === 1 ? (
              <StepOne formProps={props} setCurrentStep={setCurrentStep} />
            ) : (
              <StepTwo formProps={props} setCurrentStep={setCurrentStep} />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
