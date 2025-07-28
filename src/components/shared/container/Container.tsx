import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`px-4 max-w-[440px] mx-auto ${className}`}> {children}</div>
  );
}
