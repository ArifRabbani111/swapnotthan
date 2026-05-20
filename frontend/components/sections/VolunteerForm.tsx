"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createVolunteerApplication } from "@/actions/volunteers";

const volunteerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    bio: z.string().min(10, "Tell us a bit about yourself (min 10 characters)"),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

export function VolunteerForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<VolunteerFormValues>({
        resolver: zodResolver(volunteerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            bio: "",
        },
    });

    const onSubmit = async (data: VolunteerFormValues) => {
        setLoading(true);
        try {
            const result = await createVolunteerApplication(data);
            if (result.success) {
                toast.success("Application submitted successfully! We will contact you soon.");
                form.reset();
            } else {
                toast.error(result.error || "Failed to submit application");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto p-6 bg-card rounded-lg border shadow-sm">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...form.register("name")} placeholder="John Doe" />
                        {form.formState.errors.name && (
                            <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...form.register("email")} placeholder="john@example.com" />
                        {form.formState.errors.email && (
                            <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" {...form.register("phone")} placeholder="+880 1XXX XXXXXX" />
                    {form.formState.errors.phone && (
                        <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Tell us why you want to join (Bio)</Label>
                    <Textarea id="bio" {...form.register("bio")} placeholder="I want to contribute to..." rows={4} />
                    {form.formState.errors.bio && (
                        <p className="text-xs text-destructive">{form.formState.errors.bio.message}</p>
                    )}
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
            </Button>
        </form>
    );
}
