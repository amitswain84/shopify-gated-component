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
                        <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        ⚡ THE SHOPIFY DEV CHEAT CODE
                    </Badge>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl md:text-6xl font-medium tracking-tight text-black mb-6 leading-[1.1] font-geist-sans"
                >
                    Build Banger Stores.
                    <br />
                    <span className="text-gray-400">Zero Code Fatigue.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.div
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center text-sm md:text-base text-gray-600 mb-10 max-w-3xl font-inter leading-relaxed mx-auto"
                >
                    <span className="inline">
                        Stop letting budget themes kill the vibe. Inject 350+ high-drip sections into any store in seconds. It’s a total Blast for your Agency workflow
                    </span>
                    <span className="inline-flex items-center gap-1.5 align-middle ml-2 flex-wrap justify-center">
                        <motion.div whileHover={{ rotate: -5 }} className="inline-block">
                            <Badge variant="outline" className="bg-gray-50/50 border-gray-200 text-gray-700 font-medium py-0.5 px-2 shadow-sm text-xs font-inter align-middle cursor-default">
                                🚀 Fast AF
                            </Badge>
                        </motion.div>
                        <span className="text-gray-400">,</span>
                        <motion.div whileHover={{ rotate: 5 }} className="inline-block">
                            <Badge variant="outline" className="bg-gray-50/50 border-gray-200 text-gray-700 font-medium py-0.5 px-2 shadow-sm text-xs font-inter align-middle cursor-default">
                                💎 God-Tier UX
                            </Badge>
                        </motion.div>
                        <span className="text-gray-400">, and</span>
                        <motion.div whileHover={{ rotate: -5 }} className="inline-block">
                            <Badge variant="outline" className="bg-gray-50/50 border-gray-200 text-gray-700 font-medium py-0.5 px-2 shadow-sm text-xs font-inter align-middle cursor-default">
                                🛠️ Zero Bloat
                            </Badge>
                        </motion.div>
                    </span>
                </motion.div>

                {/* CTA Buttons - Stack on Mobile */}
                <motion.div
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto"
                >
                    <Button variant="outline" className="w-full sm:w-auto h-10 px-5 rounded-[8px] border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-black font-inter text-sm shadow-sm transition-all hover:border-gray-300 bg-white">
                        View Component Wiki
                    </Button>

                    <Button className="w-full sm:w-auto h-10 px-5 rounded-[8px] bg-black text-white font-medium hover:bg-black/90 font-inter text-sm shadow-sm">
                        Get Lifetime Access
                    </Button>
                </motion.div>

                {/* Trusted By Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex flex-col items-center gap-4 mb-20"
                >
                    <div className="flex items-center gap-4">
                        {/* Avatar Group */}
                        <div className="flex -space-x-3 rtl:space-x-reverse">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=User+${i}&background=random&color=fff`}
                                        alt={`User ${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Text and Stars */}
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex items-center gap-1">
                                <span className="text-black font-semibold text-sm font-inter">Trusted by 200K+ designers worldwide</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-gray-600 text-xs font-inter">Excellent</span>
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-3.5 h-3.5 text-emerald-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600 text-xs font-inter">4.8 / 5</span>
                            </div>
                        </div>
                    </div>
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
