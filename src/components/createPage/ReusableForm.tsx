import { Formik, Form, FormikProps } from "formik";
import { ReactNode } from "react";
import * as yup from "yup";

interface ReusableFormProps<T extends Record<string, unknown>> {
    initialValues: T;
    validationSchema: yup.ObjectSchema<T>;
    onSubmit: (values: T) => void | Promise<void>;
    children: (formProps: FormikProps<T>) => ReactNode;
    enableReinitialize?: boolean;
    className?: string;
}

export function ReusableForm<T extends Record<string, unknown>>({
    initialValues,
    validationSchema,
    onSubmit,
    children,
    enableReinitialize = false,
    className = "flex flex-col flex-1 h-full",
}: ReusableFormProps<T>) {
    return (
        <Formik<T>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={enableReinitialize}
        >
            {formProps => (
                <Form className={className}>{children(formProps)}</Form>
            )}
        </Formik>
    );
}
