import type { events, teamMembers, wings, donations, volunteers, gallery, latestNews, siteSettings } from "@/db/schema";

export type EventRow = typeof events.$inferSelect;
export type TeamMemberWithWing = typeof teamMembers.$inferSelect & {
    wing: typeof wings.$inferSelect | null;
};
export type WingRow = typeof wings.$inferSelect;
export type DonationRow = typeof donations.$inferSelect;
export type DonationWithEvent = DonationRow & { event: EventRow | null };
export type VolunteerRow = typeof volunteers.$inferSelect;
export type GalleryRow = typeof gallery.$inferSelect;
export type NewsRow = typeof latestNews.$inferSelect;
export type SiteSettingsRow = typeof siteSettings.$inferSelect;
