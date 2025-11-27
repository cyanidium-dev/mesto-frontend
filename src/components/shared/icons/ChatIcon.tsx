interface ChatIconProps {
    className?: string;
}

export default function ChatIcon({ className = "" }: ChatIconProps) {
    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="chat icon"
        >
            <path
                d="M9.89844 11C9.89844 11.5523 9.45072 12 8.89844 12C8.34615 12 7.89844 11.5523 7.89844 11C7.89844 10.4477 8.34615 10 8.89844 10C9.45072 10 9.89844 10.4477 9.89844 11Z"
                fill="currentColor"
            />
            <path
                d="M13.8984 11C13.8984 11.5523 13.4507 12 12.8984 12C12.3462 12 11.8984 11.5523 11.8984 11C11.8984 10.4477 12.3462 10 12.8984 10C13.4507 10 13.8984 10.4477 13.8984 11Z"
                fill="currentColor"
            />
            <path
                d="M17.8984 11C17.8984 11.5523 17.4507 12 16.8984 12C16.3462 12 15.8984 11.5523 15.8984 11C15.8984 10.4477 16.3462 10 16.8984 10C17.4507 10 17.8984 10.4477 17.8984 11Z"
                fill="currentColor"
            />
        </svg>
    );
}
