"use server";

import { db } from "@/db";
import { wings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getWings() {
    try {
        return await db.query.wings.findMany({
            orderBy: (wings, { desc }) => [desc(wings.createdAt)],
        });
    } catch (error) {
        if (process.env.DATABASE_URL) console.error("Database error fetching wings:", error);
        return [];
    }
}

export async function createWing(data: typeof wings.$inferInsert) {
    const result = await db.insert(wings).values(data).returning();
    revalidatePath("/dashboard/wings");
    return result[0];
}

export async function updateWing(id: string, data: Partial<typeof wings.$inferInsert>) {
    const result = await db
        .update(wings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(wings.id, id))
        .returning();
    revalidatePath("/dashboard/wings");
    return result[0];
}

export async function deleteWing(id: string) {
    await db.delete(wings).where(eq(wings.id, id));
    revalidatePath("/dashboard/wings");
}
