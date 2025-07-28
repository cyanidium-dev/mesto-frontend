import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import CustomizedInput from "../shared/formComponents/CustomizedInput";
import { ValuesSignUpFormType } from "./SignUpForm";

interface StepTwoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignUpFormType>;
}

export default function StepTwo({ setCurrentStep, formProps }: StepTwoProps) {
  const { errors, touched, values } = formProps;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Супер, мы выслали код!</SectionTitle>
        <p className="mb-6">
          Пожалуйста введите код который мы отправили на mesto@gmail.com в
          течении 10 минут.
        </p>
        <CustomizedInput
          fieldName="code"
          inputType="number"
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

      <MainButton
        variant="primary"
        className="h-12"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        disabled={!values.code || !!errors.code}
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
