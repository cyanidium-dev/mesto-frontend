"use client";
import { Dispatch, SetStateAction } from "react";
import { FormikProps, useFormikContext } from "formik";
import MainButton from "../../shared/buttons/MainButton";
import SectionTitle from "../../shared/titles/SectionTitle";
import ImageUploadInput from "../../shared/formComponents/ImageUploadInput";
import Image from "next/image";
import { BaseFormValues } from "@/types/formValues";

interface ImagesUploadProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formProps: FormikProps<BaseFormValues>;
}

const MultiImageUpload = () => {
    const { values, setFieldValue } = useFormikContext<BaseFormValues>();
    const imageUrls = values.imageUrls || [];

    const handleImageAdd = (url: string) => {
        if (imageUrls.length < 8) {
            setFieldValue("imageUrls", [...imageUrls, url]);
        }
    };

    const handleImageRemove = (index: number) => {
        setFieldValue(
            "imageUrls",
            imageUrls.filter((_, i) => i !== index)
        );
    };

    return (
        <div>
            <p className="mb-4 text-[14px] text-gray-text">
                Загрузите до 8 изображений ({imageUrls.length}/8)
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {Array.from({ length: 8 }).map((_, index) => {
                    const imageUrl = imageUrls[index];
                    return (
                        <div key={index} className="relative aspect-square">
                            {imageUrl ? (
                                <>
                                    <Image
                                        src={imageUrl}
                                        alt={`Upload ${index + 1}`}
                                        className="w-full h-full object-cover rounded-[16px]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        ×
                                    </button>
                                </>
                            ) : (
                                <div className="w-full h-full border-2 border-dashed border-gray-light rounded-[16px] flex items-center justify-center">
                                    <ImageUploadInput
                                        fieldName={`tempImage${index}`}
                                        label=""
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const ImagesUpload = ({
    setCurrentStep,
    formProps,
}: ImagesUploadProps) => {
    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <SectionTitle className="mb-6">Изображения</SectionTitle>
                <MultiImageUpload />
            </div>
            <MainButton
                onClick={() => setCurrentStep(prev => prev + 1)}
                variant="primary"
                className="h-12"
            >
                Продолжить
            </MainButton>
        </div>
    );
};
