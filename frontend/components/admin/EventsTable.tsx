"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EventForm } from "./EventForm";
import { deleteEvent } from "@/actions/events";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { EventRow } from "@/types";

interface EventsTableProps {
    events: EventRow[];
}

export function EventsTable({ events }: EventsTableProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null);
    const router = useRouter();

    const onDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEvent(id);
                toast.success("Event deleted successfully");
                router.refresh();
            } catch (error) {
                toast.error("Failed to delete event");
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Events</h2>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Event</DialogTitle>
                        </DialogHeader>
                        <EventForm onSuccess={() => setIsCreateOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground italic text-base">
                                        No events found. Start by creating one!
                                    </td>
                                </tr>
                            ) : (
                                events.map((event) => (
                                    <tr key={event.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-foreground">{event.title}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {event.date ? new Date(event.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            }) : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{event.location || "N/A"}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-secondary hover:text-secondary/20 hover:bg-secondary/10"
                                                onClick={() => {
                                                    setSelectedEvent(event);
                                                    setIsEditOpen(true);
                                                }}
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive/20 hover:bg-destructive/10"
                                                onClick={() => onDelete(event.id)}
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
                        <DialogTitle>Edit Event</DialogTitle>
                    </DialogHeader>
                    {selectedEvent && (
                        <EventForm
                            initialData={selectedEvent}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedEvent(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
