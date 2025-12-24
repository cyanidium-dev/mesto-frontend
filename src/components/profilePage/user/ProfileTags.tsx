"use client";

interface ProfileTagsProps {
    tags: string[];
}

export default function ProfileTags({ tags }: ProfileTagsProps) {
    // Temporarily hidden - functionality not needed
    return null;
    
    // if (!tags || tags.length === 0) return null;

    // const capitalizeFirstLetter = (str: string): string => {
    //     if (!str) return str;
    //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // };

    // return (
    //     <div className="mb-3">
    //         <p className="text-[14px] font-semibold mb-2">Теги</p>
    //         <div className="flex flex-wrap gap-2">
    //             {tags.map((tag, index) => (
    //                 <span
    //                     key={index}
    //                     className="px-3 py-1 bg-transparent border-1 border-primary rounded-full text-[12px]"
    //                 >
    //                     {capitalizeFirstLetter(tag)}
    //                 </span>
    //             ))}
    //         </div>
    //     </div>
    // );
}
