import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact Us" },
    { href: "/rfq", label: "Request a Quote" },
];

const certifications = ["HACCP", "ISO 9001", "FSSAI", "MSME"];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy text-white">
            {/* Main Footer */}
            <div className="mx-auto max-w-[1320px] px-6 lg:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Logo size="md" variant="light" />
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mt-4">
                            Leading importers &amp; exporters of industrial and food-grade
                            marine chemicals, seafood additives, food enzymes, and egg
                            products since 2019.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent mb-6">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
                                <span className="text-sm text-white/60">
                                    Mumbai, Maharashtra, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-accent shrink-0" />
                                <a
                                    href="tel:+919999999999"
                                    className="text-sm text-white/60 hover:text-accent transition-colors"
                                >
                                    +91 99999 99999
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-accent shrink-0" />
                                <a
                                    href="mailto:info@ajinkyamarine.com"
                                    className="text-sm text-white/60 hover:text-accent transition-colors"
                                >
                                    info@ajinkyamarine.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Certifications */}
                    <div>
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent mb-6">
                            Certifications
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {certifications.map((cert) => (
                                <span
                                    key={cert}
                                    className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent"
                                >
                                    {cert}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-white/40 mt-4 leading-relaxed">
                            Committed to international quality standards and food safety
                            compliance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40">
                        &copy; {currentYear} Ajinkya Marine Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/contact"
                            className="text-xs text-white/40 hover:text-accent transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/contact"
                            className="text-xs text-white/40 hover:text-accent transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
