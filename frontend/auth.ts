import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { authConfig } from "./auth.config";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" }, // Use JWT to keep it simple and edge-friendly
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;

                // Fetch role from DB if not in token
                try {
                    const [user] = await db.select().from(users).where(eq(users.id, token.sub));
                    if (user) {
                        session.user.role = user.role;
                    }
                } catch (error) {
                    console.error("Error fetching user role for session:", error);
                }
            }
            return session;
        },
    },
});
