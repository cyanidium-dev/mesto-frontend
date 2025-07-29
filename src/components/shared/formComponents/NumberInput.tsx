"use client";

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";

import { useId } from "react";

interface Values {
  [fieldName: string]: string;
}

interface NumberInputProps {
  fieldName: string;
  placeholder: string;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  label?: string;
  isRequired?: boolean;
  as?: string;
  labelClassName?: string;
  fieldClassName?: string;
  mask?: string | RegExp | (string | RegExp)[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  inputType?: string;
  fieldFontSize?: string;
  showIcon?: boolean;
}

const labelStyles = "relative flex flex-col";
const fieldStyles =
  "relative w-full px-4 h-[37px] text-[16px] font-normal leading-none text-dark bg-white placeholder-transparent border-b border-gray-light outline-none resize-none transition duration-300 ease-out";
const errorStyles =
  "absolute bottom-[-21px] left-2 text-[9px] font-normal leading-none text-red-500";

export default function NumberInput({
  fieldName,
  placeholder,
  errors,
  touched,
  isRequired = false,
  as,
  labelClassName = "",
  fieldClassName = "",
  fieldFontSize = "",
  mask = "",
  onChange,
  onFocus,
  inputType = "number",
}: NumberInputProps) {
  const { handleChange, values } = useFormikContext<Values>();
  const isError = (errors as Record<string, unknown>)[fieldName];
  const isTouched = (touched as Record<string, unknown>)[fieldName];
  const fieldValue = values[fieldName];
  const showPlaceholder = !fieldValue;
  const inputId = useId();

  return (
    <label htmlFor={inputId} className={`${labelStyles} ${labelClassName}`}>
      <div className="relative w-full">
        <Field
          id={inputId}
          as={as}
          mask={mask}
          name={fieldName}
          type={inputType}
          autoComplete="on"
          onChange={onChange || handleChange}
          onFocus={onFocus}
          className={`${fieldStyles} ${fieldClassName} ${fieldFontSize} ${
            isError && isTouched ? "border-red" : "border-gray-light"
          }`}
        />

        <span
          className={`pointer-events-none absolute left-4 ${
            as === "textarea" ? "top-3" : "top-1/2 -translate-y-1/2"
          } text-placeholder text-[16px] whitespace-nowrap`}
        >
          {showPlaceholder && (
            <>
              <span>
                {isRequired && <span className="text-red mr-1"> *</span>}
              </span>
              <span className="text-placeholder">{placeholder}</span>
            </>
          )}
        </span>
      </div>

      <ErrorMessage name={fieldName} component="p" className={errorStyles} />
    </label>
  );
}
