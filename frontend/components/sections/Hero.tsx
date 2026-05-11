"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero({ backgroundImage }: { backgroundImage?: string | null }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const bgImage = backgroundImage || '/hero-bg.png';

    return (
        <section className="relative w-full min-h-[560px] md:h-[600px] overflow-hidden bg-muted flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                    backgroundImage: mounted ? `url(${bgImage})` : 'none',
                }}
            />
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 md:from-black/40 md:to-transparent" />

            <div className="container relative z-10 px-4 text-center space-y-5">
                <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                    Let&apos;s begin with <span className="italic text-accent">volunteers</span>
                </h1>
                <p className="max-w-[700px] mx-auto text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md">
                    Join Swapnotthan, A voluntary organization of SUST for disadvantaged children.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                    <Button asChild size="lg" className="rounded-full px-8 sm:px-10 h-11 sm:h-12 text-base sm:text-lg bg-primary hover:bg-primary/90">
                        <Link href="/volunteer">Join Us</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-8 sm:px-10 h-11 sm:h-12 text-base sm:text-lg bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-sm">
                        <Link href="/about">Learn More</Link>
                    </Button>
                </div>
            </div>

            {/* Hero Dots */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
            </div>
        </section>
    );
}
