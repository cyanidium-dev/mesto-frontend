import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import CustomizedInput from "../shared/formComponents/CustomizedInput";
import { ValuesSignUpFormType } from "./SignUpForm";

interface StepThreeProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignUpFormType>;
}

export default function StepThree({
  setCurrentStep,
  formProps,
}: StepThreeProps) {
  const { errors, touched, values } = formProps;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Как вас зовут?</SectionTitle>
        <p className="mb-6">Укажите свое имя</p>
        <CustomizedInput
          fieldName="name"
          placeholder={"Введите ваше имя"}
          errors={errors}
          touched={touched}
          labelClassName="mb-6"
        />
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
