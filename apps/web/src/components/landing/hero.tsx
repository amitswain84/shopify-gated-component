"use client";

import { motion } from "framer-motion";
import { Eye, Target, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/ui/dot-pattern";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { cn } from "@/lib/utils";

export function Hero() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="relative flex flex-col items-center justify-start overflow-hidden bg-white pt-20 border-b border-gray-200">

            {/* Dot Background - Faded, Shifted Up, Full Width */}
            <div className="absolute inset-x-0 top-[-100px] h-[calc(100%+100px)] pointer-events-none opacity-50">
                <DotPattern
                    className={cn(
                        "[mask-image:linear-gradient(to_bottom,white,transparent_80%)]", // Faded out at bottom
                        "fill-gray-300"
                    )}
                />
            </div>

            <div className="w-full relative z-10 flex flex-col items-center text-center px-12 max-w-5xl mx-auto min-h-[48vh] justify-center">

                {/* Hiring Badge - mt-8 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 mt-8"
                >
                    <Badge variant="secondary" className="bg-white border border-gray-200 shadow-sm px-3 py-1 rounded-full text-[11px] font-medium text-gray-700 gap-1.5 hover:bg-gray-50 font-inter">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        We are hiring
                    </Badge>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl md:text-6xl font-medium tracking-tight text-black mb-6 leading-[1] font-geist-sans"
                >
                    AI search analytics
                    <br />
                    <span className="text-gray-400">for marketing teams</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.div
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm md:text-base text-gray-600 mb-10 max-w-3xl flex-wrap font-inter leading-relaxed"
                >
                    <span>Track, analyze, and improve brand performance on AI search platforms</span>
                    <span className="hidden md:inline">through key metrics like</span>
                    <span className="md:hidden">through key metrics like:</span>

                    <div className="flex items-center gap-1.5 mt-2 md:mt-0">
                        <Badge variant="outline" className="bg-gray-50/50 border-gray-200 text-gray-700 font-medium py-0.5 px-2 gap-1.5 shadow-sm text-xs font-inter">
                            <Eye className="w-3.5 h-3.5 text-gray-500" />
                            Visibility
                        </Badge>
                        <span className="text-gray-300">,</span>
                        <Badge variant="outline" className="bg-gray-50/50 border-gray-200 text-gray-700 font-medium py-0.5 px-2 gap-1.5 shadow-sm text-xs font-inter">
                            <Target className="w-3.5 h-3.5 text-gray-500" />
                            Position
                        </Badge>
                        <span className="text-gray-300">, and</span>
                        <Badge variant="outline" className="bg-gray-50/50 border-gray-200 text-gray-700 font-medium py-0.5 px-2 gap-1.5 shadow-sm text-xs font-inter">
                            <Smile className="w-3.5 h-3.5 text-gray-500" />
                            Sentiment
                        </Badge>
                    </div>
                </motion.div>

                {/* CTA Buttons - Stack on Mobile */}
                <motion.div
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto"
                >
                    <Button variant="outline" className="w-full sm:w-auto h-[44px] px-6 rounded-[8px] border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-black font-inter text-sm shadow-sm transition-all hover:border-gray-300 bg-white">
                        <span className="w-2 h-2 bg-gray-300 mr-2 rounded-[2px]" />
                        Start for Free
                    </Button>

                    <Button className="w-full sm:w-auto h-[44px] px-6 rounded-[8px] bg-black text-white font-medium hover:bg-black/90 font-inter text-sm shadow-sm">
                        Get Unlimited Access
                    </Button>
                </motion.div>
            </div>

            {/* --- Hero Video Inline --- */}
            <div className="w-full relative z-10 pb-4 md:pb-12 px-4 max-w-[1200px] mx-auto">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 max-w-[1000px] mx-auto">
                    <iframe
                        src="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        title="Hero Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}
