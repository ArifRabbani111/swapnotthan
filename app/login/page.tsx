"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Chrome, Loader2 } from "lucide-react";
import Link from "next/link";
import { loginWithGoogle } from "@/actions/auth-client";
import { useState } from "react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md shadow-xl border-none">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold italic text-primary">Swapnotthan</CardTitle>
                    <CardDescription>Enter your credentials to access the admin panel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                        </div>
                        <Input id="password" type="password" />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">Sign In</Button>

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
                    <p className="text-sm text-muted-foreground">
                        Not an admin? <Link href="/" className="text-primary hover:underline">Go back home</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
