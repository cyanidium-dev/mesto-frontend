interface PlusIconProps {
    className?: string;
}

export default function PlusIcon({ className = "" }: PlusIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="plus icon"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 9.37502L17.5 9.37502V10.625L2.5 10.625L2.5 9.37502Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.625 2.5L10.625 17.5H9.375L9.375 2.5L10.625 2.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

