import { getTeamMembers } from "@/actions/members";
import { getWings } from "@/actions/wings";
import { TeamMembersTable } from "@/components/admin/TeamMembersTable";

export default async function MembersAdminPage() {
    const [members, wings] = await Promise.all([
        getTeamMembers(),
        getWings(),
    ]);

    return <TeamMembersTable members={members} wings={wings} />;
}
