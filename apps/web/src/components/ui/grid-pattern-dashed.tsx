"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export function GridPatternDashed() {
    return (
        <div className="absolute inset-0 -z-10 flex size-full items-center justify-center overflow-hidden">
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                    "opacity-30"
                )}
            />
        </div>
    );
}
