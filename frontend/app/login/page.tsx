"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Chrome, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) {
            toast.error("Firebase is not configured. Add env vars — see FIREBASE_SETUP.md");
            return;
        }
        setIsLoading(true);
        try {
            if (isSignUp) {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                if (name.trim()) {
                    await updateProfile(cred.user, { displayName: name.trim() });
                }
                toast.success("Account created. Redirecting...");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success("Signed in.");
            }
            router.push("/dashboard");
            router.refresh();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Login failed";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (!auth) {
            toast.error("Firebase is not configured. Add env vars — see FIREBASE_SETUP.md");
            return;
        }
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            toast.success("Signed in with Google.");
            router.push("/dashboard");
            router.refresh();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Google sign-in failed";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md shadow-xl border-none">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold italic text-primary">Swapnotthan</CardTitle>
                    <CardDescription>
                        {isSignUp ? "Create an account to access the admin panel" : "Sign in to access the admin panel"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        {isSignUp && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                {!isSignUp && (
                                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder={isSignUp ? "Min 6 characters" : undefined}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {isSignUp ? "Create account" : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Chrome className="mr-2 h-4 w-4" />
                        )}
                        Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center flex-col gap-4">
                    <button
                        type="button"
                        onClick={() => setIsSignUp((v) => !v)}
                        className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                        {isSignUp ? "Already have an account? Sign in" : "No account? Create one"}
                    </button>
                    <p className="text-sm text-muted-foreground">
                        Not an admin? <Link href="/" className="text-primary hover:underline">Go back home</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
