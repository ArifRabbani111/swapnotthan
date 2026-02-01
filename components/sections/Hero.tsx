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
        <section className="relative w-full h-[600px] overflow-hidden bg-muted flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                    backgroundImage: mounted ? `url(${bgImage})` : 'none',
                }}
            />
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 md:from-black/40 md:to-transparent" />

            <div className="container relative z-10 px-4 text-center space-y-6">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                    Empowering Communities <br /> through <span className="italic text-accent">Action</span>
                </h1>
                <p className="max-w-[700px] mx-auto text-lg md:text-xl text-white/90 drop-shadow-md">
                    Join Swapnotthan foundation in our mission to bring positive change and support to those who need it most.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button asChild size="lg" className="rounded-full px-10 h-12 text-lg bg-primary hover:bg-primary/90">
                        <Link href="/volunteer">Join Us</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-10 h-12 text-lg bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-sm">
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
