"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BarChart2, Link2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroDub() {
    const [activeTab, setActiveTab] = React.useState("short-links");

    return (
        <section className="relative w-full overflow-hidden bg-white pt-16 md:pt-24 lg:pt-32 pb-24">
            {/* Background Grid - Very subtle */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">

                {/* Announcement Pill */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <a href="#" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50">
                        Celebrating $10M partner payouts on Dub
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                    </a>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl md:text-7xl"
                >
                    Turn clicks into <br className="hidden md:block" />
                    <span className="text-black">revenue</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10 max-w-2xl text-lg text-gray-600 md:text-xl leading-relaxed"
                >
                    Dub is the modern link attribution platform for short links, conversion tracking, and affiliate programs.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20"
                >
                    <Button className="h-12 rounded-lg bg-black px-8 text-base font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-900">
                        Start for free
                    </Button>
                    <Button variant="outline" className="h-12 rounded-lg border-gray-200 px-8 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                        Get a demo
                    </Button>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <TabButton
                        active={activeTab === "short-links"}
                        onClick={() => setActiveTab("short-links")}
                        icon={<div className="flex h-6 w-6 items-center justify-center rounded bg-orange-100 text-orange-600"><Link2 className="h-3.5 w-3.5" /></div>}
                        label="Short Links"
                    />
                    <TabButton
                        active={activeTab === "conversion"}
                        onClick={() => setActiveTab("conversion")}
                        icon={<div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 text-green-600"><BarChart2 className="h-3.5 w-3.5" /></div>}
                        label="Conversion Analytics"
                    />
                    <TabButton
                        active={activeTab === "affiliate"}
                        onClick={() => setActiveTab("affiliate")}
                        icon={<div className="flex h-6 w-6 items-center justify-center rounded bg-purple-100 text-purple-600"><Users className="h-3.5 w-3.5" /></div>}
                        label="Affiliate Programs"
                    />
                </motion.div>

                {/* Dashboard Preview mock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="relative w-full max-w-6xl rounded-xl border border-gray-200 bg-gray-50/50 p-2 sm:p-4 shadow-2xl"
                >
                    <div className="overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm aspect-[16/9] relative">
                        {/* Mock Content - Header */}
                        <div className="absolute top-0 left-0 right-0 h-14 border-b border-gray-100 flex items-center px-6 gap-8 bg-white z-10">
                            <div className="flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                                <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                            </div>
                            <div className="flex gap-6 text-xs font-medium text-gray-400">
                                <span className="text-gray-900 bg-gray-100 px-2 py-1 rounded">Overview</span>
                                <span>Events</span>
                                <span>Settings</span>
                            </div>
                        </div>

                        {/* Mock Content - Body */}
                        <div className="absolute top-14 inset-0 bg-gray-50 p-6 flex gap-6">
                            {/* Sidebar */}
                            <div className="w-48 hidden md:flex flex-col gap-4">
                                <div className="h-8 w-full bg-white border border-gray-100 rounded"></div>
                                <div className="h-8 w-3/4 bg-white border border-gray-100 rounded"></div>
                                <div className="h-8 w-5/6 bg-white border border-gray-100 rounded"></div>
                                <div className="mt-auto h-32 w-full bg-white border border-gray-100 rounded p-3">
                                    <div className="h-2 w-1/3 bg-gray-100 rounded mb-2"></div>
                                    <div className="h-2 w-2/3 bg-gray-100 rounded mb-1"></div>
                                    <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                            {/* Main Chart Area */}
                            <div className="flex-1 bg-white border border-gray-100 rounded-lg p-6 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
                                        <div className="text-3xl font-bold tracking-tight text-gray-900">$12,450.00</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-8 w-20 bg-gray-50 rounded border border-gray-100"></div>
                                        <div className="h-8 w-20 bg-black rounded text-white text-xs flex items-center justify-center">Export</div>
                                    </div>
                                </div>
                                {/* Chart Bars */}
                                <div className="flex-1 flex items-end gap-2 justify-between px-2 pb-2">
                                    {[40, 65, 45, 80, 55, 70, 48, 85, 60, 75, 50, 90, 65, 55, 80].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: 0.8 + (i * 0.05) }}
                                            className="w-full bg-gray-900/5 hover:bg-gray-900/10 rounded-t-sm transition-colors relative group"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                ${h * 100}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* X-Axis */}
                                <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                                    <span>Jan 1</span>
                                    <span>Jan 8</span>
                                    <span>Jan 15</span>
                                    <span>Jan 22</span>
                                    <span>Jan 29</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300",
                active
                    ? "border-gray-300 bg-white shadow-sm ring-1 ring-black/5"
                    : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
        >
            {icon}
            <span className={cn("text-sm font-medium", active ? "text-gray-900" : "text-gray-600")}>
                {label}
            </span>
        </button>
    )
}
