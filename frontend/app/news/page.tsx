import { getNewsItems } from "@/actions/news";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function NewsPage() {
    const news = await getNewsItems();

    return (
        <div className="flex flex-col w-full">
            <section className="py-20 bg-primary text-primary-foreground text-center">
                <div className="container mx-auto px-4 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Latest News</h1>
                    <p className="max-w-2xl mx-auto opacity-90 text-lg">
                        Stay updated with our latest announcements and stories from the field.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    {news.length === 0 ? (
                        <p className="text-center text-muted-foreground py-16">No news articles yet. Check back soon.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <Card key={item.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                                    {item.imageUrl && (
                                        <div className="relative h-48 w-full">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <h2 className="text-xl font-bold line-clamp-2">{item.title}</h2>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground line-clamp-3 text-sm">{item.content}</p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
