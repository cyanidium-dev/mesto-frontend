"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { SignInValidation } from "@/schemas/signInValidation";
import { useRouter } from "next/navigation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

export interface ValuesSignInFormType {
  email: string;
  code: string;
}

export default function SignInForm() {
  const [currentStep, setCurrentStep] = useState(1);

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
