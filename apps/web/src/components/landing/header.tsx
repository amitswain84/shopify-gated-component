"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#testimonials", label: "Testimonials" },
        { href: "#pricing", label: "Pricing" },
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <header className="fixed top-0 z-[100] w-full bg-white border-b border-gray-200">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-transparent">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-black">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-black"
                        >
                            <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M6 12h12" stroke="currentColor" strokeWidth="2" />
                            <path d="M6 6v12" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span className="font-bold tracking-tight font-inter">Peec AI</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="hover:text-black transition-colors font-inter">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link href="/sign-in" className="hidden md:block">
                        <Button variant="ghost" size="sm" className="font-medium text-gray-700 hover:text-black hover:bg-transparent h-9 px-4 font-inter">
                            Log in
                        </Button>
                    </Link>
                    <Link href="#" className="hidden md:block">
                        <Button size="sm" className="font-medium bg-black text-white hover:bg-black/90 rounded-md px-4 h-9 font-inter">
                            Get unlimited access
                        </Button>
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden h-9 w-9 text-black hover:bg-gray-100/50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Custom Dropdown Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white border-b border-gray-200 overflow-hidden relative z-[101]"
                    >
                        <div className="flex flex-col p-4 gap-4 max-w-[1200px] mx-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-base font-medium text-gray-700 hover:text-black transition-colors flex items-center justify-between font-inter py-2 border-b border-gray-50 last:border-0"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                    <ChevronDown className="-rotate-90 text-gray-400 h-4 w-4" />
                                </Link>
                            ))}
                            {/* Changed from grid to flex-col for full width buttons */}
                            <div className="flex flex-col gap-3 mt-2">
                                <Link href="/sign-in" className="w-full">
                                    <Button variant="outline" className="w-full justify-center font-medium border-gray-200 text-black font-inter h-10">Log in</Button>
                                </Link>
                                <Button className="w-full bg-black text-white rounded-md font-inter h-10">Get unlimited access</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}
