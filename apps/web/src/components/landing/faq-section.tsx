"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "What exactly is ShopFlex and how does it upgrade my Shopify workflow?",
        answer: "ShopFlex is the ultimate Shopify component library designed for developers who are tired of building mid storefronts from scratch. We provide over 350+ high-drip Liquid snippets and sections that you can copy and paste into any Shopify 2.0 theme. It’s the secret sauce for agencies wanting to deliver custom $20k vibes without the development headache.",
    },
    {
        question: "Will using these components tank my Shopify PageSpeed score?",
        answer: "No cap, we built this for speed. Unlike heavy Shopify apps that bloat your site with external scripts, ShopFlex uses clean, native Liquid and CSS. Our \"No Bloat, Just Speed\" architecture ensures your stores maintain 90+ PageSpeed scores, which is essential for ranking higher on Google and boosting client ROI.",
    },
    {
        question: "Can I use ShopFlex snippets on any Shopify 2.0 theme?",
        answer: "Absolutely. Whether you are using Dawn, Prestige, or a fully custom build, our components are 100% compatible. They are designed to respect your theme's architecture while adding premium functionality that usually requires hours of custom coding.",
    },
    {
        question: "How does the 500+ point Shopify checklist increase my sales?",
        answer: "We don't just give you the drip; we give you the roadmap. The 500+ point checklist covers every micro-detail of SEO, speed optimization, and conversion rate optimization (CRO). Following this ensures your store is a high-ranking, sales-generating machine that outperforms the competition in every metric.",
    },
    {
        question: "Do I need to be a god-tier coder to use these sections?",
        answer: "Not at all. While these are pro-level tools, they are designed for instant copy-paste deployment. If you can navigate a Shopify theme editor, you can use ShopFlex. It eliminates code fatigue, allowing you to focus on high-level design and scaling your agency.",
    },
    {
        question: "Why are snippets better than using third-party Shopify apps?",
        answer: "Apps often require monthly subscriptions and slow down your site. ShopFlex provides a one-time investment for permanent, lightweight code. You own the code, you control the design, and your site stays fast AF—giving your clients a better user experience and higher organic ranking.",
    },
    {
        question: "What are the \"100+ legal dark hacks\" included in the Alpha tier?",
        answer: "These are elite strategies used by top-tier e-commerce brands to boost revenue and psychological urgency without breaking Shopify’s terms of service. From advanced cart triggers to \"hidden\" conversion boosters, these hacks give your agency an unfair advantage in the market.",
    },
    {
        question: "How often do you drop new banger components?",
        answer: "We keep the vault fresh. We drop new component heat every week based on the latest e-commerce trends and community requests. This ensures your agency always has access to the newest designs, keeping your portfolio ahead of the curve—no cap.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full bg-white pt-10 pb-4">
            <div className="w-full max-w-[800px] mx-auto px-8">
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <Collapsible
                                key={i}
                                open={isOpen}
                                onOpenChange={() => setOpenIndex(isOpen ? null : i)}
                                className={cn(
                                    "border border-gray-200 rounded-xl bg-white p-4 transition-all duration-200",
                                    isOpen ? "shadow-sm ring-1 ring-gray-200" : "hover:bg-gray-50/50"
                                )}
                            >
                                <CollapsibleTrigger className="w-full flex items-start justify-between text-left cursor-pointer group">
                                    <span className="text-[15px] font-semibold text-gray-900 leading-snug pr-4">
                                        {faq.question}
                                    </span>
                                    <div className="shrink-0 rounded-full h-6 w-6 bg-gray-200/50 border border-gray-200 flex items-center justify-center transition-colors group-hover:bg-gray-200">
                                        {isOpen ? (
                                            <Minus className="w-3 h-3 text-gray-600" />
                                        ) : (
                                            <Plus className="w-3 h-3 text-gray-600" />
                                        )}
                                    </div>
                                </CollapsibleTrigger>

                                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                    {/* Dashed Separator */}
                                    <div className="my-3 border-b border-dashed border-gray-300/60 w-8" />

                                    <p className="text-gray-600 leading-relaxed text-[14px]">
                                        {faq.answer}
                                    </p>
                                </CollapsibleContent>
                            </Collapsible>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
