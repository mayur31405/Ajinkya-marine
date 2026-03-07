"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="relative w-full bg-[#030914] text-white">
            {/* Global Ambient Background — Ocean Liquid Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none ocean-gradient-bg">
                <div className="bg-blob bg-blob-1" />
                <div className="bg-blob bg-blob-2" />
            </div>

            <main className="relative z-10 w-full overflow-hidden">
                {/* ===================== HERO SECTION ===================== */}
                <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-12">
                    {/* Background image constrained to hero with parallax and fading */}
                    <motion.div
                        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
                        style={{ y: yBackground }}
                    >
                        <Image
                            src={images.hero.cargoShip}
                            alt="Cargo ship at sea"
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030914]/50 to-[#030914]" />
                    </motion.div>

                    <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-20 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Text Content */}
                            <motion.div
                                className="lg:col-span-7"
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-6 backdrop-blur-3xl shadow-none">
                                    <Ship className="h-3.5 w-3.5" />
                                    Est. 2019 — Mumbai, India
                                </span>

                                <h1 className="font-heading text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 leading-[1.1] uppercase drop-shadow-sm">
                                    Industrial &amp; <br className="hidden sm:block" />
                                    <span className="text-accent drop-shadow-[0_0_15px_rgba(255,199,44,0.3)]">Food-Grade</span> <br />
                                    Chemicals
                                </h1>

                                <p className="mt-8 text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl font-light">
                                    Trusted global suppliers of premium seafood additives, food enzymes, and industrial chemicals — certified for safety, delivered with ocean-scale reliability.
                                </p>

                                <div className="mt-10 flex flex-wrap gap-4">
                                    <Link
                                        href="/products"
                                        className="group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent/90 hover:bg-accent px-8 py-4 font-heading text-sm font-bold text-navy transition-all overflow-hidden shadow-[0_0_20px_rgba(255,199,44,0.3)] hover:shadow-[0_0_30px_rgba(255,199,44,0.5)]"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[glass-shimmer_1.5s_linear]" />
                                        Explore Products
                                        <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <Link
                                        href="/rfq"
                                        className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] glass-panel px-8 py-4 font-heading text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/40 group"
                                    >
                                        Request a Quote
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Hero Right - Glass Panels */}
                            <motion.div
                                className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-6 relative"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            >
                                <div className="col-span-2 glass-panel p-6 sm:p-8 animate-float">
                                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                                        {stats.map((stat, idx) => (
                                            <div key={stat.label} className={idx % 2 !== 0 ? "pl-6 sm:pl-8 border-l border-white/10" : ""}>
                                                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">
                                                    {stat.value}
                                                </p>
                                                <p className="text-xs text-white/60 uppercase tracking-widest mt-2">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-1 glass-panel p-5 sm:p-6 group animate-float-delayed">
                                    <ShieldCheck className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-500" />
                                    <p className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                                        Certified
                                    </p>
                                    <p className="text-xs text-white/50">
                                        HACCP, ISO 9001
                                    </p>
                                </div>

                                <div className="col-span-1 glass-panel p-5 sm:p-6 group animate-float" style={{ animationDelay: "1s" }}>
                                    <Globe className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-500" />
                                    <p className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                                        Global
                                    </p>
                                    <p className="text-xs text-white/50">
                                        Import & Export
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===================== MARINE CAPABILITIES STRIP ===================== */}
                <section className="py-6 px-4">
                    <div className="mx-auto max-w-[1320px]">
                        <div className="glass-panel py-6 px-4 sm:px-10 rounded-full flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                            {[
                                { icon: Fish, text: "Seafood Processing" },
                                { icon: FlaskConical, text: "Food Additives" },
                                { icon: Egg, text: "Egg Products" },
                                { icon: Sparkles, text: "Food Enzymes" },
                                { icon: Truck, text: "Global Logistics" },
                            ].map((item) => (
                                <div key={item.text} className="flex items-center gap-2 group cursor-default">
                                    <item.icon className="h-5 w-5 text-accent group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="text-sm font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===================== PRODUCT CATEGORIES ===================== */}
                <section className="py-24 lg:py-32 relative">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20 relative z-10">
                        <SectionTitle
                            title="Refined Product Solutions"
                            subtitle="Explore our comprehensive range of high-performance food-grade and industrial chemicals."
                            light={true}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
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
                                        className="group block glass-panel h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-white/40"
                                    >
                                        <div className="relative h-56 w-full overflow-hidden rounded-t-[calc(var(--radius-card)-1px)]">
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                fill
                                                className="object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean-dark)] to-transparent opacity-90" />

                                            {/* Top left Icon Badge */}
                                            <div className="absolute top-4 left-4 glass-panel rounded-xl p-3 border-none bg-white/10">
                                                <card.icon className="h-6 w-6 text-accent" />
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow relative z-10">
                                            <h3 className="font-heading text-xl font-bold text-white mb-3">
                                                {card.title}
                                            </h3>
                                            <p className="text-sm text-white/60 leading-relaxed font-light mb-6 flex-grow">
                                                {card.desc}
                                            </p>
                                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent mt-auto group-hover:text-white transition-colors">
                                                Explore
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===================== FULL-WIDTH VISION ===================== */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 mix-blend-screen">
                        <Image
                            src={images.atmosphere.globalTrade}
                            alt="Global shipping and trade"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Dark gradient to blend the image edges */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030914] via-[#030914]/40 to-[#030914]" />

                    <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-20 flex justify-center">
                        <motion.div
                            className="glass-panel max-w-4xl p-10 md:p-16 text-center border-accent/20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase drop-shadow-lg">
                                Connecting India <br className="hidden md:block" /> to the <span className="text-accent">World</span>
                            </h2>
                            <p className="mt-6 text-white/70 text-lg md:text-xl font-light mx-auto max-w-2xl leading-relaxed">
                                Bridging the gap between global manufacturers and local supply chains with unmatched quality control, deep domain expertise, and a resilient logistics network.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ===================== WHY CHOOSE US ===================== */}
                <section className="py-24 lg:py-32 relative">
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />

                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Ajinkya</span> Advantage
                                </h2>
                                <p className="text-white/60 text-lg font-light mb-12">
                                    We deliver exactly what we promise — uncompromising standards at every stage of the supply chain.
                                </p>

                                <div className="space-y-4">
                                    {reasons.map((reason, i) => (
                                        <motion.div
                                            key={reason.title}
                                            className="glass-panel p-6 group transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                        >
                                            <div className="flex gap-5">
                                                <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-[var(--radius-btn)] bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                                                    <reason.icon className="h-6 w-6 text-accent" />
                                                </div>
                                                <div>
                                                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                                                        {reason.title}
                                                    </h3>
                                                    <p className="text-sm text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors">
                                                        {reason.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Image Side */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="hidden lg:flex flex-col items-center justify-center w-full"
                            >
                                <div className="relative aspect-[3/4] w-full max-w-sm rounded-[32px] overflow-hidden glass-panel p-2 mb-12">
                                    <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                                        <Image
                                            src={images.about.warehouse}
                                            alt="Our warehouse and operations"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean-dark)]/90 via-transparent to-transparent" />
                                    </div>
                                </div>
                                {/* Floating Badges (Outside the image) */}
                                <div className="flex items-center justify-center gap-6 z-20 w-full px-4">
                                    <div className="glass-panel p-4 shadow-2xl animate-float hover:-translate-y-2 transition-transform duration-300 backdrop-blur-3xl bg-white/10 border-white/20">
                                        <Globe className="h-8 w-8 text-accent mb-2" />
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap">20+ Countries</p>
                                    </div>
                                    <div className="glass-panel p-4 shadow-2xl animate-float-delayed hover:-translate-y-2 transition-transform duration-300 backdrop-blur-3xl bg-white/10 border-white/20">
                                        <Award className="h-8 w-8 text-accent mb-2" />
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap">Premium Quality</p>
                                    </div>
                                </div>
                            </motion.div>
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
                            {/* Inner ambient glow for CTA */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                            <h2 className="relative z-10 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Ready to Elevate Your Supply?
                            </h2>
                            <p className="relative z-10 mt-4 text-white/60 text-lg md:text-xl font-light mx-auto max-w-2xl mb-12">
                                Contact us today for bespoke chemical solutions, bulk orders, and competitive maritime logistics.
                            </p>
                            <div className="relative z-10 flex flex-wrap justify-center gap-6">
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
                                    Contact Sales
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>
        </div>
    );
}
