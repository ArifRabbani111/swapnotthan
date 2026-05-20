"use server";

import { db } from "@/db";
import { latestNews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getNewsItems() {
    try {
        return await db.query.latestNews.findMany({
            orderBy: (news, { desc }) => [desc(news.createdAt)],
        });
    } catch (error) {
        if (process.env.DATABASE_URL) console.error("Database error fetching news items:", error);
        return [];
    }
}

export async function createNewsItem(data: typeof latestNews.$inferInsert) {
    try {
        const result = await db.insert(latestNews).values(data).returning();
        revalidatePath("/news");
        revalidatePath("/dashboard/news");
        return result[0];
    } catch (error) {
        console.error("Error creating news item:", error);
        throw new Error("Failed to create news item");
    }
}

export async function updateNewsItem(id: string, data: Partial<typeof latestNews.$inferInsert>) {
    try {
        const result = await db
            .update(latestNews)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(latestNews.id, id))
            .returning();
        revalidatePath("/news");
        revalidatePath("/dashboard/news");
        return result[0];
    } catch (error) {
        console.error("Error updating news item:", error);
        throw new Error("Failed to update news item");
    }
}

export async function deleteNewsItem(id: string) {
    try {
        await db.delete(latestNews).where(eq(latestNews.id, id));
        revalidatePath("/news");
        revalidatePath("/dashboard/news");
    } catch (error) {
        console.error("Error deleting news item:", error);
        throw new Error("Failed to delete news item");
    }
}
