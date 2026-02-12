"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            toast.error("Please fill in name, email, and message.");
            return;
        }

        setLoading(true);
        try {
            // Placeholder: in production you would call an API or server action here
            await new Promise((r) => setTimeout(r, 800));
            setSubmitted(true);
            form.reset();
            toast.success("Message sent! We'll get back to you soon.");
        } catch {
            toast.error("Something went wrong. Please try again or email us directly.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="border-none shadow-2xl p-8 rounded-3xl">
            <CardContent className="p-0 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="contact-name" className="text-sm font-bold">Full Name</label>
                            <Input
                                id="contact-name"
                                name="name"
                                placeholder="John Doe"
                                className="rounded-xl border-muted ring-offset-primary"
                                required
                                disabled={submitted}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="contact-email" className="text-sm font-bold">Email Address</label>
                            <Input
                                id="contact-email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="rounded-xl border-muted ring-offset-primary"
                                required
                                disabled={submitted}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="contact-subject" className="text-sm font-bold">Subject</label>
                        <Input
                            id="contact-subject"
                            name="subject"
                            placeholder="How can we help?"
                            className="rounded-xl border-muted ring-offset-primary"
                            disabled={submitted}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="contact-message" className="text-sm font-bold">Message</label>
                        <Textarea
                            id="contact-message"
                            name="message"
                            placeholder="Write your message here..."
                            className="rounded-xl border-muted ring-offset-primary min-h-[200px]"
                            required
                            disabled={submitted}
                        />
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto px-12 rounded-full bg-primary hover:bg-primary/90 text-lg font-bold py-6"
                        disabled={loading || submitted}
                    >
                        {loading ? (
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        ) : (
                            <Send className="mr-3 h-5 w-5" />
                        )}
                        {submitted ? "Sent" : "Send Message"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
