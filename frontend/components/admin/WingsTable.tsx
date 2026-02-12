"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WingForm } from "./WingForm";
import { deleteWing } from "@/actions/wings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface WingsTableProps {
    wings: any[];
}

export function WingsTable({ wings }: WingsTableProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedWing, setSelectedWing] = useState<any>(null);
    const router = useRouter();

    const onDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this wing?")) {
            try {
                await deleteWing(id);
                toast.success("Wing deleted successfully");
                router.refresh();
            } catch (error) {
                toast.error("Failed to delete wing");
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Wings</h2>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Wing
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Wing</DialogTitle>
                        </DialogHeader>
                        <WingForm onSuccess={() => setIsCreateOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {wings.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-muted-foreground italic text-base">
                                        No wings found.
                                    </td>
                                </tr>
                            ) : (
                                wings.map((wing) => (
                                    <tr key={wing.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-foreground">{wing.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground line-clamp-1 max-w-xs">{wing.description || "N/A"}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-secondary hover:text-secondary/20 hover:bg-secondary/10"
                                                onClick={() => {
                                                    setSelectedWing(wing);
                                                    setIsEditOpen(true);
                                                }}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive/20 hover:bg-destructive/10"
                                                onClick={() => onDelete(wing.id)}
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

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Wing</DialogTitle>
                    </DialogHeader>
                    {selectedWing && (
                        <WingForm
                            initialData={selectedWing}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedWing(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
