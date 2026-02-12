import {
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
    pgEnum,
    integer,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["user", "admin", "superadmin"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image"),
    role: userRoleEnum("role").default("user"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    events: many(events),
}));

export const accounts = pgTable("accounts", {
    userId: uuid("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
});

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable("sessions", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable("verificationToken", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const events = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    description: text("description"),
    date: timestamp("date"),
    location: text("location"),
    imageUrl: text("image_url"),
    createdById: uuid("created_by_id").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const eventsRelations = relations(events, ({ one, many }) => ({
    creator: one(users, { fields: [events.createdById], references: [users.id] }),
    donations: many(donations),
}));

export const wings = pgTable("wings", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wingsRelations = relations(wings, ({ many }) => ({
    members: many(teamMembers),
}));

export const teamMembers = pgTable("team_members", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    bio: text("bio"),
    imageUrl: text("image_url"),
    wingId: uuid("wing_id").references(() => wings.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
    wing: one(wings, { fields: [teamMembers.wingId], references: [wings.id] }),
}));

export const donations = pgTable("donations", {
    id: uuid("id").primaryKey().defaultRandom(),
    amount: integer("amount").notNull(),
    donorName: text("donor_name"),
    donorEmail: text("donor_email"),
    transactionId: text("transaction_id"),
    status: text("status").default("pending"),
    eventId: uuid("event_id").references(() => events.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const volunteers = pgTable("volunteers", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    bio: text("bio"),
    status: text("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const gallery = pgTable("gallery", {
    id: uuid("id").primaryKey().defaultRandom(),
    imageUrl: text("image_url").notNull(),
    caption: text("caption"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const latestNews = pgTable("latest_news", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
    id: text("id").primaryKey(), // Using a fixed string like 'hero' for specific settings
    heroBackgroundImageUrl: text("hero_background_image_url"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const donationsRelations = relations(donations, ({ one }) => ({
    event: one(events, { fields: [donations.eventId], references: [events.id] }),
}));

