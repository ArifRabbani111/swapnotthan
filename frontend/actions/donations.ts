"use server";

import { db } from "@/db";
import { donations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getDonations() {
    try {
        return await db.query.donations.findMany({
            with: {
                event: true,
            },
            orderBy: (donations, { desc }) => [desc(donations.createdAt)],
        });
    } catch (error) {
        if (process.env.DATABASE_URL) console.error("Database error fetching donations:", error);
        return [];
    }
}

export async function updateDonationStatus(id: string, status: string) {
    const result = await db
        .update(donations)
        .set({ status })
        .where(eq(donations.id, id))
        .returning();
    revalidatePath("/dashboard/donations");
    return result[0];
}

export async function deleteDonation(id: string) {
    await db.delete(donations).where(eq(donations.id, id));
    revalidatePath("/dashboard/donations");
}

export async function createDonation(data: typeof donations.$inferInsert) {
    try {
        const result = await db.insert(donations).values(data).returning();
        revalidatePath("/dashboard/donations");
        revalidatePath("/");
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error creating donation:", error);
        return { success: false, error: "Failed to process donation" };
    }
}
