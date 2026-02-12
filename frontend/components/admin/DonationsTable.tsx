"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, Clock } from "lucide-react";
import { updateDonationStatus, deleteDonation } from "@/actions/donations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import type { DonationWithEvent } from "@/types";

interface DonationsTableProps {
    donations: DonationWithEvent[];
}

export function DonationsTable({ donations }: DonationsTableProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const onStatusChange = async (id: string, status: string) => {
        setLoadingId(id);
        try {
            await updateDonationStatus(id, status);
            toast.success("Donation status updated");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setLoadingId(null);
        }
    };

    const onDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this donation record?")) {
            try {
                await deleteDonation(id);
                toast.success("Donation deleted successfully");
                router.refresh();
            } catch (error) {
                toast.error("Failed to delete donation");
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Donations</h2>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Donor</th>
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Event</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {donations.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-10 text-center text-muted-foreground italic text-base">
                                        No donations found.
                                    </td>
                                </tr>
                            ) : (
                                donations.map((donation) => (
                                    <tr key={donation.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold">{donation.donorName || "Anonymous"}</div>
                                            <div className="text-xs text-muted-foreground">{donation.donorEmail || "N/A"}</div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                            {donation.transactionId || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-primary">৳ {donation.amount}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {donation.event?.title || "General Donation"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Select
                                                defaultValue={donation.status ?? undefined}
                                                onValueChange={(val) => onStatusChange(donation.id, val)}
                                                disabled={loadingId === donation.id}
                                            >
                                                <SelectTrigger className="w-[130px] h-8 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="failed">Failed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(donation.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive/20 hover:bg-destructive/10"
                                                onClick={() => onDelete(donation.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
