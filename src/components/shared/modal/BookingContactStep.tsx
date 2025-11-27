"use client";

interface BookingContactStepProps {
    formData: {
        firstName: string;
        lastName: string;
        email: string;
    };
    onFormDataChange: (data: {
        firstName: string;
        lastName: string;
        email: string;
    }) => void;
    checkboxes: {
        otherEvents: boolean;
        similarEvents: boolean;
        terms: boolean;
    };
    onCheckboxesChange: (checkboxes: {
        otherEvents: boolean;
        similarEvents: boolean;
        terms: boolean;
    }) => void;
    timeRemaining: number;
}

export default function BookingContactStep({
    formData,
    onFormDataChange,
    checkboxes,
    onCheckboxesChange,
    timeRemaining,
}: BookingContactStepProps) {
    const formatTimeRemaining = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">
                    Контактная информация
                </h2>
                {timeRemaining > 0 && (
                    <p className="text-sm text-gray-placeholder">
                        Осталось времени {formatTimeRemaining(timeRemaining)}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm text-gray-placeholder">
                    Ваше имя:
                </label>
                <input
                    type="text"
                    value={formData.firstName}
                    onChange={e =>
                        onFormDataChange({
                            ...formData,
                            firstName: e.target.value,
                        })
                    }
                    placeholder="Введите ваше имя"
                    className="w-full px-4 h-12 text-base bg-white border border-gray-light rounded-full outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm text-gray-placeholder">
                    Ваша фамилия:
                </label>
                <input
                    type="text"
                    value={formData.lastName}
                    onChange={e =>
                        onFormDataChange({
                            ...formData,
                            lastName: e.target.value,
                        })
                    }
                    placeholder="Введите вашу фамилию"
                    className="w-full px-4 h-12 text-base bg-white border border-gray-light rounded-full outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm text-gray-placeholder">
                    Ваша почта:
                </label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={e =>
                        onFormDataChange({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                    placeholder="Введите вашу почту"
                    className="w-full px-4 h-12 text-base bg-white border border-gray-light rounded-full outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={checkboxes.otherEvents}
                        onChange={e =>
                            onCheckboxesChange({
                                ...checkboxes,
                                otherEvents: e.target.checked,
                            })
                        }
                        className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                    />
                    <span className="text-sm flex-1">
                        Отправлять другие события созданные этим организатором
                    </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={checkboxes.similarEvents}
                        onChange={e =>
                            onCheckboxesChange({
                                ...checkboxes,
                                similarEvents: e.target.checked,
                            })
                        }
                        className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                    />
                    <span className="text-sm flex-1">
                        Отправлять уведомления о похожих ивентах поблизости
                    </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={checkboxes.terms}
                        onChange={e =>
                            onCheckboxesChange({
                                ...checkboxes,
                                terms: e.target.checked,
                            })
                        }
                        className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                    />
                    <span className="text-sm flex-1">
                        Я соглашаюсь с{" "}
                        <a href="#" className="text-primary underline">
                            Terms of Service
                        </a>
                        ,{" "}
                        <a href="#" className="text-primary underline">
                            Community Guidelines
                        </a>{" "}
                        и{" "}
                        <a href="#" className="text-primary underline">
                            Privacy Policy
                        </a>{" "}
                        (обязательно)
                    </span>
                </label>
            </div>
        </div>
    );
}

