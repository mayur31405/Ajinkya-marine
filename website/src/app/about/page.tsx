"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { images } from "@/lib/images";
import {
    ArrowRight,
    Heart,
    Target,
    Users,
    CheckCircle2,
    Sparkles,
    Anchor,
} from "lucide-react";

/* ===== Core Values data ===== */
const coreValues = [
    {
        icon: Target,
        title: "Precision",
        desc: "Every product sourced and delivered with meticulous attention to quality and specifications.",
    },
    {
        icon: Heart,
        title: "Integrity",
        desc: "Transparent business practices, honest pricing, and reliable partnerships.",
    },
    {
        icon: Sparkles,
        title: "Innovation",
        desc: "Continuously expanding our catalog with cutting-edge food-grade solutions.",
    },
    {
        icon: Users,
        title: "Customer Focus",
        desc: "Personalized service, custom formulations, and dedicated account management.",
    },
];

/* ===== Certifications data ===== */
const certifications = [
    {
        name: "HACCP",
        fullName: "Hazard Analysis Critical Control Points",
        desc: "Systematic approach to food safety, identifying and controlling biological, chemical, and physical hazards.",
        image: images.certifications.haccp,
    },
    {
        name: "ISO 9001",
        fullName: "Quality Management System",
        desc: "International standard for quality management, ensuring consistent products and services.",
        image: images.certifications.iso9001,
    },
    {
        name: "FSSAI",
        fullName: "Food Safety & Standards Authority of India",
        desc: "Licensed and compliant with India's food safety regulatory framework.",
        image: images.certifications.fssai,
    },
    {
        name: "MSME",
        fullName: "Ministry of MSME Registered",
        desc: "Recognized enterprise under the Government of India's MSME development program.",
        image: images.certifications.msme,
    },
];

/* ===== Milestones data ===== */
const milestones = [
    { year: "2019", title: "Company Founded", desc: "Ajinkya Marine Pvt. Ltd. established in Mumbai by Aditya Bhagwat." },
    { year: "2020", title: "First Major Export", desc: "Secured our first international export contract for seafood chemicals." },
    { year: "2021", title: "ISO 9001 Certified", desc: "Achieved ISO 9001 quality management certification." },
    { year: "2022", title: "Product Expansion", desc: "Expanded catalog to include food enzymes, egg products, and sweeteners." },
    { year: "2023", title: "HACCP Compliant", desc: "Full HACCP compliance achieved across all operations." },
    { year: "2024", title: "Global Presence", desc: "Supply network expanded to 20+ countries across Asia, Middle East, and Africa." },
];

export default function AboutPage() {
    return (
        <div className="relative w-full bg-[#030914] text-white">
            {/* Global Ambient Background — Ocean Liquid Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none ocean-gradient-bg">
                <div className="bg-blob bg-blob-1" />
                <div className="bg-blob bg-blob-2" />
            </div>

            <main className="relative z-10 w-full overflow-hidden">
                {/* ===================== HERO BANNER ===================== */}
                <section className="relative h-[350px] lg:h-[450px] overflow-hidden">
                    <Image
                        src={images.about.shipping}
                        alt="Shipping and logistics"
                        fill
                        className="object-cover opacity-40 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030914]/50 to-[#030914]" />
                    <div className="relative h-full flex items-center">
                        <div className="mx-auto max-w-[1320px] px-6 lg:px-20 w-full mt-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-4 border-none shadow-none">
                                    <Anchor className="h-3.5 w-3.5" />
                                    Our Story
                                </span>
                                <h1 className="font-heading text-4xl md:text-5xl lg:text-[64px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 uppercase leading-tight drop-shadow-sm">
                                    About <span className="text-accent drop-shadow-[0_0_15px_rgba(255,199,44,0.3)]">Ajinkya Marine</span>
                                </h1>
                                <p className="mt-6 text-white/70 text-lg max-w-2xl font-light leading-relaxed">
                                    From a vision of excellence to a trusted name in marine
                                    chemicals — discover our journey.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===================== COMPANY STORY ===================== */}
                <section className="py-20 lg:py-32">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            {/* Image Side */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden glass-panel p-2">
                                    <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                                        <Image
                                            src={images.about.warehouse}
                                            alt="Our warehouse facility"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean-dark)]/90 via-transparent to-transparent" />
                                    </div>
                                </div>
                                {/* Floating Overlay Card */}
                                <div className="absolute -bottom-6 -right-6 glass-panel p-6 shadow-2xl hidden md:block animate-float">
                                    <p className="font-heading text-xl font-extrabold text-white">
                                        Founded in <span className="text-accent">2019</span>
                                    </p>
                                    <p className="text-sm text-white/60 tracking-wider uppercase mt-1">Mumbai, India</p>
                                </div>
                            </motion.div>

                            {/* Text Side */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
                                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Story</span>
                                </h2>
                                <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
                                    <p>
                                        Ajinkya Marine Pvt. Ltd. was founded in 2019 by{" "}
                                        <strong className="text-white font-medium">Aditya Bhagwat</strong> in
                                        Mumbai, India, with a clear mission: to bridge the gap between
                                        global chemical manufacturers and Indian industries that need
                                        premium-quality food-grade and industrial chemicals.
                                    </p>
                                    <p>
                                        Starting with a focus on seafood processing chemicals, we
                                        quickly expanded our portfolio to include food additives,
                                        enzymes, egg products, sugars, sweeteners, and specialty
                                        minerals — all sourced from trusted global suppliers and
                                        delivered with rigorous quality standards.
                                    </p>
                                    <p>
                                        Today, we serve over <strong className="text-accent font-medium">100+ B2B clients</strong> across{" "}
                                        <strong className="text-accent font-medium">20+ countries</strong>, with
                                        a reputation built on consistency, transparency, and deep
                                        domain expertise in marine and food chemistry.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===================== CORE VALUES ===================== */}
                <section className="py-24 relative">
                    {/* Add a subtle glow behind values */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-[100%] pointer-events-none" />

                    <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-20">
                        <SectionTitle
                            title="Our Core Values"
                            subtitle="The principles that guide every decision we make."
                            light={true}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
                            {coreValues.map((value, i) => (
                                <motion.div
                                    key={value.title}
                                    custom={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="glass-panel p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/40 group"
                                >
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[var(--radius-btn)] bg-white/5 border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/40 transition-colors">
                                        <value.icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="font-heading text-xl font-bold text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors">
                                        {value.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===================== FULL-WIDTH DIVIDER ===================== */}
                <section className="relative h-[400px] overflow-hidden my-12">
                    <Image
                        src={images.about.teamwork}
                        alt="Our team at work"
                        fill
                        className="object-cover opacity-50 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030914] via-transparent to-[#030914]" />
                    <div className="absolute inset-0 bg-navy/60 mix-blend-multiply" />

                    <div className="relative h-full flex items-center justify-center text-center px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="glass-panel p-10 md:p-14 max-w-4xl border-accent/20"
                        >
                            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white uppercase leading-tight drop-shadow-lg">
                                Driven by <span className="text-accent">People</span>,{" "}
                                Built on <span className="text-accent">Trust</span>
                            </h2>
                        </motion.div>
                    </div>
                </section>

                {/* ===================== CERTIFICATIONS ===================== */}
                <section className="py-24">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                        <SectionTitle
                            title="Quality & Compliance"
                            subtitle="Our commitment to safety and quality is backed by internationally recognized certifications."
                            light={true}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mt-16">
                            {certifications.map((cert, i) => (
                                <motion.div
                                    key={cert.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="glass-panel overflow-hidden transition-all duration-500 hover:border-white/30 group flex flex-col sm:flex-row"
                                >
                                    {/* Image Left */}
                                    <div className="relative h-48 sm:h-auto sm:w-2/5 overflow-hidden">
                                        <Image
                                            src={cert.image}
                                            alt={cert.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#030914] hidden sm:block opacity-90" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030914] to-transparent sm:hidden opacity-90" />
                                    </div>

                                    {/* Content Right */}
                                    <div className="p-8 sm:w-3/5 relative flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 border border-accent/30 text-accent group-hover:bg-accent group-hover:text-navy transition-colors">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>
                                            <h3 className="font-heading text-2xl font-bold text-white">
                                                {cert.name}
                                            </h3>
                                        </div>
                                        <p className="text-xs font-bold text-accent uppercase tracking-wider mb-3">
                                            {cert.fullName}
                                        </p>
                                        <p className="text-sm text-white/60 leading-relaxed font-light">
                                            {cert.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===================== TIMELINE ===================== */}
                <section className="py-24 relative">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                        <SectionTitle
                            title="Our Journey"
                            subtitle="Key milestones in our growth from startup to trusted industry partner."
                            light={true}
                        />
                        <div className="relative mt-16 max-w-4xl mx-auto">
                            {/* Vertical Line via Glass effect */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full" />

                            <div className="space-y-12">
                                {milestones.map((ms, i) => (
                                    <motion.div
                                        key={ms.year}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.6 }}
                                        className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                            }`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-accent border-[4px] border-[#030914] z-20 shadow-[0_0_10px_rgba(255,199,44,0.5)]" />

                                        {/* Edge Spacer */}
                                        <div className="hidden md:block w-1/2" />

                                        {/* Content Card */}
                                        <div
                                            className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"
                                                }`}
                                        >
                                            <div className="glass-panel p-6 sm:p-8 hover:border-white/30 transition-colors inline-block w-full">
                                                <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-bold text-accent mb-4">
                                                    {ms.year}
                                                </span>
                                                <h3 className="font-heading text-xl font-bold text-white mb-2">
                                                    {ms.title}
                                                </h3>
                                                <p className="text-sm text-white/60 leading-relaxed font-light">
                                                    {ms.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================== CTA ===================== */}
                <section className="py-24 lg:py-32">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="glass-panel p-12 md:p-20 relative overflow-hidden w-full border-accent/20 inset-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                            <h2 className="relative z-10 font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                                Partner with <span className="text-accent">Ajinkya Marine</span>
                            </h2>
                            <p className="relative z-10 mt-4 text-white/60 text-lg font-light mx-auto max-w-2xl mb-12 flex-grow">
                                Let&apos;s build a reliable supply chain together. Get in touch to discuss your requirements.
                            </p>

                            <div className="relative z-10 flex flex-wrap justify-center gap-6 mt-10">
                                <Link
                                    href="/rfq"
                                    className="group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent/90 hover:bg-accent px-10 py-5 font-heading text-base font-bold text-navy transition-all overflow-hidden shadow-[0_0_20px_rgba(255,199,44,0.3)] hover:shadow-[0_0_40px_rgba(255,199,44,0.6)]"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[glass-shimmer_1.5s_linear]" />
                                    Request a Quote
                                    <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] glass-panel px-10 py-5 font-heading text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/40 border-white/20"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>
        </div>
    );
}
