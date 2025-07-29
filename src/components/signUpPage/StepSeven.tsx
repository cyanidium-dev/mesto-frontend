import { Dispatch, SetStateAction } from "react";
import { FieldArray, FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import { ValuesSignUpFormType } from "./SignUpForm";
import ChipCheckboxInput from "../shared/formComponents/ChipCheckboxInput";

interface StepSevenProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignUpFormType>;
}

export default function StepSeven({
  setCurrentStep,
  formProps,
}: StepSevenProps) {
  const { values } = formProps;

  const MAX_SELECTION = 4;

  const options = [
    "СТО",
    "Тренера",
    "Красота",
    "Успех",
    "Сила",
    "Мудрость",
    "Дисциплина",
    "Сострадание",
    "Уверенность",
    "Творчество",
    "Стратегия",
    "Потенциал",
    "Надежда",
    "Смелость",
    "Решительность",
    "Инновации",
    "Вдохновение",
    "Согласие",
    "Доброта",
    "Устойчивость",
    "Энергия",
    "Целеустремленность",
    "Честность",
    "Справедливость",
    "Гармония",
  ];

  const selectedInterests = Array.isArray(values.interests)
    ? values.interests
    : [];

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Интересы</SectionTitle>
        <p className="mb-6">
          В каком направлении вы бы хотели найти людей? Выберите до 4 категорий
        </p>

        <FieldArray name="interests">
          {({ push, remove }) => (
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isSelected = selectedInterests.includes(option);

                const handleClick = () => {
                  if (isSelected) {
                    const indexToRemove = selectedInterests.indexOf(option);
                    remove(indexToRemove);
                  } else if (selectedInterests.length < MAX_SELECTION) {
                    push(option);
                  }
                };

                return (
                  <div
                    key={option}
                    onClick={handleClick}
                    className="select-none"
                  >
                    <ChipCheckboxInput
                      fieldName="interests"
                      label={option}
                      value={option}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </FieldArray>
      </div>

      <MainButton
        variant="primary"
        className="h-12"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        disabled={selectedInterests.length === 0}
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
