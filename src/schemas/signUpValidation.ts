import * as yup from "yup";
import { emailRegex } from "./regex";

export const SignUpValidation = () => {
  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, "Введите валидный email")
      .required("Это поле обязательно для заполнения."),
    code: yup.string().required("Это поле обязательно для заполнения."),
    name: yup.string(),
  });

  return signUpValidationSchema;
};
