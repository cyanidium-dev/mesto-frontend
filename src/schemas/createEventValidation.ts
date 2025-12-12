import * as yup from "yup";
import { EventFormValues } from "@/types/formValues";

export const createEventValidationSchema =
    (): yup.ObjectSchema<EventFormValues> => {
        return yup.object().shape({
            type: yup.string(),
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
            tags: yup.array().of(yup.string()),
            title: yup
                .string().max(70, "Не более 70 символов")
                .required("Это поле обязательно для заполнения."),
            startDate: yup
                .string()
                .required("Это поле обязательно для заполнения."),
            startTime: yup
                .string()
                .required("Это поле обязательно для заполнения."),
            hasEndDate: yup.boolean(),
            endDate: yup.string().when("hasEndDate", {
                is: true,
                then: schema =>
                    schema.required("Это поле обязательно для заполнения."),
                otherwise: schema => schema.notRequired(),
            }),
            hasEndTime: yup.boolean(),
            endTime: yup.string().when("hasEndTime", {
                is: true,
                then: schema =>
                    schema.required("Это поле обязательно для заполнения."),
                otherwise: schema => schema.notRequired(),
            }),
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
            description: yup.string().max(1500, "Не более 1500 символов"),
            socialMediaUrls: yup.array().of(yup.string()),
            siteLink: yup.string(),
            imageUrls: yup.array().of(yup.string()),
        }) as yup.ObjectSchema<EventFormValues>;
    };
