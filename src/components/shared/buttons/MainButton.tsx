import { Dispatch, ReactNode, SetStateAction } from "react";
import LoaderIcon from "../icons/LoaderIcon";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface MainButtonProps {
  children: string | ReactNode;
  variant?: "primary" | "secondary" | "bordered" | "red" | "text";
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void | Dispatch<SetStateAction<boolean>>;
}

export default function MainButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  isLoading = false,
  onClick,
}: MainButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        clsx(
          `relative enabled:cursor-pointer flex items-center justify-center px-2 rounded-full ${
            variant === "primary"
              ? "bg-primary text-white"
              : variant === "secondary"
              ? "bg-blue-light text-primary"
              : variant === "bordered"
              ? "border-2 border-blue text-blue"
              : variant === "red"
              ? "bg-red text-white"
              : "text-primary bg-transparent"
          } 
         enabled:focus-visible:brightness-125 enabled:active:brightness-125
        disabled:opacity-30 transition duration-300 ease-in-out`,
          "w-full",
          "text-[16px] font-normal leading-[120%]",
          className
        )
      )}
    >
      {children}
      {isLoading ? <LoaderIcon /> : null}
    </button>
  );
}
