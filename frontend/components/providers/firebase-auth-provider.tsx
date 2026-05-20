"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";

type FirebaseAuthContextType = {
    user: User | null;
    loading: boolean;
};

const FirebaseAuthContext = createContext<FirebaseAuthContextType>({ user: null, loading: true });

export function useFirebaseAuth() {
    const context = useContext(FirebaseAuthContext);
    if (!context) {
        throw new Error("useFirebaseAuth must be used within FirebaseAuthProvider");
    }
    return context;
}

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Redirect: dashboard without user -> login; login with user -> dashboard
    useEffect(() => {
        if (loading) return;
        if (!auth) return;
        const isDashboard = pathname?.startsWith("/dashboard");
        const isLogin = pathname === "/login";
        if (isDashboard && !user) {
            router.replace("/login");
        } else if (isLogin && user) {
            router.replace("/dashboard");
        }
    }, [loading, user, pathname, router]);

    return (
        <FirebaseAuthContext.Provider value={{ user, loading }}>
            {children}
        </FirebaseAuthContext.Provider>
    );
}
