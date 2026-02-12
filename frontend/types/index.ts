import type { events } from "@/db/schema";
import type { teamMembers, wings } from "@/db/schema";

export type EventRow = typeof events.$inferSelect;
export type TeamMemberWithWing = typeof teamMembers.$inferSelect & {
    wing: typeof wings.$inferSelect | null;
};
export type WingRow = typeof wings.$inferSelect;
