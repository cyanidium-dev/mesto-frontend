import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import CustomizedInput from "../shared/formComponents/CustomizedInput";
import { ValuesSignUpFormType } from "./SignUpForm";
import NumberInput from "../shared/formComponents/NumberInput";

interface StepFourProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formProps: FormikProps<ValuesSignUpFormType>;
}

export default function StepFour({ setCurrentStep, formProps }: StepFourProps) {
  const { errors, touched, values } = formProps;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <SectionTitle className="mb-6">Ваш день рождения?</SectionTitle>
        <p className="mb-6">
          В вашем профиле будет отображаться возраст, а не ваша дата рождения
        </p>
        <div className="flex gap-2 items-center">
          <NumberInput
            fieldName="birthDay"
            placeholder={"День"}
            errors={errors}
            touched={touched}
            labelClassName="w-[calc(33.33%-5.33px)]"
          />
          <NumberInput
            fieldName="birthMonth"
            placeholder={"Месяц"}
            errors={errors}
            touched={touched}
            labelClassName="w-[calc(33.33%-5.33px)]"
          />
          <NumberInput
            fieldName="birthYear"
            placeholder={"Год"}
            errors={errors}
            touched={touched}
            labelClassName="w-[calc(33.33%-5.33px)]"
          />
        </div>
      </div>

      <MainButton
        variant="primary"
        className="h-12"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        disabled={
          !values.birthDay ||
          !!errors.birthDay ||
          !values.birthMonth ||
          !!errors.birthMonth ||
          !values.birthYear ||
          !!errors.birthYear
        }
      >
        Подтвердить
      </MainButton>
    </div>
  );
}
