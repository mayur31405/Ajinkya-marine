"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/lib/products";
import { getProductImage, images } from "@/lib/images";
import { Search, ChevronDown, ChevronUp, ArrowRight, Package } from "lucide-react";

/* ===== Animation Variants ===== */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.5 },
    }),
};

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            activeCategory === "All" || product.category === activeCategory;
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                        src={images.atmosphere.laboratory}
                        alt="Product laboratory"
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
                                    <Package className="h-3.5 w-3.5" />
                                    Catalog
                                </span>
                                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 uppercase leading-tight drop-shadow-sm">
                                    Our <span className="text-accent drop-shadow-[0_0_15px_rgba(255,199,44,0.3)]">Products</span>
                                </h1>
                                <p className="mt-4 text-white/70 text-lg max-w-xl font-light">
                                    Explore our comprehensive catalog of food-grade and industrial
                                    chemicals, seafood additives, enzymes, and more.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===================== CATALOG ===================== */}
                <section className="py-16">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                        {/* Search + Filter */}
                        <div className="mb-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between glass-panel p-6">
                            {/* Search */}
                            <div className="relative w-full lg:w-96 shrink-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-[var(--radius-btn)] bg-white/5 border border-white/10 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                />
                            </div>

                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-2 lg:justify-end">
                                {["All", ...categories].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                                ? "bg-accent border-accent text-navy shadow-[0_0_15px_rgba(255,199,44,0.3)]"
                                                : "bg-[#030914]/50 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results count */}
                        <p className="mb-8 text-sm text-white/50 font-light">
                            Showing <strong className="text-white font-semibold">{filteredProducts.length}</strong> product
                            {filteredProducts.length !== 1 ? "s" : ""}
                            {activeCategory !== "All" && (
                                <> in <strong className="text-white font-semibold">{activeCategory}</strong></>
                            )}
                        </p>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        variants={fadeUp}
                                        className="group glass-panel flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-white/30"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-56 overflow-hidden rounded-t-[calc(var(--radius-card)-1px)]">
                                            <Image
                                                src={getProductImage(product.id)}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean-dark)]/90 via-transparent to-transparent" />
                                            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-accent/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-navy uppercase tracking-wider shadow-lg">
                                                <Package className="h-3 w-3" />
                                                {product.category}
                                            </span>
                                        </div>

                                        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                                            <h3 className="font-heading text-xl font-bold text-white mb-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-white/60 leading-relaxed font-light line-clamp-2 flex-grow">
                                                {product.description}
                                            </p>

                                            {/* Expandable Details */}
                                            <button
                                                onClick={() =>
                                                    setExpandedId(expandedId === product.id ? null : product.id)
                                                }
                                                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-white transition-colors self-start"
                                            >
                                                Specifications
                                                {expandedId === product.id ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {expandedId === product.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-4 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 p-5 space-y-3">
                                                            {product.specs &&
                                                                Object.entries(product.specs).map(([key, value]) => (
                                                                    <div key={key} className="flex justify-between text-sm items-center gap-4">
                                                                        <span className="text-white/50 capitalize font-light shrink-0">{key}</span>
                                                                        <span className="font-medium text-white/90 text-right truncate">{value}</span>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* RFQ Link */}
                                            <Link
                                                href={`/rfq?product=${encodeURIComponent(product.name)}`}
                                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 hover:bg-accent hover:text-navy hover:shadow-[0_0_15px_rgba(255,199,44,0.3)] px-5 py-2.5 text-sm font-bold text-accent transition-all self-start w-full justify-center"
                                            >
                                                Request Quote
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="py-24 text-center glass-panel mt-8">
                                <Package className="h-16 w-16 text-white/20 mx-auto mb-6" />
                                <p className="text-xl font-bold text-white">No products found</p>
                                <p className="text-white/50 mt-2 font-light">
                                    Try adjusting your search or filter criteria.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ===================== CTA ===================== */}
                <section className="py-16">
                    <div className="mx-auto max-w-[1320px] px-6 lg:px-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="glass-panel p-12 md:p-20 relative overflow-hidden w-full border-accent/20 inset-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />

                            <h2 className="relative z-10 font-heading text-3xl md:text-4xl font-bold text-white">
                                Can&apos;t find what you need?
                            </h2>
                            <p className="relative z-10 mt-4 text-white/60 text-lg font-light max-w-xl mx-auto mb-10">
                                We source custom products and formulations. Let us know your
                                requirements and we will leverage our global network.
                            </p>
                            <Link
                                href="/rfq"
                                className="relative z-10 group inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent/90 hover:bg-accent px-10 py-5 font-heading text-base font-bold text-navy transition-all overflow-hidden shadow-[0_0_20px_rgba(255,199,44,0.3)] hover:shadow-[0_0_40px_rgba(255,199,44,0.6)]"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[glass-shimmer_1.5s_linear]" />
                                Request Custom Quote
                                <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}
