"use client";

import { useRef, useState, useEffect } from "react";
import { FieldProps, useFormikContext } from "formik";
import Image from "next/image";
// import { FaTrash, FaCamera } from "react-icons/fa";

interface ImageUploadInputProps {
  fieldName: string;
  label?: string;
}

interface Values {
  [fieldName: string]: string | string[];
}

export default function ImageUploadInput({
  fieldName,
  label,
}: ImageUploadInputProps) {
  const { setFieldValue, values } = useFormikContext<Values>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const fileOrUrl = values[fieldName];

  useEffect(() => {
    if (fileOrUrl instanceof File) {
      const url = URL.createObjectURL(fileOrUrl);
      setPreviewUrl(url);

      // очистити URL коли компонент розмонтується або зміниться файл
      return () => URL.revokeObjectURL(url);
    } else if (typeof fileOrUrl === "string") {
      setPreviewUrl(fileOrUrl);
    } else {
      setPreviewUrl("");
    }
  }, [fileOrUrl]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue(fieldName, file);
    }
  }

  function handleRemove() {
    setFieldValue(fieldName, "");
    setPreviewUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="relative w-fit mx-auto rounded-[16px] overflow-hidden">
      {previewUrl ? (
        <div className="absolute top-0 left-0 z-20 w-[168px] h-[232px] rounded-[16px] overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute bottom-0 right-1"
          >
            <Image
              src="/images/icons/trash.svg"
              alt="trash"
              width={36}
              height={36}
            />
          </button>
        </div>
      ) : null}
      <div
        onClick={() => inputRef.current?.click()}
        className={`${
          previewUrl ? "opacity-0" : "opacity-100"
        } relative w-[168px] h-[232px] rounded-[16px] flex items-center justify-center cursor-pointer transition duration-100 ease-in-out`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <Image
          src="/images/icons/uploadBg.svg"
          alt="background"
          fill
          className="-z-10 pointer-events-none"
        />
        <Image
          src="/images/icons/camera.svg"
          alt="camera"
          width={32}
          height={32}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
