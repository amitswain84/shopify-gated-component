"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "The Rookie Flex",
        price: "$0",
        period: "Forever (Free Sauce)",
        description: "Perfect for solo devs testing the drip with core banger sections. No cap, just pure vibes.",
        buttonText: "Start for free ->",
        buttonVariant: "outline",
        features: [
            "25+ essential high-drip snippets",
            "Liquid code, zero theme bloat",
            "Lightweight CSS, fast AF speed",
            "Mobile-first responsive vibes",
            "Unlimited local test environment",
            "SEO-ready Liquid foundations",
            "Instant copy-paste dev workflow",
            "Community wiki and dev support",
            "Ship custom looks for free",
            "Pro-grade production code",
            "100% compatible with any theme",
            "Scalable agency-ready blocks",
            "No code fatigue, just flex",
            "Optimized image lazy loading",
            "Basic banger UI components",
        ],
    },
    {
        name: "Agency Legend",
        price: "$199",
        period: "/ Yearly (Pro Drip)",
        description: "Scale your agency fast. Deliver $20k custom looks with high-drip sections.",
        buttonText: "Claim the Flex",
        buttonVariant: "default", // Dark button
        popular: false,
        features: [
            "350+ premium high-drip sections",
            "Weekly fresh component vault drops",
            "500+ store checklist for ROI",
            "Boost SEO, speed, and ranking",
            "God-tier UI snippets for clients",
            "Maximize sales with pro UX flows",
            "VIP Slack and email support",
            "Unlimited usage on client stores",
            "Advanced mega-menu Liquid blocks",
            "Zero bloat, pure speed code",
            "Commercial license for all builds",
            "Premium cart and drawer layouts",
            "High-converting product page grids",
            "Custom requests for new blocks",
            "Shopify 2.0 drag-and-drop ready"
        ],
    },
    {
        name: "God-Tier Alpha",
        price: "$399",
        period: "Once (Lifetime Access)",
        description: "Ultimate agency flex. Pay once, own the vault forever. Stop the monthly mid-theme tax.",
        buttonText: "Get Lifetime Access",
        buttonVariant: "default",
        popular: true,
        features: [
            "Unlimited access to every banger block",
            "500+ store checklist for max ROI",
            "100+ legal dark hacks for sales",
            "Boost SEO, speed, and sales growth",
            "Own every future component drop",
            "No recurring fees, pay once only",
            "White-label license for all clients",
            "Priority custom block request lane",
            "Full access to the private wiki",
            "Pro-level revenue boosting strategies",
            "Instant rank and conversion spikes",
            "Direct dev support for big builds",
            "100% theme control, zero limits",
            "Expert Shopify speed optimization hacks",
            "High-drip designs, maximum profit"
        ],
    },
];

export function PricingSection() {
    return (
        <section className="w-full bg-white border-b border-gray-200">
            <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
                {/* 
                   3 Cols, No Gap, Divide-x for borders between cards.
                */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex flex-col p-4 md:p-8 bg-white relative",
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
                                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                            </div>

                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-4xl font-semibold text-gray-900">{plan.price}</span>
                                <span className="text-gray-500 text-sm">{plan.period}</span>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 leading-relaxed min-h-[48px]">
                                {plan.description}
                            </p>

                            {i === 2 ? (
                                <div className="relative p-[1px] rounded-md overflow-hidden w-full mb-4 shadow-sm group">
                                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#ef4444_0deg,#eab308_120deg,#22c55e_240deg,#ef4444_360deg)] animate-[spin_3s_linear_infinite] opacity-100 block" />
                                    <Button
                                        className="relative w-full h-10 text-sm font-medium transition-all bg-black text-white hover:bg-black/90 border-none rounded-[5px]"
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    variant={plan.buttonVariant as "default" | "outline"}
                                    className={cn(
                                        "w-full mb-4 h-10 text-sm font-medium transition-all shadow-sm",
                                        // Tier 1 (i=0): White btn, Black text, light border. Force text black on hover.
                                        i === 0 && "bg-white text-black border border-gray-200 hover:bg-gray-50 hover:text-black",
                                        // Tier 2 (i=1): Dark btn, White text, light border
                                        i === 1 && "bg-zinc-900 text-white border border-gray-200 hover:bg-zinc-800"
                                    )}
                                >
                                    {plan.buttonText}
                                </Button>
                            )}

                            <div className="flex flex-col gap-2 mt-auto">
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
