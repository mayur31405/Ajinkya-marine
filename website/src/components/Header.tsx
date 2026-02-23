"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
    { href: "/rfq", label: "Get a Quote" },
];

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md shadow-lg">
            <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                <div className="flex h-[76px] items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Logo size="md" variant="light" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const isQuote = link.href === "/rfq";

                            if (isQuote) {
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="ml-4 rounded-[var(--radius-btn)] bg-accent px-6 py-2.5 font-heading text-sm font-bold text-navy transition-all hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                                    >
                                        {link.label}
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${isActive
                                            ? "text-accent"
                                            : "text-white/80 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 text-white hover:text-accent transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden bg-navy-light border-t border-white/10"
                        aria-label="Mobile navigation"
                    >
                        <div className="px-6 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const isQuote = link.href === "/rfq";

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${isQuote
                                                ? "mt-2 rounded-[var(--radius-btn)] bg-accent text-center font-heading font-bold text-navy"
                                                : isActive
                                                    ? "bg-white/10 text-accent"
                                                    : "text-white/80 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
