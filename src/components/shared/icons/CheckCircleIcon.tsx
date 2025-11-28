interface CheckCircleIconProps {
    className?: string;
}

export default function CheckCircleIcon({ className = "" }: CheckCircleIconProps) {
    return (
        <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="check circle icon"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M66 36C66 52.5685 52.5685 66 36 66C19.4315 66 6 52.5685 6 36C6 19.4315 19.4315 6 36 6C52.5685 6 66 19.4315 66 36ZM48.091 26.909C48.9697 27.7877 48.9697 29.2123 48.091 30.091L33.091 45.091C32.2123 45.9697 30.7877 45.9697 29.909 45.091L23.909 39.091C23.0303 38.2123 23.0303 36.7877 23.909 35.909C24.7877 35.0303 26.2123 35.0303 27.091 35.909L31.5 40.318L38.2045 33.6135L44.909 26.909C45.7877 26.0303 47.2123 26.0303 48.091 26.909Z"
                fill="currentColor"
            />
        </svg>
    );
}

