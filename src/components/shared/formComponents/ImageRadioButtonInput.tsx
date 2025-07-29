"use client";

import { Field, ErrorMessage, useFormikContext } from "formik";
import { useId } from "react";
import clsx from "clsx";
import Image from "next/image";

interface Values {
  [fieldName: string]: string | string[];
}

interface EmojiRadioOption {
  label: string;
  value: string;
  emoji: string;
}

interface EmojiRadioInputProps {
  fieldName: string;
  options: EmojiRadioOption[];
}

export default function ImageRadioButtonInput({
  fieldName,
  options,
}: EmojiRadioInputProps) {
  const { values, handleChange } = useFormikContext<Values>();
  const selectedValue = values[fieldName];
  const inputId = useId();

  return (
    <div className="w-full">
      <div className="flex gap-4 justify-center">
        {options.map((option, index) => (
          <label
            key={option.value}
            htmlFor={`${inputId}-${index}`}
            className={clsx(
              "flex flex-col items-center justify-center w-[calc(50%-4px)] aspect-square rounded-[16px] border transition duration-300 ease-in-out cursor-pointer",
              selectedValue === option.value
                ? "border-primary bg-white"
                : "bg-gray border-transparent"
            )}
          >
            <Field
              type="radio"
              name={fieldName}
              id={`${inputId}-${index}`}
              value={option.value}
              onChange={handleChange}
              className="sr-only"
            />
            <Image
              src={option.emoji}
              alt="gender icon"
              width={32}
              height={32}
            />
            <div className="text-[14px] mt-2">{option.label}</div>
          </label>
        ))}
      </div>

      <ErrorMessage
        name={fieldName}
        component="p"
        className="text-[12px] text-red-500 text-center mt-2"
      />
    </div>
  );
}
