import { getGalleryItems } from "@/actions/gallery";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GalleryForm } from "../../../../components/admin/GalleryForm";
import { deleteGalleryItem } from "@/actions/gallery";
import { GalleryList } from "../../../../components/admin/GalleryList";

export default async function GalleryAdminPage() {
    const items = await getGalleryItems();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Gallery</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Add to Gallery
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Gallery Item</DialogTitle>
                        </DialogHeader>
                        <GalleryForm />
                    </DialogContent>
                </Dialog>
            </div>

            <GalleryList items={items} />
        </div>
    );
}
