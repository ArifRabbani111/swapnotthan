import { getVolunteers } from "@/actions/volunteers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VolunteersTable } from "../../../../components/admin/VolunteersTable";

export default async function VolunteersAdminPage() {
    const volunteers = await getVolunteers();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Volunteer Applications</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <VolunteersTable volunteers={volunteers} />
                </CardContent>
            </Card>
        </div>
    );
}
