"use server";

import { db } from "@/db";
import { events, teamMembers, donations, wings } from "@/db/schema";
import { count, sum } from "drizzle-orm";

export async function getDashboardStats() {
    try {
        const [
            eventsCount,
            membersCount,
            donationsSum,
            wingsCount
        ] = await Promise.all([
            db.select({ value: count() }).from(events),
            db.select({ value: count() }).from(teamMembers),
            db.select({ value: sum(donations.amount) }).from(donations),
            db.select({ value: count() }).from(wings),
        ]);

        return [
            { name: "Total Events", value: eventsCount[0].value.toString(), icon: "calendar", color: "text-blue-600" },
            { name: "Active Members", value: membersCount[0].value.toString(), icon: "users", color: "text-green-600" },
            { name: "Total Donations", value: `৳ ${donationsSum[0].value || 0}`, icon: "heart", color: "text-red-600" },
            { name: "Active Wings", value: wingsCount[0].value.toString(), icon: "layers", color: "text-purple-600" },
        ];
    } catch (error) {
        console.error("Database error fetching dashboard stats:", error);
        return [
            { name: "Total Events", value: "0", icon: "calendar", color: "text-blue-600" },
            { name: "Active Members", value: "0", icon: "users", color: "text-green-600" },
            { name: "Total Donations", value: "৳ 0", icon: "heart", color: "text-red-600" },
            { name: "Active Wings", value: "0", icon: "layers", color: "text-purple-600" },
        ];
    }
}
