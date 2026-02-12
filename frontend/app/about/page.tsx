import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Heart, Target, Eye, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <Badge className="bg-primary text-white">Since 2024</Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
                            A Dream for a <br /> <span className="text-primary italic">Better Future</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Swapnotthan is more than just an organization; it&apos;s a movement born from the desire to uplift those around us. We believe that collective small actions lead to massive positive transformations.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" className="rounded-full px-8" asChild>
                                <Link href="/about#values">Our History</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary" asChild>
                                <Link href="/volunteer">Get Involved</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-primary/10 rounded-3xl overflow-hidden shadow-2xl relative">
                            <Image
                                src="https://images.unsplash.com/photo-1593113598332-cd288d6444f1?q=80&w=800"
                                alt="About Swapnotthan"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-accent p-8 rounded-2xl shadow-xl hidden md:block">
                            <p className="text-3xl font-bold text-white">500+</p>
                            <p className="text-sm text-white/90">Lives Impacted</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="p-12 rounded-3xl bg-primary text-primary-foreground space-y-6">
                        <Target size={48} className="text-accent" />
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-lg opacity-90 leading-relaxed">
                            To empower underprivileged communities through education, healthcare, and sustainable support systems, ensuring every individual has the opportunity to thrive.
                        </p>
                    </div>
                    <div className="p-12 rounded-3xl bg-secondary text-secondary-foreground space-y-6">
                        <Eye size={48} className="text-accent" />
                        <h2 className="text-3xl font-bold">Our Vision</h2>
                        <p className="text-lg opacity-90 leading-relaxed">
                            We envision a society where poverty is no longer a barrier to success, and where every citizen is active in the development of their nation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section id="values" className="py-24 bg-muted/20">
                <div className="container mx-auto px-4 text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold">Our Core Values</h2>
                    <p className="text-muted-foreground">What drives us every single day.</p>
                </div>
                <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {[
                        { title: "Transparency", icon: Shield, desc: "We maintain 100% transparency in all our operations and donations." },
                        { title: "Compassion", icon: Heart, desc: "Every action we take is rooted in deep empathy for our fellow human beings." },
                        { title: "Action-Oriented", icon: Target, desc: "We don't just talk; we execute impactful projects on the ground." },
                    ].map((val) => {
                        const Icon = val.icon;
                        return (
                            <div key={val.title} className="p-8 space-y-4 hover:scale-105 transition-transform">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold">{val.title}</h3>
                                <p className="text-muted-foreground">{val.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
