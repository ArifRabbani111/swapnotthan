"use server";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSiteSettings(): Promise<{ id: string; heroBackgroundImageUrl: string | null; updatedAt: Date } | null> {
    if (!process.env.DATABASE_URL) return null;
    return Promise.resolve()
        .then(async () => {
            const settings = await db.query.siteSettings.findFirst({
                where: eq(siteSettings.id, "hero"),
            });
            return settings ?? null;
        })
        .catch(() => null);
}

export async function updateHeroBackground(imageUrl: string) {
    try {
        const existing = await getSiteSettings();
        let result;
        if (existing) {
            result = await db
                .update(siteSettings)
                .set({ heroBackgroundImageUrl: imageUrl, updatedAt: new Date() })
                .where(eq(siteSettings.id, "hero"))
                .returning();
        } else {
            result = await db
                .insert(siteSettings)
                .values({
                    id: "hero",
                    heroBackgroundImageUrl: imageUrl,
                })
                .returning();
        }
        revalidatePath("/");
        revalidatePath("/dashboard/settings");
        return result[0];
    } catch (error) {
        console.error("Error updating hero background:", error);
        throw new Error("Failed to update hero background");
    }
}
