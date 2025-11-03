import * as yup from "yup";
import { BusinessFormValues } from "@/types/formValues";

export const createBusinessValidationSchema =
    (): yup.ObjectSchema<BusinessFormValues> => {
        return yup.object().shape({
            type: yup.string(),
            userType: yup
                .string<BusinessFormValues["userType"]>()
                .oneOf(["company", "individual"])
                .required("Это поле обязательно для заполнения."),
            category: yup
                .string()
                .required("Это поле обязательно для заполнения."),
            languages: yup
                .array()
                .of(yup.string())
                .min(1, "Выберите хотя бы один язык")
                .max(3, "Можно выбрать не более 3 языков")
                .required("Это поле обязательно для заполнения."),
            tags: yup.array().of(yup.string()),
            title: yup
                .string()
                .required("Это поле обязательно для заполнения."),
            workingHours: yup.array().of(
                yup.object().shape({
                    start: yup.string(),
                    end: yup.string(),
                })
            ),
            position: yup
                .mixed()
                .nullable()
                .test(
                    "required",
                    "Это поле обязательно для заполнения.",
                    value => {
                        return value !== null && value !== undefined;
                    }
                ),
            description: yup.string(),
            socialLinks: yup.array().of(yup.string()),
            siteLink: yup.string(),
            imageUrls: yup.array().of(yup.string()),
            services: yup.array().of(yup.string()),
        }) as yup.ObjectSchema<BusinessFormValues>;
    };
