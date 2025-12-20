'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';
import { SignInButton } from '@clerk/nextjs';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { X } from 'lucide-react';

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={cn('sticky top-0 z-50 w-full border-b border-transparent bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50', {
                'border-border': scrolled,
            })}
        >
            {/* Global Grid Lines for Box Look - Left/Right (Header) */}
            <div className="absolute inset-y-0 left-0 w-px bg-border/40 hidden md:block" />
            <div className="absolute inset-y-0 right-0 w-px bg-border/40 hidden md:block" />

            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="size-6 rounded-full bg-foreground" />
                    <span>Sonae</span>
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="gap-6">
                        {['Features', 'FAQ', 'Pricing', 'Blog'].map((item) => (
                            <NavigationMenuItem key={item}>
                                <NavigationMenuLink asChild>
                                    <a href={`#${item.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                        {item}
                                    </a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden items-center gap-4 md:flex">
                    <AnimatedThemeToggler />
                    <div className="h-4 w-px bg-border" />
                    <SignInButton>
                        <button className="text-sm font-medium hover:text-foreground/80 transition-colors">
                            Login
                        </button>
                    </SignInButton>
                    <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-9 px-5">
                        Get Started
                    </Button>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setOpen(true)}
                        className="z-50"
                    >
                        <MenuToggleIcon open={open} className="size-5" />
                    </Button>
                </div>
            </nav>
            <MobileMenu open={open} onClose={() => setOpen(false)} />
        </header>
    );
}

type MobileMenuProps = {
    open: boolean;
    onClose: () => void;
};

function MobileMenu({ open, onClose }: MobileMenuProps) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] bg-background animate-in fade-in slide-in-from-right-10 duration-200 flex flex-col">
            {/* Mobile Header Row */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-transparent">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="size-6 rounded-full bg-foreground" />
                    <span>Sonae</span>
                </div>
                <div className="flex items-center gap-2">
                    <AnimatedThemeToggler />
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="size-6" />
                    </Button>
                </div>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-8">
                {['Features', 'FAQ', 'Pricing', 'Blog'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-3xl font-medium tracking-tight hover:text-muted-foreground transition-colors" onClick={onClose}>
                        {item}
                    </a>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="p-8 flex items-center justify-end gap-6 mb-8">
                <SignInButton>
                    <button className="text-base font-medium hover:text-foreground/80 transition-colors">
                        Login
                    </button>
                </SignInButton>
                <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-md h-10 px-6 text-base font-medium">
                    Start Free
                </Button>
            </div>
        </div>,
        document.body,
    );
}
