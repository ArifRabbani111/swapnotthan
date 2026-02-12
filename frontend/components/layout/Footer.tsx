import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Description */}
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
                            Swapnotthan is a non-profit organization dedicated to empowering communities and providing support to those in need. Join us in making a difference.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:opacity-75 transition-opacity"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity"><Youtube size={20} /></Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity"><Linkedin size={20} /></Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 underline decoration-accent underline-offset-8">Resources</h3>
                        <ul className="space-y-4 text-sm opacity-90">
                            <li><Link href="/events" className="hover:translate-x-1 transition-transform inline-block">Events</Link></li>
                            <li><Link href="/members" className="hover:translate-x-1 transition-transform inline-block">Members</Link></li>
                            <li><Link href="/blog" className="hover:translate-x-1 transition-transform inline-block">Latest News</Link></li>
                            <li><Link href="/gallery" className="hover:translate-x-1 transition-transform inline-block">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 underline decoration-accent underline-offset-8">Company</h3>
                        <ul className="space-y-4 text-sm opacity-90">
                            <li><Link href="/about" className="hover:translate-x-1 transition-transform inline-block">About Us</Link></li>
                            <li><Link href="/contact" className="hover:translate-x-1 transition-transform inline-block">Contact Us</Link></li>
                            <li><Link href="/login" className="hover:translate-x-1 transition-transform inline-block">Admin Login</Link></li>
                            <li><Link href="/terms" className="hover:translate-x-1 transition-transform inline-block">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 underline decoration-accent underline-offset-8">Get in Touch</h3>
                        <ul className="space-y-4 text-sm opacity-90">
                            <li className="flex items-center gap-3">
                                <MapPin size={18} className="text-accent" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-accent" />
                                <span>+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-accent" />
                                <span>info@swapnotthan.org</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/20 pt-8 text-center text-xs opacity-70">
                    <p>© {new Date().getFullYear()} Swapnotthan Foundation. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
