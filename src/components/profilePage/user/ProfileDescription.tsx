"use client";

interface ProfileDescriptionProps {
    description: string;
}

export default function ProfileDescription({
    description,
}: ProfileDescriptionProps) {
    if (!description) return null;

    return (
        <div className="mb-3">
            <p className="text-[14px] font-semibold mb-2">Описание</p>
            <p className="text-[14px] whitespace-pre-wrap">{description}</p>
        </div>
    );
}

