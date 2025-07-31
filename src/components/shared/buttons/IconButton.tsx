import { ReactNode } from "react";

interface IconButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function IconButton({
  onClick,
  children,
  className = "",
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label="icon button"
      onClick={onClick}
      className={`cursor-pointer outline-none flex items-center justify-center size-8 rounded-full bg-gray-ultra-light
        active:brightness-125 active:scale-95 transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
