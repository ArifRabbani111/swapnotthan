import { getDonations } from "@/actions/donations";
import { DonationsTable } from "@/components/admin/DonationsTable";

export default async function DonationsAdminPage() {
    const donations = await getDonations();

    return <DonationsTable donations={donations} />;
}
