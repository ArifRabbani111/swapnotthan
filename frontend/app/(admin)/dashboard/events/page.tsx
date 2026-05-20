import { getEvents } from "@/actions/events";
import { EventsTable } from "@/components/admin/EventsTable";

export default async function EventsAdminPage() {
    const events = await getEvents();

    return (
        <div className="space-y-8">
            <EventsTable events={events} />
        </div>
    );
}
