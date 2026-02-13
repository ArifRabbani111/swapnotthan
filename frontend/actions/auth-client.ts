"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export async function logout() {
    if (auth) {
        await signOut(auth);
    }
    window.location.href = "/";
}
