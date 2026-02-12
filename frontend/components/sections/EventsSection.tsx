"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
    id: string;
    title: string;
    description: string | null;
    date: Date | null;
    imageUrl: string | null;
}

interface EventsSectionProps {
    events: Event[];
}

export function EventsSection({ events }: EventsSectionProps) {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 text-center mb-16 space-y-4">
                <h2 className="text-4xl font-extrabold text-foreground">Events</h2>
                <p className="max-w-[700px] mx-auto text-muted-foreground">
                    Discover our latest initiatives and upcoming activities. Join us in our journey of making a tangible impact in the lives of many.
                </p>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-muted-foreground">
                        No events found at the moment. Please check back later.
                    </div>
                ) : (
                    events.map((event) => {
                        const isUpcoming = event.date ? new Date(event.date) > new Date() : false;

                        return (
                            <Card key={event.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group bg-card">
                                <div className="relative h-64 overflow-hidden">
                                    <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold text-white rounded ${isUpcoming ? "bg-secondary" : "bg-accent"}`}>
                                        {isUpcoming ? "Upcoming" : "Recent"}
                                    </span>
                                    <img
                                        src={event.imageUrl || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400"}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <CardHeader className="text-center pt-8">
                                    <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{event.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                        {event.description}
                                    </p>
                                </CardHeader>
                                <CardFooter className="flex justify-center pb-8">
                                    <Button className="rounded-full bg-primary hover:bg-primary/90 px-8">
                                        View details
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })
                )}
            </div>
        </section>
    );
}
