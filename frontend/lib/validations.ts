import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: z.string().optional(),
    date: z.date().optional(),
    location: z.string().optional(),
    imageUrl: z.union([z.string().url("Invalid image URL"), z.literal("")]).optional(),
});

export const wingSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    imageUrl: z.union([z.string().url("Invalid image URL"), z.literal("")]).optional(),
});

export const teamMemberSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.string().min(2, "Role must be at least 2 characters"),
    bio: z.string().optional(),
    imageUrl: z.union([z.string().url("Invalid image URL"), z.literal("")]).optional(),
    wingId: z.string().uuid("Invalid wing ID").optional(),
});

export const gallerySchema = z.object({
    imageUrl: z.string().url("Invalid image URL"),
    caption: z.string().optional(),
});

export const newsSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
    imageUrl: z.union([z.string().url("Invalid image URL"), z.literal("")]).optional(),
});
