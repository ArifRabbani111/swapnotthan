import { Hero } from "@/components/sections/Hero";
import { EventsSection } from "@/components/sections/EventsSection";
import { getEvents } from "@/actions/events";
import { DonationDialog } from "@/components/sections/DonationDialog";
import { getSiteSettings } from "@/actions/settings";
import Link from "next/link";

export default async function Home() {
  let events: Awaited<ReturnType<typeof getEvents>> = [];
  let settings: Awaited<ReturnType<typeof getSiteSettings>> = null;
  try {
    const [e, s] = await Promise.all([getEvents(), getSiteSettings()]);
    events = e;
    settings = s;
  } catch (err) {
    console.error("Home page data fetch error:", err);
  }

  return (
    <div className="flex flex-col w-full">
      <Hero backgroundImage={settings?.heroBackgroundImageUrl} />
      <EventsSection events={events} />

      {/* Call to Action Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">Ready to make a difference?</h2>
          <p className="max-w-[800px] mx-auto opacity-90 text-lg">
            Every contribution, whether big or small, helps us continue our work in supporting communities and bringing about positive change.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <DonationDialog
              trigger={
                <button className="bg-accent text-accent-foreground font-bold px-8 py-3 rounded-full hover:bg-accent/90 transition-colors cursor-pointer">
                  Donate Now
                </button>
              }
            />
            <Link
              href="/volunteer"
              className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors border border-primary-foreground/20"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
