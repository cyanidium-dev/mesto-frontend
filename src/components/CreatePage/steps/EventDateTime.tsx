import { Dispatch, SetStateAction } from "react";
import { FormikProps } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import CustomizedInput from "../../shared/formComponents/CustomizedInput";
import { EventFormValues } from "@/types/formValues";

interface EventDateTimeProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<EventFormValues>;
}

export const EventDateTime = ({
    setCurrentStep,
    formProps,
}: EventDateTimeProps) => {
    const { errors, touched, values, setFieldValue } = formProps;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Дата и время</SectionTitle>
                <CustomizedInput
                    fieldName="startDate"
                    inputType="date"
                    placeholder="Дата начала"
                    label="Дата начала"
                    isRequired
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-6"
                />
                <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={(values.hasEndDate as boolean) || false}
                            onChange={e =>
                                setFieldValue("hasEndDate", e.target.checked)
                            }
                            className="w-4 h-4"
                        />
                        <span className="text-[14px]">
                            Указать дату окончания
                        </span>
                    </label>
                </div>
                {(values.hasEndDate as boolean) && (
                    <CustomizedInput
                        fieldName="endDate"
                        inputType="date"
                        placeholder="Дата окончания"
                        label="Дата окончания"
                        errors={errors}
                        touched={touched}
                        labelClassName="mb-6"
                    />
                )}
                <CustomizedInput
                    fieldName="startTime"
                    inputType="time"
                    placeholder="Время начала"
                    label="Время начала"
                    errors={errors}
                    touched={touched}
                    labelClassName="mb-6"
                />
                <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={(values.hasEndTime as boolean) || false}
                            onChange={e =>
                                setFieldValue("hasEndTime", e.target.checked)
                            }
                            className="w-4 h-4"
                        />
                        <span className="text-[14px]">
                            Указать время окончания
                        </span>
                    </label>
                </div>
                {(values.hasEndTime as boolean) && (
                    <CustomizedInput
                        fieldName="endTime"
                        inputType="time"
                        placeholder="Время окончания"
                        label="Время окончания"
                        errors={errors}
                        touched={touched}
                    />
                )}
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
                disabled={
                    !values.startDate ||
                    !!errors.startDate ||
                    ((values.hasEndDate as boolean) &&
                        (!values.endDate || !!errors.endDate)) ||
                    ((values.hasEndTime as boolean) &&
                        (!values.endTime || !!errors.endTime))
                }
            >
                Продолжить
            </MainButton>
        </div>
    );
};
