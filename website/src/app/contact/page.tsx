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
        <>
            {/* Hero Banner */}
            <section className="relative h-[300px] lg:h-[400px] overflow-hidden">
                <Image
                    src={images.atmosphere.globalTrade}
                    alt="Global logistics"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70" />
                <div className="relative h-full flex items-center">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 backdrop-blur-sm border border-accent/30 px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-4">
                                <Anchor className="h-3.5 w-3.5" />
                                Get in Touch
                            </span>
                            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white uppercase">
                                Contact <span className="text-accent">Us</span>
                            </h1>
                            <p className="mt-4 text-white/70 text-lg max-w-xl">
                                Have questions? Need a quote? We&apos;re here to help with
                                your chemical sourcing needs.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 bg-light-grey">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="rounded-[var(--radius-card)] bg-white p-8 shadow-sm">
                                <h2 className="font-heading text-2xl font-bold text-dark-text mb-2">
                                    Send Us a Message
                                </h2>
                                <p className="text-sm text-medium-grey mb-8">
                                    Fill out the form below and we&apos;ll get back to you within
                                    24 hours.
                                </p>

                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 text-center"
                                    >
                                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                        <h3 className="font-heading text-2xl font-bold text-dark-text">
                                            Message Sent!
                                        </h3>
                                        <p className="text-medium-grey mt-2">
                                            Thank you for reaching out. We&apos;ll respond shortly.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="mt-6 text-sm font-semibold text-accent hover:text-accent-dark"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("name", { required: "Name is required" })}
                                                    className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                    placeholder="Your name"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.name.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-dark-text mb-1.5">
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
                                                    className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                    placeholder="your@email.com"
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...register("phone")}
                                                    className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                    placeholder="+91 XXXXX XXXXX"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                    Company
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("company")}
                                                    className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                    placeholder="Company name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                Message *
                                            </label>
                                            <textarea
                                                rows={5}
                                                {...register("message", { required: "Message is required" })}
                                                className="w-full rounded-[var(--radius-btn)] border border-gray-200 px-4 py-3 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                                                placeholder="Describe your requirements..."
                                            />
                                            {errors.message && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.message.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-3.5 font-heading text-sm font-bold text-navy transition-all hover:bg-accent-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                "Sending..."
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact Cards */}
                            <div className="rounded-[var(--radius-card)] bg-white p-8 shadow-sm">
                                <h3 className="font-heading text-lg font-bold text-dark-text mb-6">
                                    Contact Information
                                </h3>
                                <div className="space-y-5">
                                    {contactInfo.map((item) => (
                                        <div key={item.label} className="flex gap-4">
                                            <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                                <item.icon className="h-5 w-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-medium-grey uppercase tracking-wider font-semibold">
                                                    {item.label}
                                                </p>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-sm font-medium text-dark-text hover:text-accent transition-colors"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm font-medium text-dark-text">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Map / Image Placeholder */}
                            <div className="relative h-[200px] rounded-[var(--radius-card)] overflow-hidden shadow-sm">
                                <Image
                                    src={images.atmosphere.containerYard}
                                    alt="Our operations"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-navy/40 flex items-center justify-center">
                                    <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2">
                                        <MapPin className="h-4 w-4 text-navy" />
                                        <span className="text-sm font-bold text-navy">
                                            Mumbai, India
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick RFQ */}
                            <div className="rounded-[var(--radius-card)] bg-navy p-8">
                                <h3 className="font-heading text-lg font-bold text-white mb-2">
                                    Need a Quick Quote?
                                </h3>
                                <p className="text-sm text-white/60 mb-6">
                                    Use our RFQ form for a detailed quotation.
                                </p>
                                <Link
                                    href="/rfq"
                                    className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 font-heading text-sm font-bold text-navy hover:bg-accent-dark transition-all"
                                >
                                    Request a Quote
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
