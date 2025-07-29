import { ErrorMessage, useFormikContext } from "formik";
import Image from "next/image";
import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";

interface Option {
  value: string;
  label: string;
}

interface Values {
  [fieldName: string]: string;
}

interface SelectProps {
  fieldName: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: Option[];
  labelClassName?: string;
  wrapperClassName?: string;
  fieldClassName?: string;
}

const labelStyles = "relative flex flex-col gap-y-1 w-full";
const fieldStyles =
  "relative w-full h-full px-3 py-[14px] text-[16px] placeholder-dark border rounded-full outline-none transition duration-300 ease-out cursor-pointer";
const fieldWrapperStyles =
  "relative before:content-[''] before:absolute before:top-0 before:left-0 before:rounded-full before:w-full before:h-full before:blur-[3px] before:transition before:duration-300 before:ease-out before:will-change-transform";
const errorStyles = "absolute bottom-[-11px] right-0 text-[9px] text-red";

export default function SelectInput({
  fieldName,
  label,
  required = false,
  placeholder = "",
  options,
  labelClassName = "",
  wrapperClassName = "",
  fieldClassName = "",
}: SelectProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { setFieldValue, values, errors, touched } = useFormikContext<Values>();

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleOptionClick = (value: string) => {
    setFieldValue(fieldName, value);
  };

  return (
    <label
      tabIndex={0}
      onClick={toggleDropdown}
      onBlur={() => setIsDropDownOpen(false)}
      className={`${labelStyles} ${labelClassName}`}
    >
      <p>
        {label}
        {required && <span className="text-red"> *</span>}
      </p>
      <div
        className={`${fieldWrapperStyles} relative flex items-center bg-white ${wrapperClassName} ${
          errors[fieldName] && touched[fieldName]
            ? "before:bg-red"
            : "before:bg-transparent group-hover:before:bg-primary/20 focus-within:before:bg-primary/20"
        }`}
      >
        <div
          className={`${fieldStyles} ${fieldClassName} ${
            errors[fieldName] && touched[fieldName]
              ? "border-red"
              : "border-gray-light focus:border-primary"
          } `}
        >
          {values[fieldName] || placeholder}
          <ArrowIcon
            className={`absolute right-3 bottom-3 transition duration-300 ease-out ${
              isDropDownOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        <ul
          className={`${
            isDropDownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } absolute top-full left-0 w-full max-h-[420px] text-[16px] bg-white border border-gray-light rounded-[12px] z-20 mt-0.5 overflow-y-auto shadow-select
          transition duration-300 ease-out`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="relative group px-3 py-3 cursor-pointer text-dark active:text-primary active:bg-primary focus-visible:text-primary focus-visible:bg-primary 
              transition duration-300 ease-out"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
              <Image
                src="/images/icons/check.svg"
                alt="arrow icon"
                width="24"
                height="24"
                className={`absolute right-3 bottom-3 opacity-0 group-active:opacity-100 group-focus:opacity-100 laptop:group-hover:opacity-100 
                    transition duration-300 ease-out`}
              />
            </li>
          ))}
        </ul>
      </div>
      <ErrorMessage
        name={fieldName}
        component="p"
        className={errorStyles}
      ></ErrorMessage>
    </label>
  );
}
