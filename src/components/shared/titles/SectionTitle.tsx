interface SectionTitleProps {
  children: string;
  className?: string;
}

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2 className={`text-[24px] font-bold leading-[120%] ${className}`}>
      {children}
    </h2>
  );
}
