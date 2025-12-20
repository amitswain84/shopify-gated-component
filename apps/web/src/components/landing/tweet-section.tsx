"use client";

import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const tweets = [
    { text: "Companies spend $30,000+ to build landing pages. I built components to do the same in hours.", hasImage: true },
    { text: "Just shipped a new feature! The speed of development is insane. 🚀", hasImage: false },
    { text: "Best UI kit I've used in years. Clean, performant, and easy to customize.", hasImage: false },
    { text: "Standard libraries are getting bloated. This one strikes the balance.", hasImage: false },
    { text: "The new dashboard update is looking fire 🔥", hasImage: true },
    { text: "Saving weeks of dev time. Specialized components for SaaS.", hasImage: false },
    { text: "Design systems hard. This library easy.", hasImage: false },
    { text: "Working on a new project. Breezing! 💨", hasImage: true },
    { text: "Code quality top notch. Typescript seamless.", hasImage: false },
    { text: "Incredible attention to detail.", hasImage: false },
    { text: "My velocity has doubled since using this.", hasImage: true },
    { text: "Finally a library that looks good out of the box.", hasImage: false },
    { text: "Documentation is super clear.", hasImage: false },
    { text: "React + Tailwind + Framer Motion = ❤️", hasImage: false },
    { text: "Client was amazed by the animations.", hasImage: true },
    { text: "Fastest way to build a dashboard.", hasImage: false },
    { text: "Looks great on mobile too.", hasImage: false },
    { text: "I'm deleting my own component library.", hasImage: true },
    { text: "Shut up and take my money.", hasImage: false },
    { text: "This is the future of web dev.", hasImage: false },
    { text: "Can't wait to see what's next.", hasImage: false },
];

const users = [
    { name: "Dillion", handle: "@dillionverma" },
    { name: "Sarah", handle: "@sarah_dev" },
    { name: "Alex", handle: "@alexcodes" },
    { name: "James", handle: "@james_design" },
    { name: "Emily", handle: "@emilybuilds" },
];

const generateTestimonials = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        key: i,
        name: users[i % users.length].name,
        handle: users[i % users.length].handle,
        verified: true,
        avatarSrc: "https://github.com/shadcn.png",
        content: tweets[i % tweets.length].text,
        imageSrc: (tweets[i % tweets.length].hasImage && i % 3 === 0) ? "https://startup-template-sage.vercel.app/hero-dark.png" : undefined,
    }));
};

const testimonials = generateTestimonials(21);

function MarqueeColumn({ items, duration = 20, reverse = false, className }: { items: typeof testimonials, duration?: number, reverse?: boolean, className?: string }) {
    return (
        <div className={cn("flex flex-col gap-4 overflow-hidden h-[800px] relative", className)}>
            <motion.div
                initial={{ y: reverse ? -1000 : 0 }}
                animate={{ y: reverse ? 0 : -1000 }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
                className="flex flex-col gap-4"
            >
                {/* Render items multiple times to ensure smooth loop */}
                {[...items, ...items, ...items].map((item, i) => (
                    <div key={`${item.key}-${i}`} className="transform-gpu">
                        <TestimonialCard
                            variant="grid"
                            name={item.name}
                            handle={item.handle}
                            avatarSrc={item.avatarSrc}
                            content={item.content}
                            imageSrc={item.imageSrc}
                            verified={item.verified}
                            className="w-full border border-gray-100 shadow-sm rounded-lg bg-white" // Separated cards, rounded
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function TweetSection() {
    // Split into 3 columns
    const col1 = testimonials.slice(0, 7);
    const col2 = testimonials.slice(7, 14);
    const col3 = testimonials.slice(14, 21);

    return (
        <section className="w-full bg-white border-b border-gray-200 overflow-hidden relative">
            <div className="w-full max-w-[1200px] mx-auto px-8 py-12">

                {/* 
                   Mask for fading top and bottom 
                   Using css mask to fade content 
                */}
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative"
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
                    }}
                >
                    <MarqueeColumn items={col1} duration={40} />
                    <MarqueeColumn items={col2} duration={50} reverse className="hidden md:flex" />
                    <MarqueeColumn items={col3} duration={45} className="hidden md:flex" />
                </div>

            </div>
        </section>
    );
}
