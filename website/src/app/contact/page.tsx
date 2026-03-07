"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { images } from "@/lib/images";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    ArrowRight,
    Anchor,
} from "lucide-react";

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setSubmitted(true);
                reset();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            label: "Address",
            value: "Mumbai, Maharashtra, India",
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+91 99999 99999",
            href: "tel:+919999999999",
        },
        {
            icon: Mail,
            label: "Email",
            value: "info@ajinkyamarine.com",
            href: "mailto:info@ajinkyamarine.com",
        },
        {
            icon: Clock,
            label: "Business Hours",
            value: "Mon – Sat, 9:00 AM – 6:00 PM IST",
        },
    ];

    return (
        <div className="relative w-full bg-[#030914] text-white min-h-screen pb-20">
            {/* Global Ambient Background — Ocean Liquid Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none ocean-gradient-bg">
                <div className="bg-blob bg-blob-1" />
                <div className="bg-blob bg-blob-2" />
            </div>

            <main className="relative z-10 w-full overflow-hidden">
                {/* ===================== HERO BANNER ===================== */}
                <section className="relative h-[300px] lg:h-[400px] overflow-hidden">
                    <Image
                        src={images.atmosphere.globalTrade}
                        alt="Global logistics"
                        fill
                        className="object-cover opacity-40 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030914]/50 to-[#030914]" />
                    <div className="relative h-full flex items-center">
                        <div className="mx-auto max-w-[1320px] px-6 lg:px-20 w-full mt-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-4 border-none shadow-none">
                                    <Anchor className="h-3.5 w-3.5" />
                                    Get in Touch
                                </span>
                                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 uppercase leading-tight drop-shadow-sm">
                                    Contact <span className="text-accent drop-shadow-[0_0_15px_rgba(255,199,44,0.3)]">Us</span>
                                </h1>
                                <p className="mt-4 text-white/70 text-lg max-w-xl font-light">
                                    Have questions? Need a quote? We&apos;re here to help with
                                    your chemical sourcing needs.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                            {/* ===================== CONTACT FORM ===================== */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-3"
                            >
                                <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
                                    {/* Subtle internal glow */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                                    <h2 className="font-heading text-3xl font-bold text-white mb-2 relative z-10">
                                        Send Us a Message
                                    </h2>
                                    <p className="text-sm text-white/60 font-light mb-10 relative z-10">
                                        Fill out the form below and we&apos;ll get back to you within 24 hours.
                                    </p>

                                    {submitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-16 text-center relative z-10"
                                        >
                                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 border border-accent/20 mb-6">
                                                <CheckCircle2 className="h-10 w-10 text-accent" />
                                            </div>
                                            <h3 className="font-heading text-2xl font-bold text-white mb-2">
                                                Message Sent!
                                            </h3>
                                            <p className="text-white/60 font-light">
                                                Thank you for reaching out. We&apos;ll respond shortly.
                                            </p>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="mt-8 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("name", { required: "Name is required" })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="Your name"
                                                    />
                                                    {errors.name && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.name.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        {...register("email", {
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: "Invalid email",
                                                            },
                                                        })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="your@email.com"
                                                    />
                                                    {errors.email && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.email.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        {...register("phone")}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="+91 XXXXX XXXXX"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Company
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("company")}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="Company name"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-white/80 mb-2">
                                                    Message *
                                                </label>
                                                <textarea
                                                    rows={5}
                                                    {...register("message", { required: "Message is required" })}
                                                    className="w-full rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all resize-none font-light"
                                                    placeholder="Describe your requirements..."
                                                />
                                                {errors.message && (
                                                    <p className="mt-1.5 text-xs text-red-400">
                                                        {errors.message.message}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent/90 hover:bg-accent px-8 py-4 font-heading text-sm font-bold text-navy transition-all overflow-hidden shadow-[0_0_15px_rgba(255,199,44,0.2)] hover:shadow-[0_0_25px_rgba(255,199,44,0.4)] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                            >
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[glass-shimmer_1.5s_linear]" />
                                                {isLoading ? (
                                                    "Sending..."
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>

                            {/* ===================== SIDEBAR ===================== */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="lg:col-span-2 space-y-6"
                            >
                                {/* Contact Cards */}
                                <div className="glass-panel p-8">
                                    <h3 className="font-heading text-xl font-bold text-white mb-8">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-6">
                                        {contactInfo.map((item) => (
                                            <div key={item.label} className="flex gap-4 group">
                                                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                                                    <item.icon className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-[10px] text-white/50 uppercase tracking-wider font-bold mb-1">
                                                        {item.label}
                                                    </p>
                                                    {item.href ? (
                                                        <a
                                                            href={item.href}
                                                            className="text-sm font-medium text-white/90 hover:text-accent transition-colors block"
                                                        >
                                                            {item.value}
                                                        </a>
                                                    ) : (
                                                        <p className="text-sm font-medium text-white/90">
                                                            {item.value}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Map / Image Placeholder */}
                                <div className="relative h-[220px] glass-panel overflow-hidden p-2 group">
                                    <div className="relative w-full h-full rounded-[var(--radius-card)] overflow-hidden">
                                        <Image
                                            src={images.atmosphere.containerYard}
                                            alt="Our operations"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean-dark)]/90 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                            <div className="flex items-center gap-2 rounded-full glass-panel px-5 py-2.5 backdrop-blur-md bg-white/10 border-white/20 shadow-lg">
                                                <MapPin className="h-4 w-4 text-accent" />
                                                <span className="text-sm font-bold text-white tracking-wide">
                                                    Mumbai, India
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick RFQ CTA */}
                                <div className="glass-panel p-8 relative overflow-hidden group hover:border-accent/30 transition-colors">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                                    <h3 className="font-heading text-xl font-bold text-white mb-2 relative z-10">
                                        Need a Quick Quote?
                                    </h3>
                                    <p className="text-sm text-white/60 mb-6 font-light relative z-10">
                                        Use our RFQ form for a detailed quotation on specific products.
                                    </p>
                                    <Link
                                        href="/rfq"
                                        className="inline-flex items-center justify-between w-full rounded-[var(--radius-btn)] border border-white/20 bg-white/5 px-6 py-4 font-heading text-sm font-bold text-white hover:bg-white/10 hover:border-white/40 transition-all relative z-10 group/btn"
                                    >
                                        Go to RFQ Form
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-navy group-hover/btn:scale-110 transition-transform">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
