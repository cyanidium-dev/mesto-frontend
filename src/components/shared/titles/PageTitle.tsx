interface PageTitleProps {
  children: string;
  className?: string;
}

export default function PageTitle({
  children,
  className = "",
}: PageTitleProps) {
  return (
    <h1 className={`text-[16px] font-bold leading-[120%] ${className}`}>
      {children}
    </h1>
  );
}
