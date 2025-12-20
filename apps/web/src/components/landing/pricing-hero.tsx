"use client";

import { motion } from "framer-motion";
import { Eye, Target, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export function PricingHero() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="w-full bg-white">
            <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="relative flex flex-col items-center justify-start overflow-hidden bg-black rounded-[8px] border border-gray-800 py-20 px-4 md:px-10">

                    {/* Dot Background - Faded, Shifted Up, Full Width */}
                    <div className="absolute inset-x-0 top-[-100px] h-[calc(100%+100px)] pointer-events-none opacity-20">
                        <DotPattern
                            className={cn(
                                "[mask-image:linear-gradient(to_bottom,white,transparent_80%)]", // Faded out at bottom
                                "fill-gray-500"
                            )}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto justify-center">

                        {/* Hiring Badge - mt-8 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-8"
                        >
                            <Badge variant="secondary" className="bg-gray-900 border border-gray-800 shadow-sm px-3 py-1 rounded-full text-[11px] font-medium text-gray-300 gap-1.5 hover:bg-gray-800 font-inter">
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
                            className="text-3xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-[1] font-geist-sans"
                        >
                            AI search analytics
                            <br />
                            <span className="text-gray-500">for marketing teams</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.div
                            initial={fadeInUp.initial}
                            animate={fadeInUp.animate}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm md:text-base text-gray-400 mb-0 max-w-3xl flex-wrap font-inter leading-relaxed"
                        >
                            <span>Track, analyze, and improve brand performance on AI search platforms</span>
                            <span className="hidden md:inline">through key metrics like</span>
                            <span className="md:hidden">through key metrics like:</span>

                            <div className="flex items-center gap-1.5 mt-2 md:mt-0">
                                <Badge variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-300 font-medium py-0.5 px-2 gap-1.5 shadow-sm text-xs font-inter">
                                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                                    Visibility
                                </Badge>
                                <span className="text-gray-600">,</span>
                                <Badge variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-300 font-medium py-0.5 px-2 gap-1.5 shadow-sm text-xs font-inter">
                                    <Target className="w-3.5 h-3.5 text-gray-500" />
                                    Position
                                </Badge>
                                <span className="text-gray-600">, and</span>
                                <Badge variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-300 font-medium py-0.5 px-2 gap-1.5 shadow-sm text-xs font-inter">
                                    <Smile className="w-3.5 h-3.5 text-gray-500" />
                                    Sentiment
                                </Badge>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
