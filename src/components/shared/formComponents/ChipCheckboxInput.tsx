"use client";

import { useFormikContext } from "formik";
import { useId } from "react";
import clsx from "clsx";

interface Values {
  [fieldName: string]: string[];
}

interface ChipCheckboxInputProps {
  fieldName: string;
  label: string;
  value: string;
}

export default function ChipCheckboxInput({
  fieldName,
  label,
  value,
}: ChipCheckboxInputProps) {
  const { values } = useFormikContext<Values>();
  const inputId = useId();

  const selected = Array.isArray(values[fieldName])
    ? values[fieldName].includes(value)
    : false;

  return (
    <div
      id={inputId}
      className={clsx(
        "inline-flex items-center justify-center px-2.5 py-1 rounded-full border text-[12px] cursor-pointer transition duration-300 ease-in-out",
        selected
          ? "bg-primary text-white border-primary"
          : "bg-transparent text-gray-dark border-gray-light"
      )}
    >
      {label}
    </div>
  );
}
