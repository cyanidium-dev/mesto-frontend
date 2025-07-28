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
    <section className={`w-full px-4 max-w-[440px] mx-auto ${className}`}>
      {children}
    </section>
  );
}
