"use client";

import * as React from "react";
import {
    Calendar,
    Layers,
    LayoutDashboard,
    LogOut,
    Search,
    Settings,
    Users,
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth-client";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border rounded-md hover:bg-muted transition-colors"
            >
                <Search size={16} />
                <span className="hidden md:inline-flex">Search commands...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/events"))}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Manage Events</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/members"))}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Manage Members</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/wings"))}>
                            <Layers className="mr-2 h-4 w-4" />
                            <span>Manage Wings</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => logout())}>
                            <LogOut className="mr-2 h-4 w-4 text-destructive" />
                            <span className="text-destructive">Logout</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
