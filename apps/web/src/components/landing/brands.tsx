"use client";

import Image from "next/image";
import { Box, Circle, Hexagon, Triangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brands() {
    const brands = [
        { name: "Whop", icon: <span className="text-orange-500">⚡</span> },
        { name: "Clerk", icon: <span className="text-blue-500">C</span> },
        { name: "Cal.com", icon: null },
        { name: "bolt", icon: null, className: "italic" },
        { name: "supabase", icon: <span className="text-emerald-500">⚡</span> },
        { name: "tella", icon: <span className="bg-purple-500 text-white rounded p-0.5 text-sm">T</span> },
        { name: "Polymarket", icon: <Hexagon className="w-5 h-5" /> },
        { name: "granola", icon: null },
        { name: "Superlist", icon: <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">S</span> },
        { name: "JOBBER", icon: null, className: "tracking-wider" },
        { name: "Linear", icon: <Triangle className="w-5 h-5 text-indigo-500" /> }, // Added for 6x2
        { name: "Raycast", icon: <Box className="w-5 h-5 text-red-500" /> }, // Added for 6x2
    ];

    return (
        <section className="w-full border-b border-gray-200 bg-white">
            <div className="w-full max-w-[1200px] mx-auto px-3 md:px-6">
                {/* 
            Grid:
            Mobile: 3*2 = 6 boxes (indices 0-5).
            Desktop: 6*2 = 12 boxes (indices 0-11).
         */}
                <div className="grid grid-cols-3 md:grid-cols-6 border-l border-gray-200/60">
                    {brands.map((brand, i) => (
                        <div
                            key={i}
                            className={cn(
                                "relative flex items-center justify-center h-20 p-2 group border-r border-b border-gray-200/60 bg-white hover:bg-gray-50/50 transition-colors duration-300",
                                // "decrease height" -> h-20 (80px)

                                // Mobile Visibility: Show 0-5. Hide >= 6.
                                i >= 6 && "hidden md:flex",

                                // Border Logic:
                                // Mobile (Cols 3):
                                // Bottom row is indices 3, 4, 5. Remove border-b.
                                (i >= 3 && i <= 5) && "border-b-0",

                                // Desktop (Cols 6):
                                // Bottom row is indices 6, 7, 8, 9, 10, 11. Remove border-b.
                                i >= 6 && "md:border-b-0",

                                // Fix overlap: 
                                // Items 3,4,5 are bottom on mobile (no border) but top row on desktop (need border).
                                (i >= 3 && i <= 5) && "md:border-b",

                                // Items 0,1,2 always top row (border-b).
                            )}
                        >
                            <div className={cn("flex items-center gap-2 font-bold text-lg text-gray-400 group-hover:text-black transition-colors duration-300 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100", brand.className)}>
                                {brand.icon}
                                <span className="hidden sm:inline">{brand.name}</span>
                                <span className="sm:hidden text-xs"> {brand.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
