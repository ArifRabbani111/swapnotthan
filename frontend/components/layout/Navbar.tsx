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
            {/* Main navbar container - responsive height and padding */}
            <div className="w-full px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex h-14 xs:h-16 sm:h-18 md:h-20 items-center justify-between gap-2 xs:gap-3 sm:gap-4">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-2 xs:gap-2.5 min-w-0">
                        <Link href="/" className="flex items-center gap-2 xs:gap-2.5 flex-shrink-0">
                            <div className="relative h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 flex-shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Swapnotthan Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-primary italic hidden xs:block whitespace-nowrap">
                                Swapnotthan
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - hidden on tablets and below */}
                    <nav className="hidden lg:flex flex-1 justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 px-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs xs:text-sm sm:text-base font-medium transition-colors hover:text-primary whitespace-nowrap"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side: Phone button and Mobile menu button */}
                    <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 ml-auto">
                        {/* Phone button - responsive sizing */}
                        <Button
                            className="h-8 xs:h-9 sm:h-10 rounded-full bg-red-600 px-2 xs:px-2.5 sm:px-3 md:px-4 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.9)] animate-pulse whitespace-nowrap hover:shadow-[0_0_30px_rgba(220,38,38,1.0)] transition-all flex-shrink-0"
                            asChild
                        >
                            <Link href="tel:01612007207" aria-label="Blood Hotline 01612007207">
                                <Phone className="mr-0.5 xs:mr-1 sm:mr-1.5 md:mr-2 h-3 xs:h-3.5 sm:h-4 md:h-5 w-3 xs:w-3.5 sm:w-4 md:w-5" />
                                <span className="sm:hidden">01612007207</span>
                                <span className="hidden sm:inline">Blood Hotline: 01612007207</span>
                            </Link>
                        </Button>

                        {/* Mobile/Tablet menu button - visible below lg breakpoint */}
                        <button
                            className="lg:hidden h-8 xs:h-9 sm:h-10 w-8 xs:w-9 sm:w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
                            ) : (
                                <Menu className="h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet menu dropdown - responsive sizing */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-1 px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 text-xs xs:text-sm sm:text-base font-medium rounded-lg transition-colors hover:bg-muted hover:text-primary"
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
