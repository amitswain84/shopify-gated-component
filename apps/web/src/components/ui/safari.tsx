"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Lock, RefreshCcw } from "lucide-react";

interface SafariProps extends React.HTMLAttributes<HTMLDivElement> {
    url?: string;
    src?: string;
    imageSrc?: string;
}

export function Safari({
    url = "magicui.design",
    src,
    imageSrc,
    className,
    children,
    ...props
}: SafariProps) {
    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-xl bg-background shadow-xl ring-1 ring-border",
                className
            )}
            {...props}
        >
            <div className="flex h-12 items-center justify-between gap-4 border-b bg-muted/40 px-4">
                <div className="flex gap-2">
                    <div className="size-3 rounded-full bg-red-500" />
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <div className="size-3 rounded-full bg-green-500" />
                </div>
                <div className="flex flex-1 items-center justify-center gap-2">
                    <div className="flex gap-3 text-muted-foreground/50">
                        <ChevronLeft className="size-4" />
                        <ChevronRight className="size-4" />
                    </div>
                    <div className="flex w-full max-w-lg items-center gap-2 rounded-md bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border/50">
                        <Lock className="size-3" />
                        <span className="flex-1 text-center truncate">{url}</span>
                        <RefreshCcw className="size-3" />
                    </div>
                </div>
                <div className="w-[60px]" /> {/* Spacer for balance */}
            </div>
            <div className="relative w-full bg-background min-h-[400px]">
                {/* If src provided, use iframe or image. If children provided, render children. */}
                {src ? (
                    <iframe src={src} className="w-full h-full border-none min-h-[400px]" title="Safari Content" />
                ) : imageSrc ? (
                    <img src={imageSrc} alt="Preview" className="w-full h-full object-cover min-h-[400px]" />
                ) : children ? (
                    children
                ) : (
                    <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground text-sm">
                        Content goes here
                    </div>
                )}
            </div>
        </div>
    );
}
