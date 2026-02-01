"use client"; // Note: This will be imported in client components, but the 'sign' functions are server-side in NextAuth v5? 
// Actually, it's better to use 'use server' in a separate file for the actual logic if needed, but NextAuth handlers work too.

import { signIn, signOut } from "next-auth/react";

export const loginWithGoogle = () => signIn("google", { callbackUrl: "/dashboard" });
export const logout = () => signOut({ callbackUrl: "/" });
