import { getEvents } from "@/actions/events";
import { EventsSection } from "@/components/sections/EventsSection";

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="py-20 bg-secondary text-secondary-foreground text-center">
                <div className="container mx-auto px-4 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Our Events</h1>
                    <p className="max-w-2xl mx-auto opacity-90 text-lg">
                        Stay updated with our latest activities and join us in our upcoming missions.
                    </p>
                </div>
            </section>

            <EventsSection events={events} />
        </div>
    );
}
