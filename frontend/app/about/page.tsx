import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Heart, Target, Eye, Shield, Droplets, BookOpen, Gift } from "lucide-react";

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
                                src="/swapno%20about.jpeg"
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

                {/* Our Wings */}
                <div className="container mx-auto px-4 text-center mt-20 mb-12 space-y-4">
                    <h2 className="text-4xl font-bold">Our Wings</h2>
                    <p className="text-muted-foreground">Three pillars of our work.</p>
                </div>
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Blood Wing */}
                    <div className="p-8 rounded-3xl bg-card border shadow-sm space-y-4 text-left hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-600">
                            <Droplets size={32} />
                        </div>
                        <h3 className="text-2xl font-bold">Blood Wing</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            One of the three wings of Swapnotthan is the blood wing sector. Under this wing, Swapnotthan regularly supplies emergency and essential blood groups to different places in Sylhet. Volunteers either donate blood themselves or assist by collecting donors. Along with full-time donors, our volunteers help in donating blood. To create awareness about blood donation, Swapnotthan organizes blood drives at various times. Every month our volunteers are ready to deliver blood to different places in Sylhet for free, 24/7.
                        </p>
                    </div>

                    {/* School Wing */}
                    <div className="p-8 rounded-3xl bg-card border shadow-sm space-y-4 text-left hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-2xl font-bold">School Wing</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            An important and regular wing of Swapnotthan is the school wing, which mainly deals with education. Volunteers work at Bholananda Night High School, a school for working children who study at night. Our volunteers put aside the stress of their own exams and focus on teaching. They guide tired students as dream charioteers. Swapnotthan regularly conducts classes from 5th to 10th standard and gives values education through inspiring stories. Students who passed from this school have enrolled in universities. Every year national days are celebrated with sports, Iftar Mahfil in Ramadan, and competitions in speech, essay writing, and drawing.
                        </p>
                    </div>

                    {/* Charity Wing */}
                    <div className="p-8 rounded-3xl bg-card border shadow-sm space-y-4 text-left hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600">
                            <Gift size={32} />
                        </div>
                        <h3 className="text-2xl font-bold">Charity Wing</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            The charity wing works for the underprivileged, especially children. Swapnotthan stands by people in need every year during winter through the &apos;Swapnotthan Warmth Campaign&apos;—collecting warm clothes and financial aid from campus and residential areas and distributing them. We distribute new clothes to thousands of families for Eid and share food items like shemai, pies, and polao. We organize Iftar parties for Bholananda Night School students and underprivileged children during Ramadan. Specially, Swapnotthan stands by the helpless, poor, and those unable to bear medical expenses.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
