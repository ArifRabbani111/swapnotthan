import { getEvents } from "@/actions/events";
import { EventsSection } from "@/components/sections/EventsSection";

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="py-16 sm:py-20 bg-background text-center px-4">
                <div className="mx-auto max-w-4xl rounded-3xl bg-secondary px-5 sm:px-6 py-10 sm:py-14 text-secondary-foreground shadow-sm space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Our Events</h1>
                    <p className="max-w-2xl mx-auto opacity-90 text-base sm:text-lg">
                        Stay updated with our latest activities and join us in our upcoming missions.
                    </p>
                </div>
            </section>

            <EventsSection events={events} />
        </div>
    );
}
