"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema } from "@/lib/validations";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Editor } from "./Editor";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createNewsItem, updateNewsItem } from "@/actions/news";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { NewsRow } from "@/types";

type NewsFormValues = z.infer<typeof newsSchema>;

interface NewsFormProps {
    initialData?: NewsRow | null;
    onSuccess?: () => void;
}

export function NewsForm({ initialData, onSuccess }: NewsFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<NewsFormValues>({
        resolver: zodResolver(newsSchema),
        defaultValues: initialData
            ? { ...initialData, content: initialData.content ?? "", imageUrl: initialData.imageUrl ?? "" }
            : {
            title: "",
            content: "",
            imageUrl: "",
        },
    });

    async function onSubmit(values: NewsFormValues) {
        setLoading(true);
        try {
            if (initialData) {
                await updateNewsItem(initialData.id, values);
                toast.success("News item updated successfully");
            } else {
                await createNewsItem(values);
                toast.success("News item created successfully");
            }
            form.reset();
            if (onSuccess) onSuccess();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter news title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Editor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-primary" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update News Item" : "Create News Item"}
                </Button>
            </form>
        </Form>
    );
}
