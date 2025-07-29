import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import { ValuesSignUpFormType } from "./SignUpForm";
import ImageRadioButtonInput from "../shared/formComponents/ImageRadioButtonInput";

interface StepSixProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignUpFormType>;
}

const genders = [
  { label: "Девушка", value: "female", emoji: "/images/icons/girl.png" },
  { label: "Мужчина", value: "male", emoji: "/images/icons/man.png" },
];

export default function StepSix({ setCurrentStep, formProps }: StepSixProps) {
  const { values } = formProps;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Какого вы пола?</SectionTitle>
        <p className="mb-6">Ваш пол будет отображаться у вас в профиле</p>

        <div role="group" aria-labelledby="gender-selection" className="mb-8">
          <ImageRadioButtonInput fieldName="gender" options={genders} />
        </div>
      </div>

      <MainButton
        variant="primary"
        className="h-12"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        disabled={!values.gender}
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
