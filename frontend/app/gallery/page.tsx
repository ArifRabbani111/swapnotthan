import { getGalleryItems } from "@/actions/gallery";

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <div className="flex flex-col w-full">
            <section className="py-20 bg-secondary text-secondary-foreground text-center">
                <div className="container mx-auto px-4 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Gallery</h1>
                    <p className="max-w-2xl mx-auto opacity-90 text-lg">
                        Glimpses of our events, campaigns, and the communities we serve.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    {items.length === 0 ? (
                        <p className="text-center text-muted-foreground py-16">No gallery items yet. Check back soon.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.imageUrl}
                                        alt={item.caption || "Gallery image"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {item.caption && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                            <p className="text-white text-sm font-medium line-clamp-2">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
