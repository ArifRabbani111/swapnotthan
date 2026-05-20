import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { CommandMenu } from "@/components/admin/CommandMenu";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-muted/30">
            <AdminSidebar />
            <div className="flex-grow flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-card flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold">Dashboard</h1>
                        <CommandMenu />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                            AD
                        </div>
                    </div>
                </header>
                <main className="flex-grow overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
