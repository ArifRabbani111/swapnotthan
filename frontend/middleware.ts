import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Dashboard protection is handled by FirebaseAuthProvider (client-side).
// Pass all requests through; no NextAuth middleware so Firebase login works.
export function middleware(_request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
