"use client";

import { Bot } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-white pt-10">
            <div className="w-full max-w-[1200px] mx-auto px-8 md:px-12">

                {/* Top Section: Logo/Desc + Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <Bot className="w-8 h-8 text-gray-900" />
                            <span className="text-xl font-bold text-gray-900 tracking-tight">Agenta</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Transcend human limitations. Augment your mind with neural enhancements.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-gray-900">Product</h4>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Voice Synthesis</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Neuralink</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Memory</Link>
                    </div>

                    {/* Links Column 2 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-gray-900">Company</h4>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">About Us</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Careers</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Blog</Link>
                    </div>

                    {/* Links Column 3 (New) */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-gray-900">Legal</h4>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Terms</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Privacy</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Cookies</Link>
                    </div>
                </div>

                {/* Bottom Bar - Reduced Padding, Bottom Border */}
                <div className="border-t border-b border-gray-100 py-4 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        © 2025 KOKONUT. All rights reserved.
                    </p>
                </div>
                {/* Spacer for visual balance if needed, or leave tight */}
                <div className="h-4" />

            </div>
        </footer>
    );
}
