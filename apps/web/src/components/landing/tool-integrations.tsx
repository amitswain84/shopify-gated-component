
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export function ToolIntegrations() {
    const features = [
        {
            title: "Native Flow, Zero Friction",
            description: "Seamless user experiences that feel right at home.",
            image: "/assets/landing-page/images/Native Flow, Zero Friction.webp"
        },
        {
            title: "350+ Ways to Flex",
            description: "A massive library of components for every use case.",
            image: "/assets/landing-page/images/350+ Ways to Flex.webp"
        },
        {
            title: "No Bloat, Just Speed",
            description: "Optimized for performance with zero unnecessary code.",
            image: "/assets/landing-page/images/No Bloat, Just Speed.webp"
        },
        {
            title: "Fresh Drops, Every Week",
            description: "New components and templates added regularly.",
            image: "/assets/landing-page/images/Fresh Drops, Every Week.webp"
        },
        {
            title: "Zero Dev Tax. Zero Theme Debt",
            description: "Clean code that respects your architecture.",
            image: "/assets/landing-page/images/Zero Dev Tax. Zero Theme Debt..webp"
        },
        {
            title: "Ultimate Vibe Checklist",
            description: "Everything you need to ship world-class products.",
            image: "/assets/landing-page/images/Ultimate Vibe Checklist.webp"
        }
    ];

    return (
        <section className="w-full bg-white border-b border-gray-200 overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto px-6">
                <div className="flex w-full items-stretch">

                    {/* Left Pattern Border - Inside 
                        - Width: w-2 md:w-3 (Tight spacing)
                        - Border Right: The "New Inner Vertical Line" from top to bottom
                        - Bg: Pattern
                        - Visible on mobile
                    */}
                    <div className="w-6 md:w-9 border-r border-gray-200 flex-shrink-0 relative">
                        <div className="w-full h-full"
                            style={{
                                backgroundImage: `repeating-linear-gradient(45deg, #d1d5db 0, #d1d5db 1px, transparent 0, transparent 4px)`
                            }}
                        />
                    </div>

                    {/* Content Container - Flex Grow */}
                    <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 border-gray-200/60">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex flex-col border-gray-200/60",
                                        "md:border-r md:border-b", // Default

                                        // Remove right border for 3rd, 6th item (indices 2, 5)
                                        (i + 1) % 3 === 0 && "md:border-r-0",

                                        // Mobile: border-b on all.
                                        "border-b",

                                        // Remove bottom border for the last row (indices 3, 4, 5)
                                        i >= 3 && "border-b-0 md:border-b-0"
                                    )}
                                >
                                    {/* Upper Box: 1:1 Ratio. Image. */}
                                    <div className="relative w-full aspect-square bg-white flex items-center justify-center overflow-hidden border-b border-gray-100">
                                        <div className="z-10 relative w-[90%] h-[90%]">
                                            <Image
                                                src={feature.image}
                                                alt={feature.title}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            {/* Radial Overlay for blending background */}
                                            <div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 30%, rgba(255,255,255,1) 100%)' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom Box: 120px Fixed Height. p-4. */}
                                    <div className="relative w-full h-[120px] flex flex-col justify-center p-4 bg-white">
                                        <h3 className="text-xl font-semibold text-black mb-1 font-geist-sans">{feature.title}</h3>
                                        <p className="text-gray-500 font-inter leading-relaxed text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Pattern Border - Inside 
                        - Width: w-2 md:w-3 (Tight spacing)
                        - Border Left: The "New Inner Vertical Line" from top to bottom
                        - Bg: Pattern
                        - Visible on mobile
                    */}
                    <div className="w-6 md:w-9 border-l border-gray-200 flex-shrink-0 relative">
                        <div className="w-full h-full"
                            style={{
                                backgroundImage: `repeating-linear-gradient(45deg, #d1d5db 0, #d1d5db 1px, transparent 0, transparent 4px)`
                            }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

