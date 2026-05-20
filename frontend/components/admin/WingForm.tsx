"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wingSchema } from "@/lib/validations";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createWing, updateWing } from "@/actions/wings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { WingRow } from "@/types";

type WingFormValues = z.infer<typeof wingSchema>;

interface WingFormProps {
    initialData?: WingRow | null;
    onSuccess?: () => void;
}

export function WingForm({ initialData, onSuccess }: WingFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<WingFormValues>({
        resolver: zodResolver(wingSchema),
        defaultValues: initialData
            ? { ...initialData, description: initialData.description ?? "", imageUrl: initialData.imageUrl ?? "" }
            : { name: "", description: "", imageUrl: "" },
    });

    async function onSubmit(values: WingFormValues) {
        setLoading(true);
        try {
            if (initialData) {
                await updateWing(initialData.id, values);
                toast.success("Wing updated successfully");
            } else {
                await createWing(values);
                toast.success("Wing created successfully");
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter wing name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the wing..."
                                    className="resize-none min-h-[120px]"
                                    {...field}
                                />
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
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-primary" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Wing" : "Create Wing"}
                </Button>
            </form>
        </Form>
    );
}
