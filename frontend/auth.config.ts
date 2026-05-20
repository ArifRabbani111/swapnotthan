import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Required by Auth.js in middleware and API. Set before any NextAuth() call so middleware bundle has it.
if (!process.env.AUTH_SECRET) {
    process.env.AUTH_SECRET = "dev-secret-change-in-production-min-32-chars";
}

export const authConfig = {
    providers: [Google],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");
            const isLoginPage = nextUrl.pathname.startsWith("/login");

            if (isDashboardPage && !isLoggedIn) {
                return Response.redirect(new URL("/login", nextUrl));
            }

            if (isLoginPage && isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            return true;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            // If we want role in JWT, we need to fetch it from DB once, 
            // but JWT callback runs on the edge/client too. 
            // Usually role is better handled via database session if using adapter.
            return token;
        },
    },
} satisfies NextAuthConfig;
