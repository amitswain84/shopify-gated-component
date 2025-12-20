'use client';

import React from 'react';
import Link from 'next/link';
import {
    Search,
    ChevronDown,
    Atom,
    MoveRight,
    Component,
    Cuboid,
    LayoutTemplate,
    FileImage,
    Command,
    X,
    GithubIcon,
    DiscIcon,
    Share2,
    Plus,
    Copy,
    Layout
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard shadcn utils exist, if not I'll standard imports
import { Button } from '@/components/ui/button'; // Assuming standard shadcn button
// If specific UI components don't exist, I'll use raw tailwind or standard elements.
// To be safe I will use raw elements where possible or standard html to minimize deps.

export function HeroLanding() {
    return (
        <div className="min-h-screen bg-white relative font-sans selection:bg-orange-100 selection:text-orange-900">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>

            {/* Top Banner */}
            <div className="w-full bg-[#1A1A1A] text-white text-xs py-2.5 text-center flex items-center justify-center gap-2">
                <span>🚀 Built faster websites with <span className="font-semibold text-white">AlignUI PRO</span> components!</span>
                <span className="text-gray-400">·</span>
                <a href="#" className="underline decoration-gray-500 underline-offset-2 hover:text-gray-200">Learn more</a>
            </div>

            {/* Floating Navbar */}
            <div className="sticky top-6 z-50 flex justify-center px-4 mt-6">
                <nav className="flex items-center gap-2 p-1.5 pl-3 bg-white/80 backdrop-blur-md border border-black/5 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] w-full max-w-4xl justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-[#FF4F18] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                <span className="translate-y-[-1px] translate-x-[-1px]">a</span>
                            </div>
                            <span className="px-1.5 py-0.5 rounded-md bg-gray-100 text-[10px] font-medium text-gray-600 border border-gray-200/50">v1.0</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-5 text-[13px] font-medium text-gray-600">
                            <button className="flex items-center gap-1 hover:text-[#FF4F18] transition-colors">Products <ChevronDown className="w-3.5 h-3.5 opacity-50" /></button>
                            <Link href="#" className="hover:text-[#FF4F18] transition-colors">Docs</Link>
                            <Link href="#" className="hover:text-[#FF4F18] transition-colors">Roadmap</Link>
                            <button className="flex items-center gap-1 hover:text-[#FF4F18] transition-colors">Resources <ChevronDown className="w-3.5 h-3.5 opacity-50" /></button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 w-48 transition-all hover:bg-gray-100/80 hover:border-gray-200">
                            <Search className="w-3.5 h-3.5" />
                            <span className="text-[13px] flex-1">Quick search...</span>
                            <div className="flex items-center gap-0.5 px-1 rounded border border-gray-200 bg-white shadow-sm">
                                <Command className="w-2.5 h-2.5" />
                                <span className="text-[10px]">K</span>
                            </div>
                        </div>

                        <div className="h-4 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-4 h-4" /> {/* Using X as placeholder if needed, normally wouldn't be here but following layout spacing */}
                        </button>
                        <div className="flex items-center gap-1">
                            <a href="#" className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                                <GithubIcon className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#5865F2] transition-colors">
                                <DiscIcon className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </nav>
            </div>

            <main className="container mx-auto px-4 pt-12 pb-20 flex flex-col items-center">

                {/* Figma Pill */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <a href="#" className="group flex items-center gap-2 px-1 pl-1 py-1 pr-3 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md transition-all hover:border-gray-200">
                        <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-100 flex items-center gap-1.5">
                            <FileImage className="w-3.5 h-3.5 text-orange-600" /> {/* Figma-ish icon */}
                            <span className="text-[11px] font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">New</span>
                        </div>
                        <span className="text-[13px] text-gray-600">Up-to-date Figma file synced with code library!</span>
                        <span className="text-[13px] text-gray-400 group-hover:text-gray-900 transition-colors ml-1">·</span>
                        <span className="text-[13px] font-medium text-gray-900 flex items-center gap-0.5 group-hover:gap-1 transition-all">
                            Preview <ChevronDown className="w-3 h-3 -rotate-90" />
                        </span>
                    </a>
                </div>

                {/* Hero Content */}
                <div className="text-center max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    {/* Trusted Users Pill */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img src={`https://placehold.co/100x100/e2e8f0/64748b?text=U${i}`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            Trusted by <span className="font-semibold text-gray-900">1,500+</span> Figma users for seamless design!
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-[#1A1A1A] leading-[1.1]">
                        Design & Development <br />
                        <span className="relative inline-block">
                            perfectly aligned
                            <span className="absolute -right-1 top-2 bottom-2 w-1 bg-[#FF4F18] animate-pulse"></span>
                        </span>
                    </h1>

                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        Flexible components, consistent UI, quick development, easy integration.
                    </p>

                    <div className="flex items-center justify-center gap-6 pt-2 pb-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Atom className="w-4 h-4 text-[#61DAFB]" />
                            <span>Built for <span className="font-semibold text-gray-900">React</span></span>
                        </div>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span className="text-[#38BDF8] font-bold">~</span>
                            <span>Styled with <span className="font-semibold text-gray-900">TailwindCSS</span></span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button className="h-12 px-8 rounded-full bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center gap-2 group">
                            Get Started <span className="text-white/40 font-normal ml-1">· It's free</span>
                            <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="w-full max-w-6xl mx-auto mt-24 mb-20 relative">
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent"></div> {/* Red line accent */}
                    <div className="absolute -top-1 left-1/4 h-2 w-px bg-gray-100"></div>
                    <div className="absolute -top-1 right-1/4 h-2 w-px bg-gray-100"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-transparent">
                        {[
                            { title: "Base Components", badge: "FREE", desc: "40+ open-source components available", icon: <Layout className="w-5 h-5 text-white" />, iconBg: "bg-[#FF4F18]" },
                            { title: "Components & Blocks", badge: "PRO", desc: "100+ ready-made components for speed", icon: <Cuboid className="w-5 h-5 text-gray-600" />, iconBg: "bg-gray-100" },
                            { title: "Sectoral Templates", badge: "PRO", desc: "Designs for various sectoral needs", icon: <LayoutTemplate className="w-5 h-5 text-gray-600" />, iconBg: "bg-gray-100" },
                            { title: "Aligned with Figma", badge: "PRO", desc: "Always-updated Figma file library", icon: <FileImage className="w-5 h-5 text-gray-600" />, iconBg: "bg-gray-100" },
                        ].map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-8 group hover:bg-white/50 transition-colors border-r border-dashed border-gray-100 last:border-r-0">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm", feature.iconBg)}>
                                    {feature.icon}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-sm text-gray-900">{feature.title}</h3>
                                    <span className={cn("text-[10px] font-bold px-1 py-0.5 rounded border", feature.badge === 'FREE' ? "bg-gray-100 text-gray-500 border-gray-200" : "bg-orange-50 text-orange-600 border-orange-100")}>{feature.badge}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="w-full max-w-6xl mx-auto relative rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    {/* Window Controls */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            <span className="text-[11px] font-medium text-gray-400">alignui.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <Share2 className="w-3.5 h-3.5" />
                            <Plus className="w-3.5 h-3.5" />
                            <Copy className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Editor Interface */}
                    <div className="flex h-[500px]">
                        {/* Sidebar */}
                        <div className="w-64 border-r border-gray-100 bg-gray-50/30 flex flex-col text-[13px]">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-100/50">
                                <div className="w-4 h-4 rounded bg-gray-200"></div>
                                <span className="font-medium text-gray-600">alignui-library</span>
                                <span className="text-[10px] bg-gray-200 px-1 rounded text-gray-500 ml-auto">v1.0</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-600 border-b border-gray-100 bg-white">
                                <span className="font-medium">button.tsx</span>
                            </div>
                            <div className="p-2 space-y-0.5">
                                <div className="px-3 py-1.5 flex items-center justify-between text-gray-600 font-medium">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 border border-gray-400 rounded-sm"></div> actions</span>
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                                <div className="pl-6 space-y-1">
                                    <div className="px-2 py-1.5 rounded-md bg-orange-50 text-orange-700 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-current rotate-45 rounded-[1px]"></div>
                                        button.tsx
                                    </div>
                                    {['button-group.tsx', 'compact-button.tsx', 'fancy-button.tsx', 'link-button.tsx', 'social-button.tsx'].map(files => (
                                        <div key={files} className="px-2 py-1.5 rounded-md text-gray-400 flex items-center gap-2">
                                            <div className="w-3 h-3 border border-current rotate-45 rounded-[1px]"></div>
                                            {files}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Code Area */}
                        <div className="flex-1 bg-white p-6 relative">
                            <pre className="font-mono text-[13px] leading-6">
                                <code className="block">
                                    <span className="text-purple-600">import</span> * <span className="text-purple-600">as</span> Button <span className="text-purple-600">from</span> <span className="text-green-600">'./components/button'</span>;<br />
                                    <span className="text-purple-600">import</span> {'{'}<br />
                                    {'  '}RiArrowLeftSLine,<br />
                                    {'  '}RiArrowRightSLine<br />
                                    {'}'} <span className="text-purple-600">from</span> <span className="text-green-600">'@remixicon/react'</span>;<br />
                                    <br />
                                    <span className="text-purple-600">export default function</span> <span className="text-blue-600">App</span>() {'{'}<br />
                                    {'  '}<span className="text-purple-600">return</span> (<br />
                                    {'    '}<span className="text-gray-400">&lt;</span><span className="text-red-500">div</span> <span className="text-yellow-600">className</span>=<span className="text-green-600">"flex min-h-screen flex-col items-center"</span><span className="text-gray-400">&gt;</span><br />
                                    {'      '}<span className="text-gray-400">&lt;</span>Button.Root <span className="text-yellow-600">variant</span>=<span className="text-green-600">"primary"</span> <span className="text-yellow-600">mode</span>=<span className="text-green-600">"filled"</span><span className="text-gray-400">&gt;</span><br />
                                    {'        '}<span className="text-gray-400">&lt;</span>Button.Icon <span className="text-yellow-600">as</span>={'{'}<span className="text-blue-500">RiArrowLeftSLine</span>{'}'} <span className="text-gray-400">/&gt;</span><br />
                                    {'        '}Learn More<br />
                                    {'      '}<span className="text-gray-400">&lt;/</span>Button.Root<span className="text-gray-400">&gt;</span><br />
                                </code>
                            </pre>

                            {/* Gradient Overlay & CTA */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col items-center justify-end pb-12">
                                <div className="w-16 h-16 rounded-full bg-white border border-orange-100 shadow-md flex items-center justify-center mb-4 text-[#FF4F18] hover:scale-110 transition-transform cursor-pointer">
                                    <span className="font-mono text-2xl font-bold">{'{ }'}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">Try live editor</h3>
                                <p className="text-gray-500 text-sm mb-6">Click on the button to use the code editor</p>
                                <Button className="h-10 px-6 rounded-full bg-[#1A1A1A] hover:bg-black text-white text-xs font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5">
                                    Try live <ChevronDown className="w-3 h-3 -rotate-90" />
                                </Button>
                            </div>
                        </div>

                        {/* Preview Area (Right) */}
                        <div className="w-1/3 border-l border-gray-100 bg-gray-50/20 p-6 flex flex-col">
                            <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-t-[6px] border-t-gray-400 border-r-[4px] border-r-transparent rotate-[-90deg]"></div>
                                preview
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
