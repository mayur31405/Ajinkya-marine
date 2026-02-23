"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { products, categories } from "@/lib/products";
import { getProductImage, images } from "@/lib/images";
import { Search, ChevronDown, ChevronUp, ArrowRight, Package } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.5 },
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
        <>
            {/* Hero Banner */}
            <section className="relative h-[300px] lg:h-[400px] overflow-hidden">
                <Image
                    src={images.atmosphere.laboratory}
                    alt="Product laboratory"
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
                            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white uppercase">
                                Our <span className="text-accent">Products</span>
                            </h1>
                            <p className="mt-4 text-white/70 text-lg max-w-xl">
                                Explore our comprehensive catalog of food-grade and industrial
                                chemicals, seafood additives, enzymes, and more.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 bg-light-grey">
                <div className="mx-auto max-w-[1320px] px-6 lg:px-20">
                    {/* Search + Filter */}
                    <div className="mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-medium-grey" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-[var(--radius-btn)] border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            />
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {["All", ...categories].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat
                                            ? "bg-accent text-navy shadow-sm"
                                            : "bg-white text-medium-grey hover:bg-navy/5 hover:text-navy border border-gray-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="mb-6 text-sm text-medium-grey">
                        Showing <strong className="text-dark-text">{filteredProducts.length}</strong> product
                        {filteredProducts.length !== 1 ? "s" : ""}
                        {activeCategory !== "All" && (
                            <> in <strong className="text-dark-text">{activeCategory}</strong></>
                        )}
                    </p>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-30px" }}
                                variants={fadeUp}
                                className="group rounded-[var(--radius-card)] bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Product Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={getProductImage(product.id)}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold text-navy uppercase tracking-wider">
                                        <Package className="h-3 w-3" />
                                        {product.category}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-heading text-lg font-bold text-dark-text mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-medium-grey leading-relaxed line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Expandable Details */}
                                    <button
                                        onClick={() =>
                                            setExpandedId(expandedId === product.id ? null : product.id)
                                        }
                                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-accent transition-colors"
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
                                                <div className="mt-3 rounded-lg bg-light-grey p-4 space-y-2">
                                                    {product.specs &&
                                                        Object.entries(product.specs).map(([key, value]) => (
                                                            <div key={key} className="flex justify-between text-sm">
                                                                <span className="text-medium-grey capitalize">{key}</span>
                                                                <span className="font-medium text-dark-text">{value}</span>
                                                            </div>
                                                        ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* RFQ Link */}
                                    <Link
                                        href={`/rfq?product=${encodeURIComponent(product.name)}`}
                                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                                    >
                                        Request Quote
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center">
                            <Package className="h-12 w-12 text-medium-grey mx-auto mb-4" />
                            <p className="text-lg font-medium text-dark-text">No products found</p>
                            <p className="text-sm text-medium-grey mt-1">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={images.atmosphere.containerYard}
                        alt="Container yard"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/85" />
                </div>
                <div className="relative mx-auto max-w-[1320px] px-6 lg:px-20 text-center">
                    <h2 className="font-heading text-3xl font-bold text-white">
                        Can&apos;t find what you need?
                    </h2>
                    <p className="mt-3 text-white/60 max-w-md mx-auto">
                        We source custom products and formulations. Let us know your
                        requirements.
                    </p>
                    <Link
                        href="/rfq"
                        className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-8 py-4 font-heading text-sm font-bold text-navy hover:bg-accent-dark transition-all hover:shadow-lg"
                    >
                        Request Custom Quote
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
