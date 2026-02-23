"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { images } from "@/lib/images";
import {
    ArrowRight,
    ShieldCheck,
    Heart,
    Target,
    Users,
    Globe,
    Award,
    CheckCircle2,
    Sparkles,
    Anchor,
} from "lucide-react";

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
        <>
            {/* Hero Banner */}
            <section className="relative h-[350px] lg:h-[450px] overflow-hidden">
                <Image
                    src={images.about.shipping}
                    alt="Shipping and logistics"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/60" />
                <div className="relative h-full flex items-center">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 backdrop-blur-sm border border-accent/30 px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-4">
                                <Anchor className="h-3.5 w-3.5" />
                                Our Story
                            </span>
                            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white uppercase">
                                About <span className="text-accent">Ajinkya Marine</span>
                            </h1>
                            <p className="mt-4 text-white/70 text-lg max-w-xl">
                                From a vision of excellence to a trusted name in marine
                                chemicals — discover our journey.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Company Story */}
            <section className="py-20 lg:py-[100px]">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden shadow-lg">
                                <Image
                                    src={images.about.warehouse}
                                    alt="Our warehouse facility"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Accent overlay card */}
                            <div className="absolute -bottom-6 -right-6 rounded-[var(--radius-card)] bg-accent p-6 shadow-lg hidden md:block">
                                <p className="font-heading text-lg font-extrabold text-navy">
                                    Founded in 2019
                                </p>
                                <p className="text-sm text-navy/70">Mumbai, India</p>
                            </div>
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-text mb-6">
                                Our <span className="text-accent">Story</span>
                            </h2>
                            <p className="text-medium-grey leading-relaxed mb-4">
                                Ajinkya Marine Pvt. Ltd. was founded in 2019 by{" "}
                                <strong className="text-dark-text">Aditya Bhagwat</strong> in
                                Mumbai, India, with a clear mission: to bridge the gap between
                                global chemical manufacturers and Indian industries that need
                                premium-quality food-grade and industrial chemicals.
                            </p>
                            <p className="text-medium-grey leading-relaxed mb-4">
                                Starting with a focus on seafood processing chemicals, we
                                quickly expanded our portfolio to include food additives,
                                enzymes, egg products, sugars, sweeteners, and specialty
                                minerals — all sourced from trusted global suppliers and
                                delivered with rigorous quality standards.
                            </p>
                            <p className="text-medium-grey leading-relaxed">
                                Today, we serve over <strong className="text-dark-text">100 B2B clients</strong> across{" "}
                                <strong className="text-dark-text">20+ countries</strong>, with
                                a reputation built on consistency, transparency, and deep
                                domain expertise in marine and food chemistry.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-light-grey">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <SectionTitle
                        title="Our Core Values"
                        subtitle="The principles that guide every decision we make."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((value, i) => (
                            <motion.div
                                key={value.title}
                                custom={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="rounded-[var(--radius-card)] bg-white p-8 shadow-sm hover:shadow-md transition-all text-center group"
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 group-hover:bg-accent transition-colors">
                                    <value.icon className="h-7 w-7 text-accent group-hover:text-navy transition-colors" />
                                </div>
                                <h3 className="font-heading text-lg font-bold text-dark-text mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-medium-grey leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Full-Width Image Divider */}
            <section className="relative h-[300px] overflow-hidden">
                <Image
                    src={images.about.teamwork}
                    alt="Our team at work"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy/60" />
                <div className="relative h-full flex items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white uppercase">
                            Driven by <span className="text-accent">People</span>,{" "}
                            Built on <span className="text-accent">Trust</span>
                        </h2>
                    </motion.div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 lg:py-[100px]">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <SectionTitle
                        title="Quality & Compliance"
                        subtitle="Our commitment to safety and quality is backed by internationally recognized certifications."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        {certifications.map((cert, i) => (
                            <motion.div
                                key={cert.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="rounded-[var(--radius-card)] overflow-hidden bg-white shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <Image
                                        src={cert.image}
                                        alt={cert.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-navy/20" />
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                                            <CheckCircle2 className="h-4 w-4 text-navy" />
                                        </div>
                                        <h3 className="font-heading text-lg font-bold text-white">
                                            {cert.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                                        {cert.fullName}
                                    </p>
                                    <p className="text-sm text-medium-grey leading-relaxed">
                                        {cert.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-light-grey">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <SectionTitle
                        title="Our Journey"
                        subtitle="Key milestones in our growth from startup to trusted industry partner."
                    />
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 -translate-x-1/2" />

                        <div className="space-y-12">
                            {milestones.map((ms, i) => (
                                <motion.div
                                    key={ms.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        } gap-8`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent border-4 border-light-grey z-10" />

                                    {/* Content Card */}
                                    <div
                                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"
                                            }`}
                                    >
                                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-navy">
                                            {ms.year}
                                        </span>
                                        <h3 className="font-heading text-lg font-bold text-dark-text mt-2">
                                            {ms.title}
                                        </h3>
                                        <p className="text-sm text-medium-grey leading-relaxed mt-1">
                                            {ms.desc}
                                        </p>
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={images.atmosphere.globalTrade}
                        alt="Global trade"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/85" />
                </div>
                <div className="relative mx-auto max-w-[1320px] px-6 lg:px-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                            Partner with <span className="text-accent">Ajinkya Marine</span>
                        </h2>
                        <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
                            Let&apos;s build a reliable supply chain together. Get in touch to
                            discuss your requirements.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/rfq"
                                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-4 font-heading text-sm font-bold text-navy hover:bg-accent-dark transition-all hover:shadow-lg"
                            >
                                Request a Quote
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border-2 border-white/40 px-8 py-4 font-heading text-sm font-bold text-white hover:border-accent hover:text-accent transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
