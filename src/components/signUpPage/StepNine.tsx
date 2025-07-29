import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { FormikProps } from "formik";
import MainButton from "../shared/buttons/MainButton";
import SectionTitle from "../shared/titles/SectionTitle";
import { ValuesSignUpFormType } from "./SignUpForm";
import AnimatedCheckmark from "../shared/icons/AnimatedCheckmark";

interface StepNineProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export default function StepNine({ setCurrentStep }: StepNineProps) {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex flex-col items-center mt-[65px]">
        <AnimatedCheckmark />
        <SectionTitle className="mt-6 mb-3 text-center">
          Поздравляем!
        </SectionTitle>
        <p className="mb-6 text-center">
          Вы создали аккаунт, теперь вы можете смотреть какие наши люди есть на
          карте, а так же ивенты которые они организовывают или бизнесы
        </p>
      </div>

      <MainButton
        variant="primary"
        className="h-12"
        onClick={() => router.push("/main")}
      >
        Перейти на главную
      </MainButton>
    </div>
  );
}
