"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Trash2, Loader2 } from "lucide-react";
import { updateVolunteerStatus, deleteVolunteer } from "@/actions/volunteers";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function VolunteersTable({ volunteers }: { volunteers: any[] }) {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleStatusUpdate = async (id: string, status: string) => {
        setLoading(id);
        try {
            await updateVolunteerStatus(id, status);
            toast.success(`Volunteer application ${status}`);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application?")) return;
        setLoading(id);
        try {
            await deleteVolunteer(id);
            toast.success("Application deleted");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete application");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="bg-card rounded-lg border shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Name & Bio</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {volunteers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground italic text-base">
                                    No volunteer applications found.
                                </td>
                            </tr>
                        ) : (
                            volunteers.map((volunteer) => (
                                <tr key={volunteer.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-foreground">{volunteer.name}</div>
                                        <div className="text-xs text-muted-foreground max-w-[300px] truncate" title={volunteer.bio}>
                                            {volunteer.bio}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium">{volunteer.email}</div>
                                        <div className="text-xs text-muted-foreground">{volunteer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={
                                            volunteer.status === "approved" ? "default" :
                                                volunteer.status === "rejected" ? "destructive" : "secondary"
                                        } className="capitalize">
                                            {volunteer.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(volunteer.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {volunteer.status === "pending" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                        disabled={!!loading}
                                                        onClick={() => handleStatusUpdate(volunteer.id, "approved")}
                                                    >
                                                        {loading === volunteer.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                        disabled={!!loading}
                                                        onClick={() => handleStatusUpdate(volunteer.id, "rejected")}
                                                    >
                                                        {loading === volunteer.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                                                    </Button>
                                                </>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                disabled={!!loading}
                                                onClick={() => handleDelete(volunteer.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
