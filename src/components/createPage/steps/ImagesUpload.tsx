"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
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

    const convertFileToDataUrl = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Watch for file uploads in temp fields and convert them to data URLs
    const typedValues = values as BaseFormValues & Record<string, unknown>;
    const tempImage0 = typedValues.tempImage0;
    const tempImage1 = typedValues.tempImage1;
    const tempImage2 = typedValues.tempImage2;
    const tempImage3 = typedValues.tempImage3;
    const tempImage4 = typedValues.tempImage4;
    const tempImage5 = typedValues.tempImage5;
    const tempImage6 = typedValues.tempImage6;
    const tempImage7 = typedValues.tempImage7;

    useEffect(() => {
        const processTempImages = async () => {
            const tempFields = Array.from({ length: 8 }, (_, i) => `tempImage${i}`);
            const updatedUrls = [...imageUrls];
            let hasChanges = false;

            for (let i = 0; i < tempFields.length; i++) {
                const tempFieldName = tempFields[i];
                const tempValue = typedValues[tempFieldName];

                // If there's a File in temp field and no image at this index yet
                if (tempValue instanceof File && !imageUrls[i]) {
                    const dataUrl = await convertFileToDataUrl(tempValue);
                    updatedUrls[i] = dataUrl;
                    hasChanges = true;
                    // Clear the temp field
                    setFieldValue(tempFieldName, "");
                }
            }

            if (hasChanges) {
                setFieldValue("imageUrls", updatedUrls);
            }
        };

        processTempImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tempImage0,
        tempImage1,
        tempImage2,
        tempImage3,
        tempImage4,
        tempImage5,
        tempImage6,
        tempImage7,
        imageUrls,
        setFieldValue,
    ]);

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
                                        fill
                                        unoptimized
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
