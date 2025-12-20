"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function FlickerGridSection({ title = "Performance" }: { title?: string }) {
    return (
        <section className="w-full bg-white border-b border-gray-200">
            <div className="w-full max-w-[1200px] mx-auto py-0 px-8">
                {/* 
              Height: 
              Desktop: 120px
              Mobile: Decrease by 30% ~ 84px.
          */}
                <div className="bg-background relative h-[84px] md:h-[120px] w-full overflow-hidden flex items-center justify-center">

                    {/* Flickering Grid Background (Layer 0) */}
                    <FlickeringGrid
                        className="absolute inset-0 z-0 size-full"
                        squareSize={4}
                        gridGap={6}
                        color="#6B7280"
                        maxOpacity={0.15}
                        flickerChance={0.1}
                        height={120}
                    />

                    {/* White Blur Shade / Gradient (Layer 5) */}
                    <div className="absolute inset-0 z-[5] bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none" />

                    {/* Center Text (Layer 10) 
                Uppercase, 1.2rem.
            */}
                    <h2 className="relative z-10 text-[1.2rem] font-medium tracking-tight text-gray-500 uppercase font-geist-sans">
                        {title}
                    </h2>
                </div>
            </div>
        </section>
    );
}
