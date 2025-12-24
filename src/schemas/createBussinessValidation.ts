import * as yup from "yup";
import { BusinessFormValues } from "@/types/formValues";

export const createBusinessValidationSchema =
    (): yup.ObjectSchema<BusinessFormValues> => {
        return yup.object().shape({
            type: yup.string(),
            userType: yup
                .string<BusinessFormValues["userType"]>()
                .oneOf(["business", "individual"])
                .required("Это поле обязательно для заполнения."),
            category: yup
                .string()
                .required("Это поле обязательно для заполнения."),
            subcategory: yup.string(),
            languages: yup
                .array()
                .of(yup.string())
                .min(1, "Выберите хотя бы один язык")
                .max(3, "Можно выбрать не более 3 языков")
                .required("Это поле обязательно для заполнения."),
            // Tags validation commented out - tags functionality unused
            // tags: yup
            //     .array()
            //     .of(yup.string())
            //     .min(1, "Выберите хотя бы один тег")
            //     .required("Это поле обязательно для заполнения."),
            tags: yup.array().of(yup.string()), // Commented out - tags functionality unused
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
            description: yup
                .string()
                .required("Это поле обязательно для заполнения."),
            socialMediaUrls: yup.array().of(yup.string()),
            siteLink: yup.string(),
            imageUrls: yup.array().of(yup.string()),
            services: yup.array().of(yup.string()),
        }) as yup.ObjectSchema<BusinessFormValues>;
    };
