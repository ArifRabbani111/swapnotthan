import { getNewsItems } from "@/actions/news";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewsForm } from "../../../../components/admin/NewsForm";
import { NewsTable } from "../../../../components/admin/NewsTable";

export default async function NewsAdminPage() {
    const news = await getNewsItems();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage News</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Article
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create News Article</DialogTitle>
                        </DialogHeader>
                        <NewsForm />
                    </DialogContent>
                </Dialog>
            </div>

            <NewsTable news={news} />
        </div>
    );
}
