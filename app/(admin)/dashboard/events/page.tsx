import { getEvents } from "@/actions/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { EventsTable } from "@/components/admin/EventsTable";

export default async function EventsAdminPage() {
    const events = await getEvents();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Events</h2>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Event
                </Button>
            </div>

            <EventsTable events={events} />
        </div>
    );
}
