"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        price: "€89",
        period: "per month",
        description: "For growing startups that are starting to track and grow their AI search visibility.",
        buttonText: "Start for free ->",
        buttonVariant: "outline",
        features: [
            "Access to ChatGPT, Perplexity, and AIO",
            "Track up to 25 prompts",
            "Prompts run across models on a daily interval",
            "Up to 2250 AI answers analyzed per month",
            "Unlimited countries",
            "Unlimited seats",
            "Email Support",
        ],
    },
    {
        name: "Pro",
        price: "€199",
        period: "per month",
        description: "For agile SMEs wanting deeper insights into their AI search efforts and faster growth.",
        buttonText: "Start for free ->",
        buttonVariant: "default", // Dark button
        popular: true,
        features: [
            "Access to ChatGPT, Perplexity, and AIO",
            "Track up to 100 prompts",
            "Prompts run across models on a daily interval",
            "Up to 9000 AI answers analyzed per month",
            "Unlimited countries",
            "Unlimited seats",
            "Email + Slack Support",
        ],
    },
    {
        name: "Enterprise",
        price: "€499+",
        period: "per month",
        description: "For enterprises needing advanced tracking and custom reporting.",
        buttonText: "Request Personalized Demo ->",
        buttonVariant: "outline",
        features: [
            "Access to ChatGPT, Perplexity, and AIO",
            "Track 300+ prompts",
            "Prompts run across models on a daily interval",
            "27000+ AI answers analyzed per month",
            "Unlimited countries",
            "Unlimited seats",
            "Dedicated Account Rep",
        ],
    },
];

export function PricingSection() {
    return (
        <section className="w-full bg-white border-b border-gray-200">
            <div className="w-full max-w-[1200px] mx-auto px-8">
                {/* 
                   3 Cols, No Gap, Divide-x for borders between cards.
                */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex flex-col p-8 bg-white relative",
                                // Remove hover effect to keep it clean if borders are gone, or keep it? User didn't say remove hover.
                                // But "fix the grids... remove... border line" implies a very specific look.
                                // I'll keep the hover but ensure no borders are added.
                                "hover:bg-gray-50/50 transition-colors"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-4 sm:right-8">
                                    <div className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-b-md rounded-t-none shadow-sm flex items-center justify-center">
                                        <span>
                                            Most Popular
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-4 mt-2">
                                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                            </div>

                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-4xl font-semibold text-gray-900">{plan.price}</span>
                                <span className="text-gray-500 text-sm">{plan.period}</span>
                            </div>

                            <p className="text-gray-500 text-sm mb-8 leading-relaxed min-h-[48px]">
                                {plan.description}
                            </p>

                            <Button
                                variant={plan.buttonVariant as "default" | "outline"}
                                className={cn(
                                    // Reduced height (h-10) and padding
                                    "w-full mb-8 h-10 text-sm font-medium transition-all shadow-sm",
                                    plan.buttonVariant === "outline"
                                        ? "border-gray-200 text-gray-900 hover:bg-gray-100 hover:border-gray-300"
                                        : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md"
                                )}
                            >
                                {plan.buttonText}
                            </Button>

                            <div className="flex flex-col gap-4 mt-auto">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                        <Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                                        <span className="leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
