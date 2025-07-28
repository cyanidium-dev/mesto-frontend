import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import CustomizedInput from "../shared/formComponents/CustomizedInput";
import { ValuesSignInFormType } from "./SignInForm";
import Link from "next/link";

interface StepTwoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignInFormType>;
}

export default function StepTwo({ setCurrentStep, formProps }: StepTwoProps) {
  const { errors, touched } = formProps;

  return (
    <div className="flex flex-col justify-between min-h-screen pt-2 pb-14">
      <div>
        <SectionTitle className="mb-6">Супер, мы выслали код!</SectionTitle>
        <p className="mb-6">
          Пожалуйста введите код который мы отправили на mesto@gmail.com в
          течении 10 минут.
        </p>
        <CustomizedInput
          fieldName="email"
          inputType="email"
          placeholder={"Введите код"}
          isRequired
          errors={errors}
          touched={touched}
          labelClassName="mb-6"
        />
        <p>
          Не получили код? <span className="text-primary">Отправить снова</span>
        </p>
      </div>
      <Link href="/main">
        <MainButton variant="primary" className="h-12">
          Подтвердить
        </MainButton>
      </Link>
    </div>
  );
}
