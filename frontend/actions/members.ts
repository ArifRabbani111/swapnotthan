"use server";

import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
    try {
        return await db.query.teamMembers.findMany({
            with: {
                wing: true,
            },
            orderBy: (teamMembers, { desc }) => [desc(teamMembers.createdAt)],
        });
    } catch (error) {
        if (process.env.DATABASE_URL) console.error("Database error fetching team members:", error);
        return [];
    }
}

export async function createTeamMember(data: typeof teamMembers.$inferInsert) {
    const result = await db.insert(teamMembers).values(data).returning();
    revalidatePath("/members");
    revalidatePath("/dashboard/members");
    return result[0];
}

export async function updateTeamMember(id: string, data: Partial<typeof teamMembers.$inferInsert>) {
    const result = await db
        .update(teamMembers)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(teamMembers.id, id))
        .returning();
    revalidatePath("/members");
    revalidatePath("/dashboard/members");
    return result[0];
}

export async function deleteTeamMember(id: string) {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    revalidatePath("/members");
    revalidatePath("/dashboard/members");
}
