"use client";

import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Share2 } from "lucide-react"; // Using Link icon for Dub Links logo proxy

export function FeatureSection() {
    return (
        <section className="w-full bg-white border-b border-gray-200">
            <div className="w-full max-w-[1200px] mx-auto py-12 px-8 md:px-12 flex flex-col items-start text-left">

                {/* Label */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="flex items-center justify-center w-6 h-6 rounded bg-orange-100 text-orange-600">
                        {/* Using a simple icon closely resembling the logo in image */}
                        <Share2 className="w-3.5 h-3.5 fill-current" />
                    </span>
                    <span className="text-gray-600 font-medium text-sm font-inter">Dub Links</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black mb-6 font-geist-sans">
                    It starts with a link
                </h2>

                {/* Description */}
                <p className="text-xl text-gray-600 mb-8 max-w-2xl font-inter leading-relaxed">
                    Create branded short links with superpowers: built-in QR codes, device/geo-targeting, A/B testing, deep links, and more.
                </p>

                {/* Button */}
                <Button variant="outline" className="h-[44px] px-6 rounded-[8px] border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:text-black font-inter shadow-sm bg-white">
                    Explore Links
                </Button>
            </div>
        </section>
    );
}
