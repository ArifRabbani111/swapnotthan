"use server";

import { db } from "@/db";
import { gallery } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getGalleryItems() {
    try {
        return await db.query.gallery.findMany({
            orderBy: (gallery, { desc }) => [desc(gallery.createdAt)],
        });
    } catch (error) {
        if (process.env.DATABASE_URL) console.error("Database error fetching gallery items:", error);
        return [];
    }
}

export async function createGalleryItem(data: typeof gallery.$inferInsert) {
    try {
        const result = await db.insert(gallery).values(data).returning();
        revalidatePath("/gallery");
        revalidatePath("/dashboard/gallery");
        return result[0];
    } catch (error) {
        console.error("Error creating gallery item:", error);
        throw new Error("Failed to create gallery item");
    }
}

export async function deleteGalleryItem(id: string) {
    try {
        await db.delete(gallery).where(eq(gallery.id, id));
        revalidatePath("/gallery");
        revalidatePath("/dashboard/gallery");
    } catch (error) {
        console.error("Error deleting gallery item:", error);
        throw new Error("Failed to delete gallery item");
    }
}
