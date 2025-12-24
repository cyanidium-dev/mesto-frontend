"use client";
import { Business } from "@/types/business";

interface BusinessTagsProps {
    business: Business;
}

export default function BusinessTags({ business }: BusinessTagsProps) {
    // Tags functionality commented out - unused
    return null;
    
    // if (!business.tags || business.tags.length === 0) return null;

    // const capitalizeFirstLetter = (str: string): string => {
    //     if (!str) return str;
    //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // };

    // return (
    //     <div className="mb-3">
    //         <p className="text-[14px] font-semibold mb-2">Теги</p>
    //         <div className="flex flex-wrap gap-2">
    //             {business.tags.map((tag, index) => (
    //                 <span
    //                     key={index}
    //                     className="px-3 py-1 bg-transparent border-1 border-primary text-primary rounded-full text-[12px]"
    //                 >
    //                     {capitalizeFirstLetter(tag)}
    //                 </span>
    //             ))}
    //         </div>
    //     </div>
    // );
}
