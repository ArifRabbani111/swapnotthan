"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { deleteGalleryItem } from "@/actions/gallery";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function GalleryList({ items }: { items: any[] }) {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const onDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        setLoading(id);
        try {
            await deleteGalleryItem(id);
            toast.success("Item deleted");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete item");
        } finally {
            setLoading(null);
        }
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/30 rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">No gallery items found. Click "Add to Gallery" to start.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <div key={item.id} className="group relative bg-card rounded-xl overflow-hidden border shadow-sm transition-all hover:shadow-md">
                    <div className="relative aspect-square">
                        <Image
                            src={item.imageUrl}
                            alt={item.caption || "Gallery image"}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                variant="destructive"
                                size="icon"
                                className="h-10 w-10 rounded-full"
                                disabled={loading === item.id}
                                onClick={() => onDelete(item.id)}
                            >
                                {loading === item.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                    {item.caption && (
                        <div className="p-3 border-t">
                            <p className="text-sm font-medium truncate">{item.caption}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
