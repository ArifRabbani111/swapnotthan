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
            <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative h-16 w-16 md:h-20 md:w-20">
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
                    <Button className="rounded-full bg-primary hover:bg-primary/90" asChild>
                        <Link href="/contact">
                            <Phone className="mr-2 h-4 w-4" />
                            Contact
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
