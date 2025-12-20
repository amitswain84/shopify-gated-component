"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface TestimonialCardProps {
    name: string;
    handle: string;
    avatarSrc: string;
    content: string;
    imageSrc?: string;
    className?: string;
    verified?: boolean;
    variant?: "card" | "grid";
}

export function TestimonialCard({
    name,
    handle,
    avatarSrc,
    content,
    imageSrc,
    className,
    verified = true,
    variant = "card",
}: TestimonialCardProps) {
    const isGrid = variant === "grid";

    return (
        <div
            className={cn(
                "flex flex-col gap-3 p-6 break-inside-avoid", // Increased padding for grid look
                // Default Card Styles
                !isGrid && "rounded-xl border border-gray-200 bg-white shadow-sm",
                // Grid Styles (managed by parent for borders usually, but we can set defaults)
                isGrid && "bg-white",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 flex-shrink-0">
                        <Image
                            src={avatarSrc}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-900">{name}</span>
                            {verified && (
                                <svg
                                    className="h-4 w-4 text-blue-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                                </svg>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">{handle}</span>
                    </div>
                </div>

                {/* Twitter Icon */}
                <svg
                    className="h-5 w-5 text-[#1DA1F2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            </div>

            <div className="text-[15px] leading-relaxed text-gray-800">
                {content}
            </div>

            {imageSrc && (
                <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-xl border border-gray-100">
                    <Image
                        src={imageSrc}
                        alt="Post image"
                        fill
                        className="object-cover"
                    />
                </div>
            )}
        </div>
    );
}
