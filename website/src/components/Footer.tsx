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
        <footer className="relative bg-[#030914] text-white overflow-hidden border-t border-white/10 mt-auto">
            {/* Ambient Background for Footer */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#030914] to-[#0a1e3f] opacity-50" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* Main Footer */}
            <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1 glass-panel p-6 shadow-xl w-full border-t-0 border-l-0 border-b-0 border-r-white/5 rounded-none md:rounded-2xl md:border-r-white/10 md:border-b-white/10 md:border-t-white/20 md:border-l-white/20">
                        <Link href="/" className="inline-block mb-4">
                            <Logo size="md" variant="light" />
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mt-4 font-light">
                            Leading importers &amp; exporters of industrial and food-grade
                            marine chemicals, seafood additives, food enzymes, and egg
                            products since 2019.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent mb-6 drop-shadow-[0_0_8px_rgba(255,199,44,0.3)]">
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
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent mb-6 drop-shadow-[0_0_8px_rgba(255,199,44,0.3)]">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <MapPin className="h-4 w-4 text-accent mt-1 shrink-0 drop-shadow-[0_0_8px_rgba(255,199,44,0.5)] group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-white/60">
                                    Mumbai, Maharashtra, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Phone className="h-4 w-4 text-accent shrink-0 drop-shadow-[0_0_8px_rgba(255,199,44,0.5)] group-hover:scale-110 transition-transform" />
                                <a
                                    href="tel:+919999999999"
                                    className="text-sm text-white/60 hover:text-accent transition-colors"
                                >
                                    +91 99999 99999
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Mail className="h-4 w-4 text-accent shrink-0 drop-shadow-[0_0_8px_rgba(255,199,44,0.5)] group-hover:scale-110 transition-transform" />
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
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent mb-6 drop-shadow-[0_0_8px_rgba(255,199,44,0.3)]">
                            Certifications
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {certifications.map((cert) => (
                                <span
                                    key={cert}
                                    className="inline-flex items-center rounded-[var(--radius-badge)] border border-accent/20 bg-accent/5 px-4 py-2 text-xs font-semibold text-accent shadow-[0_0_15px_rgba(255,199,44,0.1)] hover:bg-accent/10 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(255,199,44,0.2)] transition-all cursor-default"
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
            <div className="relative z-10 border-t border-white/5 bg-[#010308]/50 backdrop-blur-md">
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
