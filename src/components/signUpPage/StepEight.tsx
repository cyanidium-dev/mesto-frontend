import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import { ValuesSignUpFormType } from "./SignUpForm";
import ImageUploadInput from "../shared/formComponents/ImageUploadInput";

interface StepEightProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignUpFormType>;
}

export default function StepEight({
  setCurrentStep,
  formProps,
}: StepEightProps) {
  const { errors, values } = formProps;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Добавьте фото</SectionTitle>
        <p className="mb-6">
          Фото будет отображаться в вашем профиле и у людей будет больше доверия
          к вашему профилю
        </p>
        <ImageUploadInput fieldName="photo" />
      </div>

      <MainButton
        variant="primary"
        className="h-12"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        disabled={!values.photo || !!errors.photo}
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
