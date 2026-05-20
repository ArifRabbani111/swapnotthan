"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Heart } from "lucide-react";
import { createDonation } from "@/actions/donations";

export function DonationDialog({ trigger }: { trigger: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const amount = parseInt(formData.get("amount") as string);
        const transactionId = formData.get("transactionId") as string;

        setLoading(true);

        try {
            const result = await createDonation({
                donorName: name,
                donorEmail: email,
                amount: amount,
                transactionId: transactionId,
                status: "pending"
            });

            if (result.success) {
                toast.success("Thank you for your generosity! We will contact you soon.");
                setOpen(false);
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to submit donation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Heart className="text-primary fill-primary" />
                        Make a Donation
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (BDT)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground font-bold italic">৳</span>
                                <Input id="amount" name="amount" type="number" className="pl-8" placeholder="500" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="transactionId">Transaction ID</Label>
                            <Input id="transactionId" name="transactionId" placeholder="TRX-123456" required />
                            <p className="text-[10px] text-muted-foreground">
                                Please provide the transaction ID from your mobile banking or bank transfer.
                            </p>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Donation
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground opacity-70">
                        By clicking confirm, you agree to our donation terms and conditions.
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
