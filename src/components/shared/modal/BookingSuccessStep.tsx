"use client";

interface BookingSuccessStepProps {
    quantity: number;
}

export default function BookingSuccessStep({
    quantity,
}: BookingSuccessStepProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-2">
                    Супер, вы забронировали место!
                </h2>
                <p className="text-base text-gray-placeholder">
                    Вы забронировали место для {quantity}{" "}
                    {quantity === 1
                        ? "человека"
                        : quantity < 5
                        ? "человек"
                        : "человек"}
                    , не забудьте придти!
                </p>
            </div>
        </div>
    );
}

