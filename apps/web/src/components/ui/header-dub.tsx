"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navItems = [
    { name: "Product", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Enterprise", href: "#" },
    { name: "Customers", href: "#" },
    { name: "Pricing", href: "#" },
];

export function HeaderDub() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-transparent transition-all">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight text-black">dub</span>
                </Link>

                {/* Desktop Nav */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="gap-1">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.name}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-transparent text-[15px] font-medium text-gray-600 hover:bg-transparent hover:text-black data-[active]:bg-transparent data-[state=open]:bg-transparent"
                                        )}
                                    >
                                        {item.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Button variant="ghost" className="text-[15px] font-medium text-gray-600 hover:bg-gray-100 hover:text-black h-10 px-4">
                        Log in
                    </Button>
                    <Button className="h-10 rounded-full bg-black px-6 text-[15px] font-medium text-white hover:bg-gray-800 transition-all hover:ring-4 hover:ring-gray-200">
                        Sign up
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-white border-b lg:hidden animate-in slide-in-from-top-5 duration-200">
                    <nav className="flex flex-col p-4 gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="py-3 text-lg font-medium text-gray-800 border-b border-gray-100 last:border-0"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-4 flex flex-col gap-3">
                            <Button variant="outline" className="w-full h-12 text-base">
                                Log in
                            </Button>
                            <Button className="w-full h-12 bg-black text-white text-base rounded-full">
                                Sign up
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
