"use client";

import { motion } from "framer-motion";
import { Eye, Target, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export function CTASection() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="w-full bg-white">
            <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="relative flex flex-col items-center justify-start overflow-hidden bg-black rounded-[8px] border border-gray-800 py-12 px-4 md:px-10">

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
                            <Badge variant="secondary" className="bg-gray-900 border border-gray-800 shadow-sm px-3 py-1 rounded-full text-[11px] font-medium text-emerald-400 gap-1.5 hover:bg-gray-800 font-inter">
                                🟢 NO CAP: YOUR NEW SECRET WEAPON
                            </Badge>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={fadeInUp.initial}
                            animate={fadeInUp.animate}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-3xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1] font-geist-sans"
                        >
                            READY TO 5X YOUR AGENCY MARGINS?
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.div
                            initial={fadeInUp.initial}
                            animate={fadeInUp.animate}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-center text-sm md:text-base text-gray-400 mb-10 max-w-3xl font-inter leading-relaxed mx-auto"
                        >
                            <span className="inline">
                                Join 2,500+ agency legends shipping banger storefronts in record time. No more 2 AM code fatigue—just pure profit vibes and god-tier drip for every client build.
                            </span>
                            <span className="inline-flex items-center gap-1.5 align-middle ml-2 flex-wrap justify-center">
                                <motion.div whileHover={{ rotate: -5 }} className="inline-block">
                                    <Badge variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-300 font-medium py-0.5 px-2 shadow-sm text-xs font-inter align-middle cursor-default">
                                        🚀 90+ PageSpeed
                                    </Badge>
                                </motion.div>
                                <span className="text-gray-600">,</span>
                                <motion.div whileHover={{ rotate: 5 }} className="inline-block">
                                    <Badge variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-300 font-medium py-0.5 px-2 shadow-sm text-xs font-inter align-middle cursor-default">
                                        💸 5x Margins
                                    </Badge>
                                </motion.div>
                                <span className="text-gray-600">, and</span>
                                <motion.div whileHover={{ rotate: -5 }} className="inline-block">
                                    <Badge variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-300 font-medium py-0.5 px-2 shadow-sm text-xs font-inter align-middle cursor-default">
                                        💎 Elite UX
                                    </Badge>
                                </motion.div>
                            </span>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            initial={fadeInUp.initial}
                            animate={fadeInUp.animate}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                        >
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto h-10 px-5 rounded-[8px] border-zinc-700 bg-transparent text-white font-medium hover:bg-zinc-800 hover:text-white font-inter text-sm shadow-sm transition-all"
                            >
                                Access Free Blocks
                            </Button>

                            <Button
                                className="w-full sm:w-auto h-10 px-5 rounded-[8px] bg-white text-black font-medium hover:bg-gray-100 font-inter text-sm shadow-sm transition-all"
                            >
                                Get Lifetime Access
                            </Button>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
