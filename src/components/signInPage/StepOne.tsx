"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import Image from "next/image";
import ArrowIcon from "../shared/icons/ArrowIcon";
import BackButton from "../shared/buttons/NavigationButton";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import CustomizedInput from "../shared/formComponents/CustomizedInput";
import { ValuesSignInFormType } from "./SignInForm";

interface StepOneProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignInFormType>;
}

export default function StepOne({ setCurrentStep, formProps }: StepOneProps) {
  const router = useRouter();

  const { errors, touched } = formProps;

  const onClickBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col justify-between min-h-screen pt-2 pb-14">
      <div>
        <BackButton onClick={onClickBack} className="mb-2">
          <ArrowIcon />
          Назад
        </BackButton>
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
            <Image
              src="/images/icons/google.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            &nbsp; Войти через Google
          </MainButton>
          <MainButton variant="bordered" className="h-10">
            <Image
              src="/images/icons/facebook.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            &nbsp; Войти через Facebook
          </MainButton>
        </div>
      </div>
      <MainButton
        onClick={() => setCurrentStep((prev) => prev + 1)}
        variant="primary"
        className="h-12"
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
