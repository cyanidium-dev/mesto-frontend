interface UndoIconProps {
    className?: string;
}

export default function UndoIcon({ className = "" }: UndoIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="undo icon"
        >
            <path
                d="M5.94531 15.2583H12.612C14.912 15.2583 16.7786 13.3917 16.7786 11.0917C16.7786 8.79165 14.912 6.92499 12.612 6.92499H3.44531"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.3599 9.0083L3.22656 6.87497L5.3599 4.74164"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

