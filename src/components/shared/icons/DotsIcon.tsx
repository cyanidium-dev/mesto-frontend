interface DotsIconProps {
    className?: string;
}

export default function DotsIcon({ className = "" }: DotsIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="dots icon"
        >
            <circle cx="10" cy="4" r="1.5" fill="currentColor" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            <circle cx="10" cy="16" r="1.5" fill="currentColor" />
        </svg>
    );
}

