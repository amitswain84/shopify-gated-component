"use client";

import { motion } from "framer-motion";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { GridPatternDashed } from "@/components/ui/grid-pattern-dashed";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSonae() {
    return (
        <section className="relative w-full overflow-hidden bg-background py-16 md:py-24 lg:py-32">
            {/* Global Grid Lines for Box Look - Left/Right */}
            <div className="absolute inset-y-0 left-0 w-px bg-border/40 hidden md:block" />
            <div className="absolute inset-y-0 right-0 w-px bg-border/40 hidden md:block" />

            <GridPatternDashed />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center">

                    {/* Top Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6 flex items-center justify-center"
                    >
                        <div className="rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                <span>Agents built for developers.</span>
                            </AnimatedShinyText>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground max-w-4xl"
                    >
                        Agents. Working, <br className="hidden md:block" />
                        Always, <span className="text-[#ff4d4d]">for you.</span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                        Experience the next generation of AI-powered eyewear. Seamlessly blending
                        cutting-edge technology with sophisticated style.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-8 flex flex-col sm:flex-row items-center gap-4"
                    >
                        <RainbowButton className="h-12 px-8 min-w-[200px] text-white">
                            Get Unlimited Access
                        </RainbowButton>

                        <ShinyButton className="h-12 px-8 min-w-[200px] bg-background text-foreground border border-input hover:bg-accent/10 flex items-center justify-center">
                            <span className="leading-none pt-1">Started for Free</span>
                        </ShinyButton>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-10 flex items-center gap-4"
                    >
                        {/* Avatar Stack */}
                        <AvatarCircles
                            numPeople={99}
                            avatarUrls={[
                                "https://github.com/shadcn.png",
                                "https://github.com/dillionverma.png",
                                "https://github.com/leerob.png",
                                "https://github.com/evilrabbit.png",
                            ]}
                        />
                        {/* Rating */}
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex text-foreground">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="size-4 fill-current text-yellow-500" />
                                ))}
                            </div>
                            <div className="text-sm">
                                <span className="font-bold">2.5k+</span> <span className="text-muted-foreground">developers</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Aesthetic Background Text */}
            <div className="absolute top-1/2 -right-[10%] -translate-y-1/2 select-none pointer-events-none z-0 hidden lg:block">
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.03, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-[40rem] font-bold leading-none tracking-tighter text-foreground rotate-90 origin-center"
                >
                    Sonae
                </motion.div>
            </div>
        </section>
    );
}
