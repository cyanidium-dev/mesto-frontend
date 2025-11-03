"use client";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";

interface StepZeroProps {
    setCreateType: (type: "event" | "business") => void;
}

export const StepZero = ({ setCreateType }: StepZeroProps) => {
    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Создать</SectionTitle>
                <p className="mb-6 text-[14px] text-gray-text text-center">
                    Что вы хотите создать?
                </p>
            </div>
            <div className="flex flex-col gap-3">
                <MainButton
                    onClick={() => setCreateType("event")}
                    variant="primary"
                    className="h-12"
                >
                    Событие
                </MainButton>
                <MainButton
                    onClick={() => setCreateType("business")}
                    variant="secondary"
                    className="h-12"
                >
                    Бизнес
                </MainButton>
            </div>
        </div>
    );
};
