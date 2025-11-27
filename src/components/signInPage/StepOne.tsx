"use client";

import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import Image from "next/image";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import CustomizedInput from "../shared/formComponents/CustomizedInput";
import { ValuesSignInFormType } from "./SignInForm";

interface StepOneProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignInFormType>;
}

export default function StepOne({ setCurrentStep, formProps }: StepOneProps) {
  const { errors, touched, values } = formProps;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Вход в аккаунт</SectionTitle>
        <CustomizedInput
          fieldName="email"
          inputType="email"
          placeholder={"Введите почту"}
          label={"Ваша почта"}
          isRequired
          errors={errors}
          touched={touched}
          labelClassName="mb-6"
        />
        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-normal leading-[120%] text-center">
            Или войти через:
          </p>
          <MainButton variant="bordered" className="h-10">
            <GoogleIcon />
            &nbsp; Войти через Google
          </MainButton>
          <MainButton variant="bordered" className="h-10">
            <FacebookIcon />
            &nbsp; Войти через Facebook
          </MainButton>
        </div>
      </div>
      <MainButton
        onClick={() => setCurrentStep((prev) => prev + 1)}
        variant="primary"
        className="h-12"
        disabled={!values.email || !!errors.email}
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
