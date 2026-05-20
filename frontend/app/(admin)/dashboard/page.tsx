import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Heart, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getDashboardStats } from "@/actions/stats";
import { getDonations } from "@/actions/donations";
import { getEvents } from "@/actions/events";

const iconMap: Record<string, LucideIcon> = {
    calendar: Calendar,
    users: Users,
    heart: Heart,
    layers: Layers,
};

export default async function DashboardPage() {
    const [stats, recentDonations, upcomingEvents] = await Promise.all([
        getDashboardStats(),
        getDonations(),
        getEvents(),
    ]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = iconMap[stat.icon];
                    return (
                        <Card key={stat.name}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.name}
                                </CardTitle>
                                <Icon className={stat.color} size={20} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentDonations.slice(0, 5).length === 0 ? (
                                <p className="text-sm text-muted-foreground italic">No donations yet.</p>
                            ) : (
                                recentDonations.slice(0, 5).map((donation) => (
                                    <div key={donation.id} className="flex items-center gap-4 text-sm">
                                        <div className={`w-2 h-2 rounded-full ${donation.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                        <p>
                                            ৳ {donation.amount} from {donation.donorName || "Anonymous"}
                                            <span className="text-muted-foreground ml-2">({donation.status})</span>
                                        </p>
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            {new Date(donation.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Global Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Events Organized</span>
                                <span className="font-bold">{upcomingEvents.length}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Platform Status</span>
                                <span className="text-green-600 font-bold">Operational</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
