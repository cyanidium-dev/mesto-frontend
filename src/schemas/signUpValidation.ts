import * as yup from "yup";
import { emailRegex } from "./regex";

export const SignUpValidation = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const minYear = 1900;
  const maxYear = currentYear - 18;

  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, "Введите валидный email")
      .required("Это поле обязательно для заполнения."),

    code: yup.string().required("Это поле обязательно для заполнения."),

    name: yup.string(),

    birthDay: yup
      .number()
      .typeError("Введите день рождения")
      .min(1, "День должен быть от 1 до 31")
      .max(31, "День должен быть от 1 до 31"),

    birthMonth: yup
      .number()
      .typeError("Введите месяц рождения")
      .min(1, "Месяц должен быть от 1 до 12")
      .max(12, "Месяц должен быть от 1 до 12"),

    birthYear: yup
      .number()
      .typeError("Введите год рождения")
      .min(minYear, `Год должен быть не ранее ${minYear}`)
      .max(maxYear, `Вам должно быть не менее 18 лет`),

    city: yup.string(),

    interests: yup
      .array()
      .of(yup.string())
      .max(4, "Можно выбрать не более 4 интересов"),

    gender: yup.string(),

    photo: yup.string(),
  });

  return signUpValidationSchema;
};
