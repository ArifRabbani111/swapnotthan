import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

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
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
