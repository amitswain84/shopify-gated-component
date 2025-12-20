"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "How do AI agents work?",
        answer: "AI agents use advanced machine learning models to automate tasks. They observe, analyze, and take actions based on specific instructions and training data, adapting to changing conditions while working autonomously toward defined goals.",
    },
    {
        question: "Which AI models do you support?",
        answer: "We support a wide range of state-of-the-art AI models including GPT-4, Claude 3, and various open-source models like Llama 3 via our API integrations.",
    },
    {
        question: "Can I customize agents for my business?",
        answer: "Yes, our platform allows extensive customization. You can define specific roles, knowledge bases, and interaction protocols to tailor agents to your exact business needs.",
    },
    {
        question: "What kind of tasks can agents automate?",
        answer: "Agents can automate a variety of tasks such as data entry, customer support inquiries, scheduling, market research, and complex data analysis workflows.",
    },
    {
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. We also offer a free 30-minute onboarding call to get you up and running.",
    },
    {
        question: "How does billing work?",
        answer: "We bill monthly or annually, depending on your choice. Payments are processed securely via Stripe.",
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
