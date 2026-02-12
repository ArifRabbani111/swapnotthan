import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Tagline */}
                    <div className="space-y-6">
                        <div className="bg-white p-2 rounded-lg inline-block">
                            <Image
                                src="/logo.png"
                                alt="Swapnotthan Logo"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-3xl font-bold italic">Swapnotthan</h2>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Empowering Communities through Action. Join us in making a difference.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 underline decoration-accent underline-offset-8">Quick Links</h3>
                        <ul className="space-y-4 text-sm opacity-90">
                            <li><Link href="/" className="hover:translate-x-1 transition-transform inline-block">Home</Link></li>
                            <li><Link href="/about" className="hover:translate-x-1 transition-transform inline-block">About Us</Link></li>
                            <li><Link href="/events" className="hover:translate-x-1 transition-transform inline-block">Events</Link></li>
                            <li><Link href="/members" className="hover:translate-x-1 transition-transform inline-block">Members</Link></li>
                            <li><Link href="/news" className="hover:translate-x-1 transition-transform inline-block">Latest News</Link></li>
                            <li><Link href="/gallery" className="hover:translate-x-1 transition-transform inline-block">Gallery</Link></li>
                            <li><Link href="/volunteer" className="hover:translate-x-1 transition-transform inline-block">Volunteer</Link></li>
                            <li><Link href="/contact" className="hover:translate-x-1 transition-transform inline-block">Contact</Link></li>
                            <li><Link href="/terms" className="hover:translate-x-1 transition-transform inline-block">Terms of Service</Link></li>
                            <li><Link href="/login" className="hover:translate-x-1 transition-transform inline-block">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 underline decoration-accent underline-offset-8">Customer Support</h3>
                        <ul className="space-y-4 text-sm opacity-90">
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-accent shrink-0" />
                                <a href="tel:+8801647431836" className="hover:underline font-medium">+88 01647431836</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-accent shrink-0" />
                                <a href="mailto:info@swapnotthan.org" className="hover:underline">info@swapnotthan.org</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={18} className="text-accent shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 underline decoration-accent underline-offset-8">Follow Us</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="#" className="hover:opacity-75 transition-opacity" aria-label="Facebook">
                                <Facebook size={24} />
                            </Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity" aria-label="Twitter">
                                <Twitter size={24} />
                            </Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity" aria-label="YouTube">
                                <Youtube size={24} />
                            </Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity" aria-label="Instagram">
                                <Instagram size={24} />
                            </Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity" aria-label="LinkedIn">
                                <Linkedin size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tech Partner Credit */}
                <div className="border-t border-primary-foreground/20 pt-6 pb-4">
                    <p className="text-center text-sm font-medium text-accent">
                        Tech Partner: <span className="font-bold">Chilekotha</span>
                    </p>
                </div>

                <div className="border-t border-primary-foreground/20 pt-4 text-center text-xs opacity-70">
                    <p>© {new Date().getFullYear()} Swapnotthan Foundation. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
