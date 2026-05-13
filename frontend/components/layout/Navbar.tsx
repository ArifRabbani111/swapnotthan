"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Meet our members", href: "/members" },
    { name: "Contact us", href: "/contact" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative h-8 w-8 md:h-10 md:w-10">
                            <Image
                                src="/logo.png"
                                alt="Swapnotthan Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-primary italic hidden sm:block">Swapnotthan</span>
                    </Link>
                </div>

                <nav className="hidden md:ml-auto md:flex gap-6 lg:gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center md:ml-8">
                    <Button
                        className="h-9 rounded-full bg-red-600 px-2.5 text-[11px] text-white hover:bg-red-700 sm:h-10 sm:px-4 sm:text-sm shadow-[0_0_20px_rgba(220,38,38,0.9)] animate-pulse whitespace-nowrap hover:shadow-[0_0_30px_rgba(220,38,38,1.0)] transition-all"
                        asChild
                    >
                        <Link href="tel:01612007207" aria-label="Blood Hotline 01612007207">
                            <Phone className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="sm:hidden">01612007207</span>
                            <span className="hidden sm:inline">Blood Hotline: 01612007207</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
