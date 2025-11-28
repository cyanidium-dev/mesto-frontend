interface CloseXIconProps {
    className?: string;
}

export default function CloseXIcon({ className = "" }: CloseXIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="close icon"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.8831 9.99997L17.1078 16.2247L16.224 17.1086L9.99923 10.8838L3.77451 17.1086L2.89062 16.2247L9.11535 9.99997L2.89062 3.77524L3.77451 2.89136L9.99923 9.11608L16.224 2.89136L17.1078 3.77524L10.8831 9.99997Z"
                fill="currentColor"
            />
        </svg>
    );
}

