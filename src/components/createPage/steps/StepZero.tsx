"use client";
import { Formik, Form, FormikProps } from "formik";
import * as yup from "yup";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import ImageRadioButtonInput from "../../shared/formComponents/ImageRadioButtonInput";

interface StepZeroProps {
    setCreateType: (type: "event" | "business") => void;
}

interface StepZeroFormValues {
    createType: "event" | "business" | "";
}

const validationSchema = yup.object({
    createType: yup
        .string()
        .oneOf(["event", "business"], "Выберите тип")
        .required("Выберите тип"),
});

const createTypeOptions = [
    {
        label: "Бизнес-точку",
        value: "business",
        emoji: "/images/icons/classical-building.png",
    },
    {
        label: "Событие",
        value: "event",
        emoji: "/images/icons/admission-ticket.png",
    },
];

const getDescription = (selectedValue: "event" | "business" | ""): string => {
    switch (selectedValue) {
        case "event":
            return "Событие - это одноразовое собрание, если повторяется, тогда создавай бизнес-точку";
        case "business":
            return "Бизнес-точка - это повторяющееся событие или постоянная точка";
        default:
            return "";
    }
};

export const StepZero = ({ setCreateType }: StepZeroProps) => {
    const initialValues: StepZeroFormValues = {
        createType: "",
    };

    const handleSubmit = (values: StepZeroFormValues) => {
        if (values.createType === "event" || values.createType === "business") {
            setCreateType(values.createType);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(formProps: FormikProps<StepZeroFormValues>) => (
                <Form className="flex flex-col flex-1 justify-between h-full">
                    <div>
                        <SectionTitle className="mb-6">Создать</SectionTitle>
                        <p className="mb-6 text-[14px] text-gray-text">
                            Выберите что вы хотите выставить на карте:
                        </p>
                        <div className="mb-3">
                            <ImageRadioButtonInput
                                fieldName="createType"
                                options={createTypeOptions}
                            />
                        </div>
                        {formProps.values.createType && (
                            <p className="text-[14px] text-gray-text">
                                {getDescription(formProps.values.createType)}
                            </p>
                        )}
                    </div>
                    <MainButton
                        type="submit"
                        variant="primary"
                        className="h-12"
                        disabled={!formProps.values.createType}
                    >
                        Подтвердить
                    </MainButton>
                </Form>
            )}
        </Formik>
    );
};
