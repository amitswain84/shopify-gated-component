"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export function FeatureBentoGrid() {
    const features = [
        {
            title: "Native Flow, Zero Friction",
            description: "Smooth UX feeling like native Liquid. Ship premium custom builds without the usual development headache.",
            image: "/assets/landing-page/images/Native Flow, Zero Friction.webp"
        },
        {
            title: "350+ Ways to Flex",
            description: "Your ultimate creative arsenal. Swap mid sections for high drip layouts that keep clients obsessed.",
            image: "/assets/landing-page/images/350+ Ways to Flex.webp"
        },
        {
            title: "No Bloat, Just Speed",
            description: "Pure performance energy. No trash libraries, just clean code hitting 90+ PageSpeed scores every time.",
            image: "/assets/landing-page/images/No Bloat, Just Speed.webp"
        },
        {
            title: "Fresh Drops, Every Week",
            description: "Toolkit never stays stale. Constantly dropping new heat so your agency leads every Shopify trend.",
            image: "/assets/landing-page/images/Fresh Drops, Every Week.webp"
        },
        {
            title: "Zero Dev Tax. Zero Theme Debt",
            description: "Keep themes clean and margins fat. Stop paying bad code tax with architecture respecting foundations.",
            image: "/assets/landing-page/images/Zero Dev Tax. Zero Theme Debt..webp"
        },
        {
            title: "Ultimate Vibe Checklist",
            description: "The Main Character roadmap. Foolproof checklists ensuring every store you launch is polished and scalable.",
            image: "/assets/landing-page/images/Ultimate Vibe Checklist.webp"
        }
    ];

    return (
        <section className="w-full bg-white border-b border-gray-200 overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6">
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

                                    {/* Bottom Box: Auto Height. p-2 mobile, p-6 desktop. */}
                                    <div className="relative w-full h-auto flex flex-col justify-start p-2 md:p-6 bg-white border-t border-gray-100">
                                        <h3 className="text-base md:text-lg font-semibold text-black mb-2 font-geist-sans">{feature.title}</h3>
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
