"use server";

import { db } from "@/db";
import { volunteers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createVolunteerApplication(data: typeof volunteers.$inferInsert) {
    try {
        const result = await db.insert(volunteers).values({
            ...data,
            status: "pending",
        }).returning();
        revalidatePath("/dashboard/volunteers");
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error creating volunteer application:", error);
        return { success: false, error: "Failed to submit application" };
    }
}

export async function getVolunteers() {
    try {
        return await db.query.volunteers.findMany({
            orderBy: (volunteers, { desc }) => [desc(volunteers.createdAt)],
        });
    } catch (error) {
        if (process.env.DATABASE_URL) console.error("Database error fetching volunteers:", error);
        return [];
    }
}

export async function updateVolunteerStatus(id: string, status: string) {
    try {
        const result = await db
            .update(volunteers)
            .set({ status, updatedAt: new Date() })
            .where(eq(volunteers.id, id))
            .returning();
        revalidatePath("/dashboard/volunteers");
        return result[0];
    } catch (error) {
        console.error("Error updating volunteer status:", error);
        throw new Error("Failed to update volunteer status");
    }
}

export async function deleteVolunteer(id: string) {
    try {
        await db.delete(volunteers).where(eq(volunteers.id, id));
        revalidatePath("/dashboard/volunteers");
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        throw new Error("Failed to delete volunteer");
    }
}
