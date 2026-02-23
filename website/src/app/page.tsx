"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { images } from "@/lib/images";
import {
    Fish,
    FlaskConical,
    Egg,
    Sparkles,
    ShieldCheck,
    Award,
    Truck,
    Globe,
    ArrowRight,
    CheckCircle2,
    Anchor,
    Ship,
} from "lucide-react";

/* ===== Animation variants ===== */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
    }),
};

/* ===== Product Category data ===== */
const categoryCards = [
    {
        icon: Fish,
        title: "Seafood Chemicals",
        desc: "Premium preservatives and processing chemicals for the seafood industry.",
        href: "/products",
        image: images.categories.seafoodChemicals,
    },
    {
        icon: FlaskConical,
        title: "Food Additives",
        desc: "High-quality additives, preservatives, and functional ingredients.",
        href: "/products",
        image: images.categories.foodAdditives,
    },
    {
        icon: Egg,
        title: "Egg Products",
        desc: "Spray-dried egg powders for bakery, confectionery, and food manufacturing.",
        href: "/products",
        image: images.categories.eggProducts,
    },
    {
        icon: Sparkles,
        title: "Enzymes",
        desc: "Advanced food-grade enzymes for processing and flavor enhancement.",
        href: "/products",
        image: images.categories.enzymes,
    },
    {
        icon: FlaskConical,
        title: "Sugars & Sweeteners",
        desc: "Dextrose, maltodextrin, sorbitol, and specialty sweeteners.",
        href: "/products",
        image: images.categories.sugars,
    },
    {
        icon: Globe,
        title: "Salts & Minerals",
        desc: "Industrial and food-grade salts, calcium compounds, and minerals.",
        href: "/products",
        image: images.categories.salts,
    },
];

/* ===== Why Choose Us data ===== */
const reasons = [
    {
        icon: ShieldCheck,
        title: "Quality Assured",
        desc: "HACCP, ISO 9001 & FSSAI certified processes ensure every product meets international standards.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        desc: "Import/export capabilities spanning major markets with reliable logistics partnerships.",
    },
    {
        icon: Truck,
        title: "Reliable Supply",
        desc: "Consistent stock management and on-time delivery to keep your operations running smoothly.",
    },
    {
        icon: Award,
        title: "Industry Expertise",
        desc: "Deep domain knowledge in marine chemicals, food additives, and seafood processing since 2019.",
    },
];


/* ===== Stats ===== */
const stats = [
    { value: "50+", label: "Products" },
    { value: "100+", label: "Clients Served" },
    { value: "6+", label: "Years Experience" },
    { value: "20+", label: "Countries" },
];

export default function HomePage() {
    return (
        <>
            {/* ===================== HERO WITH CARGO SHIP BACKGROUND ===================== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={images.hero.cargoShip}
                        alt="Cargo ship at sea"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
                    {/* Bottom gradient for smooth transition */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/90 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative mx-auto max-w-[1320px] px-6 lg:px-20 py-24 lg:py-32 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 backdrop-blur-sm border border-accent/30 px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-6">
                                <Ship className="h-3.5 w-3.5" />
                                Est. 2019 — Mumbai, India
                            </span>
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.08] uppercase">
                                Industrial &amp;{" "}
                                <span className="text-accent">Food-Grade</span>{" "}
                                <br className="hidden md:block" />
                                Marine Chemicals
                            </h1>
                            <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
                                Ajinkya Marine Pvt. Ltd. is a trusted importer &amp; exporter of
                                premium seafood additives, food enzymes, egg products, and
                                industrial chemicals — serving B2B clients worldwide with
                                HACCP, ISO &amp; FSSAI certified quality.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-7 py-4 font-heading text-sm font-bold text-navy transition-all hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                                >
                                    Explore Products
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/rfq"
                                    className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border-2 border-white/40 backdrop-blur-sm px-7 py-4 font-heading text-sm font-bold text-white transition-all hover:border-accent hover:text-accent hover:bg-white/5"
                                >
                                    Request a Quote
                                </Link>
                            </div>

                            {/* Stats row */}
                            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="font-heading text-3xl font-extrabold text-accent">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-white/60 uppercase tracking-wider mt-1">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating elements on desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                            className="hidden lg:flex flex-col items-end gap-4"
                        >
                            {/* Certification Card */}
                            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-10 w-10 text-accent" />
                                    <div>
                                        <p className="text-sm font-bold text-white">
                                            Quality Certified
                                        </p>
                                        <p className="text-xs text-white/60">
                                            HACCP · ISO 9001 · FSSAI
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Global Reach Card */}
                            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-10 w-10 text-accent" />
                                    <div>
                                        <p className="text-sm font-bold text-white">
                                            Global Trade Network
                                        </p>
                                        <p className="text-xs text-white/60">
                                            Import & Export · 20+ Countries
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===================== IMAGE STRIP - WHAT WE DO ===================== */}
            <section className="py-4 bg-accent">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <div className="flex flex-wrap items-center justify-center gap-8 text-navy">
                        {[
                            { icon: Fish, text: "Seafood Processing" },
                            { icon: FlaskConical, text: "Food Additives" },
                            { icon: Egg, text: "Egg Products" },
                            { icon: Sparkles, text: "Food Enzymes" },
                            { icon: Truck, text: "Global Logistics" },
                            { icon: ShieldCheck, text: "Quality Certified" },
                        ].map((item) => (
                            <div key={item.text} className="flex items-center gap-2">
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== PRODUCT CATEGORIES WITH IMAGES ===================== */}
            <section className="py-20 lg:py-[100px] bg-light-grey">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <SectionTitle
                        title="Our Product Range"
                        subtitle="We supply a comprehensive range of food-grade and industrial chemicals for seafood processing, food manufacturing, and more."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {categoryCards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={fadeUp}
                            >
                                <Link
                                    href={card.href}
                                    className="group block rounded-[var(--radius-card)] bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Category Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 inline-flex items-center justify-center rounded-lg bg-accent p-2">
                                            <card.icon className="h-5 w-5 text-navy" />
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="font-heading text-xl font-bold text-dark-text mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-medium-grey leading-relaxed">
                                            {card.desc}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:text-accent transition-colors">
                                            View Products
                                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== FULL-WIDTH IMAGE SECTION ===================== */}
            <section className="relative h-[400px] overflow-hidden">
                <Image
                    src={images.atmosphere.globalTrade}
                    alt="Global shipping and trade"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy/70" />
                <div className="relative h-full flex items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white uppercase">
                            Connecting India to the{" "}
                            <span className="text-accent">World</span>
                        </h2>
                        <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
                            From sourcing premium chemicals globally to delivering them at
                            your doorstep — we bridge the gap between suppliers and
                            manufacturers.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ===================== WHY CHOOSE US ===================== */}
            <section className="py-20 lg:py-[100px]">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
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
                                    alt="Our warehouse and operations"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating accent box */}
                            <div className="absolute -bottom-6 -right-6 rounded-[var(--radius-card)] bg-accent p-6 shadow-lg hidden md:block">
                                <p className="font-heading text-4xl font-extrabold text-navy">
                                    6+
                                </p>
                                <p className="text-sm font-bold text-navy/70">
                                    Years of Excellence
                                </p>
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-text mb-8">
                                Why Choose{" "}
                                <span className="text-accent">Ajinkya Marine?</span>
                            </h2>
                            <div className="space-y-6">
                                {reasons.map((reason, i) => (
                                    <div key={reason.title} className="flex gap-4">
                                        <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                                            <reason.icon className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-lg font-bold text-dark-text">
                                                {reason.title}
                                            </h3>
                                            <p className="text-sm text-medium-grey leading-relaxed mt-1">
                                                {reason.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===================== CERTIFICATIONS WITH IMAGES ===================== */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={images.about.qualityControl}
                        alt="Quality control laboratory"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/90" />
                </div>
                <div className="relative mx-auto max-w-[1320px] px-6 lg:px-20">
                    <div className="text-center mb-10">
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                            Trusted Quality,{" "}
                            <span className="text-accent">Global Standards</span>
                        </h2>
                        <p className="mt-2 text-white/60 text-sm max-w-md mx-auto">
                            Our products and processes comply with internationally
                            recognized safety and quality standards.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                        {[
                            { name: "HACCP", full: "Hazard Analysis Critical Control Points", image: images.certifications.haccp },
                            { name: "ISO 9001", full: "Quality Management System", image: images.certifications.iso9001 },
                            { name: "FSSAI", full: "Food Safety Standards Authority", image: images.certifications.fssai },
                            { name: "MSME", full: "Ministry of MSME Registered", image: images.certifications.msme },
                        ].map((cert) => (
                            <motion.div
                                key={cert.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="rounded-[var(--radius-card)] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group"
                            >
                                <div className="relative h-32 overflow-hidden">
                                    <Image
                                        src={cert.image}
                                        alt={cert.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-navy/40" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <CheckCircle2 className="h-10 w-10 text-accent drop-shadow-lg" />
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-heading text-base font-bold text-accent">
                                        {cert.name}
                                    </h3>
                                    <p className="text-[11px] text-white/50 mt-1 leading-tight">
                                        {cert.full}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== IMAGE GALLERY STRIP ===================== */}
            <section className="py-2 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        { src: images.atmosphere.containerYard, alt: "Container yard" },
                        { src: images.atmosphere.seafood, alt: "Seafood processing" },
                        { src: images.atmosphere.laboratory, alt: "Quality testing" },
                        { src: images.atmosphere.factory, alt: "Manufacturing facility" },
                    ].map((img) => (
                        <div key={img.alt} className="relative h-48 md:h-56 overflow-hidden">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-navy/20 hover:bg-navy/0 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ===================== CTA ===================== */}
            <section className="py-20 lg:py-[100px] bg-light-grey">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-text">
                            Ready to Get Started?
                        </h2>
                        <p className="mt-4 text-medium-grey text-lg max-w-xl mx-auto">
                            Whether you need bulk chemicals, food additives, or custom
                            formulations — we&apos;re here to help. Request a quote today.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/rfq"
                                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-4 font-heading text-sm font-bold text-navy transition-all hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                            >
                                Request a Quote
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border-2 border-navy/20 px-8 py-4 font-heading text-sm font-bold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
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
