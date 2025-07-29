import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import { ValuesSignUpFormType } from "./SignUpForm";
import SelectInput from "../shared/formComponents/SelectInput";

const selectOptions = [
  {
    value: "Мадрид",
    label: "Мадрид",
  },
  {
    value: "Барселона",
    label: "Барселона",
  },
  {
    value: "Валенсия",
    label: "Валенсия",
  },
  {
    value: "Севилья",
    label: "Севилья",
  },
  {
    value: "Сарагоса",
    label: "Сарагоса",
  },
  {
    value: "Малага",
    label: "Малага",
  },
  {
    value: "Мурсия",
    label: "Мурсия",
  },
  {
    value: "Пальма",
    label: "Пальма",
  },
  {
    value: "Бильбао",
    label: "Бильбао",
  },
  {
    value: "Аликанте",
    label: "Аликанте",
  },
];

interface StepThreeProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignUpFormType>;
}

export default function StepThree({
  setCurrentStep,
  formProps,
}: StepThreeProps) {
  const { errors, values } = formProps;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Где вы находитесь?</SectionTitle>
        <p className="mb-6">
          Эта информация будет отображаться у вас в профиле
        </p>
        <SelectInput
          fieldName="region"
          options={selectOptions}
          required={false}
          placeholder={"Введите ваш город"}
        />
      </div>

      <MainButton
        variant="primary"
        className="h-12"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        disabled={!values.city || !!errors.city}
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
