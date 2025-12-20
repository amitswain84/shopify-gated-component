"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="w-full bg-white border-b border-gray-200 py-16">
            <div className="w-full max-w-[1200px] mx-auto px-8 text-center">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-8 font-geist-sans tracking-tight">
                    Can&apos;t find what you&apos;re looking for? Email us.
                </h3>

                <div className="flex justify-center">
                    <Button
                        className="h-[44px] px-6 rounded-[8px] bg-black text-white hover:bg-gray-800 font-medium shadow-sm transition-all flex items-center gap-2 group text-sm"
                    >
                        hi@kokonutui.pro
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
