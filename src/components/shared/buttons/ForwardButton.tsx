import { ReactNode } from "react";
import ArrowIcon from "../icons/ArrowIcon";

interface ForwardButtonProps {
  children: string | ReactNode;
  onClick: () => void;
  className?: string;
}

export default function ForwardButton({
  children,
  onClick,
  className = "",
}: ForwardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer flex items-center text-[16px] font-normal leading-[100%] text-primary active:brightness-125 
    focus-visible:brightness-125 transition duration-300 ease-in-out ${className}`}
    >
      Пропустить <ArrowIcon className="rotate-180" />
    </button>
  );
}
