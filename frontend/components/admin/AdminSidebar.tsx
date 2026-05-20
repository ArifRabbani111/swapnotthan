"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth-client";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Layers,
    HeartHandshake,
    Settings,
    LogOut,
    Image as ImageIcon,
    Newspaper,
    UserPlus
} from "lucide-react";

const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Wings", href: "/dashboard/wings", icon: Layers },
    { name: "Donations", href: "/dashboard/donations", icon: HeartHandshake },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserPlus },
    { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
    { name: "News", href: "/dashboard/news", icon: Newspaper },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full w-64 bg-card border-r">
            <div className="p-6 flex items-center gap-3">
                <div className="relative h-10 w-10">
                    <Image
                        src="/logo.png"
                        alt="Swapnotthan Logo"
                        fill
                        sizes="40px"
                        className="object-contain"
                    />
                </div>
                <h2 className="text-lg font-bold italic text-primary">Swapno Admin</h2>
            </div>

            <nav className="flex-grow px-4 space-y-2">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon size={20} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <button
                    type="button"
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
}
