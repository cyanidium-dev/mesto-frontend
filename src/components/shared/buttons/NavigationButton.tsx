import { ReactNode } from "react";

interface NavigationButtonProps {
  children: string | ReactNode;
  className?: string;
  onClick: () => void;
}

export default function NavigationButton({
  children,
  onClick,
  className = "",
}: NavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center text-[16px] font-normal leading-[130%] text-primary active:brightness-150 
    focus-visible:brightness-125 transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
