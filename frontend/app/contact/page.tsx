import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="py-20 bg-primary text-primary-foreground text-center">
                <div className="container mx-auto px-4 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
                    <p className="max-w-2xl mx-auto opacity-90 text-lg">
                        Have questions or want to collaborate? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">Contact Information</h2>
                                <p className="text-muted-foreground">Reach out to us through any of these channels.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-6 p-6 rounded-2xl bg-muted/30 group hover:bg-primary/5 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Our Location</h4>
                                        <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 p-6 rounded-2xl bg-muted/30 group hover:bg-primary/5 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Call Us</h4>
                                        <p className="text-sm text-muted-foreground">+880 1234 567890</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 p-6 rounded-2xl bg-muted/30 group hover:bg-primary/5 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Email Us</h4>
                                        <p className="text-sm text-muted-foreground">info@swapnotthan.org</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-none shadow-2xl p-8 rounded-3xl">
                                <CardContent className="p-0 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Full Name</label>
                                            <Input placeholder="John Doe" className="rounded-xl border-muted ring-offset-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Email Address</label>
                                            <Input placeholder="john@example.com" className="rounded-xl border-muted ring-offset-primary" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Subject</label>
                                        <Input placeholder="How can we help?" className="rounded-xl border-muted ring-offset-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Message</label>
                                        <Textarea placeholder="Write your message here..." className="rounded-xl border-muted ring-offset-primary min-h-[200px]" />
                                    </div>
                                    <Button size="lg" className="w-full md:w-auto px-12 rounded-full bg-primary hover:bg-primary/90 text-lg font-bold py-6">
                                        <Send className="mr-3 h-5 w-5" />
                                        Send Message
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
