"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema } from "@/lib/validations";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createTeamMember, updateTeamMember } from "@/actions/members";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { TeamMemberWithWing, WingRow } from "@/types";

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

interface TeamMemberFormProps {
    initialData?: TeamMemberWithWing | null;
    wings: WingRow[];
    onSuccess?: () => void;
}

export function TeamMemberForm({ initialData, wings, onSuccess }: TeamMemberFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<TeamMemberFormValues>({
        resolver: zodResolver(teamMemberSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                bio: initialData.bio ?? "",
                imageUrl: initialData.imageUrl ?? "",
              }
            : {
                name: "",
                role: "",
                bio: "",
                imageUrl: "",
                wingId: undefined,
            },
    });

    async function onSubmit(values: TeamMemberFormValues) {
        setLoading(true);
        try {
            if (initialData) {
                await updateTeamMember(initialData.id, values);
                toast.success("Team member updated successfully");
            } else {
                await createTeamMember(values);
                toast.success("Team member created successfully");
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter member name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role / Position</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Secretary, Volunteer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="wingId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Wing</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a wing" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {wings.map((wing) => (
                                        <SelectItem key={wing.id} value={wing.id}>
                                            {wing.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a bit about the member..."
                                    className="resize-none min-h-[100px]"
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
                            <FormLabel>Profile Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/profile.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-primary" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Member" : "Create Member"}
                </Button>
            </form>
        </Form>
    );
}
