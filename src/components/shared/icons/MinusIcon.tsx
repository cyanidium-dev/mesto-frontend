interface MinusIconProps {
    className?: string;
}

export default function MinusIcon({ className = "" }: MinusIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="minus icon"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 9.375L17.5 9.375V10.625L2.5 10.625L2.5 9.375Z"
                fill="currentColor"
            />
        </svg>
    );
}

