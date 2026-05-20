import { getWings } from "@/actions/wings";
import { WingsTable } from "@/components/admin/WingsTable";

export default async function WingsAdminPage() {
    const wings = await getWings();

    return <WingsTable wings={wings} />;
}
