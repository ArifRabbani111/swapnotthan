"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema } from "@/lib/validations";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createGalleryItem } from "@/actions/gallery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type GalleryFormValues = z.infer<typeof gallerySchema>;

interface GalleryFormProps {
    onSuccess?: () => void;
}

export function GalleryForm({ onSuccess }: GalleryFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<GalleryFormValues>({
        resolver: zodResolver(gallerySchema),
        defaultValues: {
            imageUrl: "",
            caption: "",
        },
    });

    async function onSubmit(values: GalleryFormValues) {
        setLoading(true);
        try {
            await createGalleryItem(values);
            toast.success("Gallery item added successfully");
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
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/photo.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Caption (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Description of the image" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-primary" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add to Gallery
                </Button>
            </form>
        </Form>
    );
}
