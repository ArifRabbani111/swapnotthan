import { getTeamMembers } from "@/actions/members";
import { getWings } from "@/actions/wings";
import { Card, CardContent } from "@/components/ui/card";

export default async function MembersPage() {
    const [members, wings] = await Promise.all([
        getTeamMembers(),
        getWings(),
    ]);

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="py-16 sm:py-20 bg-background text-center px-4">
                <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-5 sm:px-6 py-10 sm:py-14 text-primary-foreground shadow-sm space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Meet Our Members</h1>
                    <p className="max-w-2xl mx-auto opacity-90 text-base sm:text-lg">
                        Meet the passionate individuals who work tirelessly to bring Swapnotthan's vision to life.
                    </p>
                </div>
            </section>

            {/* Members Grid */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    {wings.map((wing) => {
                        const wingMembers = members.filter(m => m.wingId === wing.id);
                        if (wingMembers.length === 0) return null;

                        return (
                            <div key={wing.id} className="mb-20 last:mb-0">
                                <div className="flex items-center gap-4 mb-10">
                                    <h2 className="text-3xl font-bold text-foreground">{wing.name}</h2>
                                    <div className="h-0.5 flex-grow bg-primary/20 rounded-full" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {wingMembers.map((member) => (
                                        <Card key={member.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-card group">
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={member.imageUrl || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400"}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <CardContent className="text-center pt-6 pb-8">
                                                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                                                <p className="text-sm font-medium text-secondary mb-3">{member.role}</p>
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {member.bio}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* General Members or those without a wing */}
                    {members.filter(m => !m.wingId).length > 0 && (
                        <div className="mt-20">
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-3xl font-bold text-foreground">Our Volunteers</h2>
                                <div className="h-0.5 flex-grow bg-primary/20 rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {members.filter(m => !m.wingId).map((member) => (
                                    <Card key={member.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-card group">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={member.imageUrl || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400"}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="text-center pt-6 pb-8">
                                            <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                                            <p className="text-sm font-medium text-secondary mb-3">{member.role}</p>
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {member.bio}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
