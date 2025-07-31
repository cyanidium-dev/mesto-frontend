"use client";

import { useEffect, useState } from "react";
import { Business } from "@/types/business";
import Image from "next/image";
import MainButton from "../shared/buttons/MainButton";
import IconButton from "../shared/buttons/IconButton";

interface CardProps {
  business: Business;
}

export default function Card({ business }: CardProps) {
  const [isShownMore, setIsShownMore] = useState(false);
  const [shouldClamp, setShouldClamp] = useState(true); // для line-clamp
  const toggleShowMore = () => setIsShownMore((prev) => !prev);

  useEffect(() => {
    if (isShownMore) {
      // розгортається — одразу прибираємо clamp
      setShouldClamp(false);
    } else {
      // згортається — clamp через затримку
      const timeout = setTimeout(() => {
        setShouldClamp(true);
      }, 700); // 700мс = час анімації max-height
      return () => clearTimeout(timeout);
    }
  }, [isShownMore]);

  const { imageUrl, title, description, category } = business;

  return (
    <li className="p-2 shadow-md rounded-[16px] bg-white">
      <div
        className={`flex gap-2 mb-2 overflow-hidden transition-[max-height] duration-700 ${
          isShownMore ? "max-h-[600px] ease-in" : "max-h-[95px] ease-out"
        }`}
      >
        <div className="relative w-[71px] h-[95px] overflow-hidden rounded-[16px] shrink-0">
          <Image src={imageUrl} fill alt="photo" className="object-cover" />
        </div>
        <div>
          <h3 className="flex flex-col gap-1 mb-2 min-h-8">
            <span className="line-clamp-1">{title}</span>
            {category ? (
              <span className="line-clamp-1 text-[12px] text-gray-placeholder">
                {category}
              </span>
            ) : null}
          </h3>
          <p
            onClick={toggleShowMore}
            className={`text-[12px] text-gray-text transition-all duration-300 ${
              shouldClamp ? (category ? "line-clamp-4" : "line-clamp-3") : ""
            }`}
          >
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MainButton className="flex items-center gap-2 h-8 px-3 w-fit text-[12px]">
            <Image
              src="/images/navbar/chat.svg"
              alt="chat icon"
              width={20}
              height={20}
            />
            Написать
          </MainButton>
          <IconButton>
            <Image
              src="images/icons/share.svg"
              alt="share icon"
              width={20}
              height={20}
            />
          </IconButton>
          <IconButton>
            <Image
              src="images/icons/bookmark.svg"
              alt="bookmark icon"
              width={20}
              height={20}
            />
          </IconButton>
        </div>
        <IconButton onClick={toggleShowMore}>
          <Image
            src="images/icons/arrow.svg"
            alt="arrow icon"
            width={20}
            height={20}
            className={`transition duration-500 ease-in-out ${
              isShownMore ? "-rotate-180" : "rotate-0"
            }`}
          />
        </IconButton>
      </div>
    </li>
  );
}
