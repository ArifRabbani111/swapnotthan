"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Meet our members", href: "/members" },
    { name: "Contact us", href: "/contact" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="relative h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
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

                <nav className="hidden md:flex md:ml-auto gap-6 lg:gap-10">
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

                <div className="flex items-center gap-3 md:gap-4">
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

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <nav className="container mx-auto flex flex-col gap-1 px-3 py-3 sm:px-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-muted hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
