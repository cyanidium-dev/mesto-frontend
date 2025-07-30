interface BurgerIconProps {
  className?: string;
}

export default function BurgerIcon({ className = "" }: BurgerIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="burger icon"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4609 8.33325C16.4609 8.67843 16.1811 8.95825 15.8359 8.95825L4.16927 8.95825C3.82409 8.95825 3.54427 8.67843 3.54427 8.33325C3.54427 7.98807 3.82409 7.70825 4.16927 7.70825L15.8359 7.70825C16.1811 7.70825 16.4609 7.98807 16.4609 8.33325Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4609 11.6667C16.4609 12.0119 16.1811 12.2917 15.8359 12.2917L4.16927 12.2917C3.82409 12.2917 3.54427 12.0119 3.54427 11.6667C3.54427 11.3216 3.82409 11.0417 4.16927 11.0417L15.8359 11.0417C16.1811 11.0417 16.4609 11.3216 16.4609 11.6667Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4609 5C16.4609 5.34518 16.1811 5.625 15.8359 5.625L4.16927 5.625C3.82409 5.625 3.54427 5.34518 3.54427 5C3.54427 4.65482 3.82409 4.375 4.16927 4.375L15.8359 4.375C16.1811 4.375 16.4609 4.65482 16.4609 5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4609 15C16.4609 15.3452 16.1811 15.625 15.8359 15.625L4.16927 15.625C3.82409 15.625 3.54427 15.3452 3.54427 15C3.54427 14.6548 3.82409 14.375 4.16927 14.375L15.8359 14.375C16.1811 14.375 16.4609 14.6548 16.4609 15Z"
        fill="currentColor"
      />
    </svg>
  );
}
