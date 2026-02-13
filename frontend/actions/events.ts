"use server";

import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getEvents() {
    if (!process.env.DATABASE_URL) return [];
    try {
        return await db.query.events.findMany({
            orderBy: (events, { desc }) => [desc(events.createdAt)],
        });
    } catch {
        return [];
    }
}

export async function createEvent(data: typeof events.$inferInsert) {
    const result = await db.insert(events).values(data).returning();
    revalidatePath("/events");
    revalidatePath("/dashboard/events");
    return result[0];
}

export async function updateEvent(id: string, data: Partial<typeof events.$inferInsert>) {
    const result = await db
        .update(events)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(events.id, id))
        .returning();
    revalidatePath("/events");
    revalidatePath("/dashboard/events");
    return result[0];
}

export async function deleteEvent(id: string) {
    await db.delete(events).where(eq(events.id, id));
    revalidatePath("/events");
    revalidatePath("/dashboard/events");
}
