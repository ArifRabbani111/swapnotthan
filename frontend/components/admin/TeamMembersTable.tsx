"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TeamMemberForm } from "./TeamMemberForm";
import { deleteTeamMember } from "@/actions/members";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { TeamMemberWithWing, WingRow } from "@/types";

interface TeamMembersTableProps {
    members: TeamMemberWithWing[];
    wings: WingRow[];
}

export function TeamMembersTable({ members, wings }: TeamMembersTableProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMemberWithWing | null>(null);
    const router = useRouter();

    const onDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this member?")) {
            try {
                await deleteTeamMember(id);
                toast.success("Member deleted successfully");
                router.refresh();
            } catch (error) {
                toast.error("Failed to delete member");
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Members</h2>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Team Member</DialogTitle>
                        </DialogHeader>
                        <TeamMemberForm wings={wings} onSuccess={() => setIsCreateOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Wing</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground italic text-base">
                                        No members found.
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-foreground">{member.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{member.role}</td>
                                        <td className="px-6 py-4">
                                            {member.wing ? (
                                                <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                                                    {member.wing.name}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground italic text-xs">General</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-secondary hover:text-secondary/20 hover:bg-secondary/10"
                                                onClick={() => {
                                                    setSelectedMember(member);
                                                    setIsEditOpen(true);
                                                }}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive/20 hover:bg-destructive/10"
                                                onClick={() => onDelete(member.id)}
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
                        <DialogTitle>Edit Team Member</DialogTitle>
                    </DialogHeader>
                    {selectedMember && (
                        <TeamMemberForm
                            initialData={selectedMember}
                            wings={wings}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedMember(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
