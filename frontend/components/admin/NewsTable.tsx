"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewsForm } from "./NewsForm";
import { deleteNewsItem } from "@/actions/news";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function NewsTable({ news }: { news: any[] }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const onDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        setLoading(id);
        try {
            await deleteNewsItem(id);
            toast.success("News item deleted");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete item");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="bg-card rounded-lg border shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {news.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-10 text-center text-muted-foreground italic text-base">
                                    No news items found.
                                </td>
                            </tr>
                        ) : (
                            news.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-foreground truncate max-w-md">{item.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-secondary hover:bg-secondary/10"
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setIsEditOpen(true);
                                            }}
                                        >
                                            <Edit size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                            disabled={loading === item.id}
                                            onClick={() => onDelete(item.id)}
                                        >
                                            {loading === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit News Article</DialogTitle>
                    </DialogHeader>
                    {selectedItem && (
                        <NewsForm
                            initialData={selectedItem}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedItem(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
