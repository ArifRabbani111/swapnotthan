import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { authConfig } from "./auth.config";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

// NextAuth requires AUTH_SECRET. Use a fallback if missing so build and dev work without .env.
if (!process.env.AUTH_SECRET) {
    process.env.AUTH_SECRET = "dev-secret-change-in-production-min-32-chars";
    if (process.env.NODE_ENV === "production") {
        console.warn("[auth] AUTH_SECRET not set in production. Set AUTH_SECRET in your deployment env.");
    }
}

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: hasDatabase ? DrizzleAdapter(db) : undefined,
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                if (hasDatabase) {
                    try {
                        const [user] = await db.select().from(users).where(eq(users.id, token.sub));
                        if (user && user.role != null) session.user.role = user.role;
                    } catch (error) {
                        console.error("Error fetching user role for session:", error);
                    }
                }
            }
            return session;
        },
    },
});
