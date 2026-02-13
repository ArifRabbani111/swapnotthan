"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

export function SessionProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent "[object Event]" from unhandled promise rejections (e.g. session fetch / network)
    useEffect(() => {
        const handler = (event: PromiseRejectionEvent) => {
            const reason = event?.reason;
            const isEventLike = reason instanceof Event || (typeof reason === "object" && reason !== null && !(reason instanceof Error) && String(reason) === "[object Event]");
            if (isEventLike) {
                event.preventDefault();
                event.stopPropagation();
                console.warn("[Session] Auth session fetch failed or was aborted.");
            }
        };
        window.addEventListener("unhandledrejection", handler);
        return () => window.removeEventListener("unhandledrejection", handler);
    }, []);

    // Avoid hydration mismatch and let server render without session fetch
    if (!mounted) {
        return <>{children}</>;
    }

    return <NextAuthSessionProvider refetchOnWindowFocus={false}>{children}</NextAuthSessionProvider>;
}
