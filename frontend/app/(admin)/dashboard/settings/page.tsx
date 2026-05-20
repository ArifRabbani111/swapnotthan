import { getSiteSettings } from "@/actions/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsForm } from "../../../../components/admin/SettingsForm";

export default async function SettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold">Site Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Hero Section</CardTitle>
                        <CardDescription>
                            Customize the appearance of the homepage hero section.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SettingsForm initialData={settings} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
