"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { images } from "@/lib/images";
import {
    CheckCircle2,
    X,
    Upload,
    Send,
    FileText,
    Anchor,
    ChevronDown,
} from "lucide-react";

interface RFQFormData {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    quantity: string;
    deliveryLocation: string;
    message: string;
}

export default function RFQForm() {
    const searchParams = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RFQFormData>();

    // Pre-select products from URL params
    useEffect(() => {
        const product = searchParams.get("product");
        if (product) {
            setSelectedProducts((prev) =>
                prev.includes(product) ? prev : [...prev, product]
            );
        }
    }, [searchParams]);

    const toggleProduct = (name: string) => {
        setSelectedProducts((prev) =>
            prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
        );
    };

    const onSubmit = async (data: RFQFormData) => {
        if (selectedProducts.length === 0) return;
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => formData.append(key, value));
            selectedProducts.forEach((p) => formData.append("selectedProducts", p));
            if (file) formData.append("file", file);

            const res = await fetch("/api/rfq", { method: "POST", body: formData });
            if (res.ok) {
                setSubmitted(true);
                reset();
                setSelectedProducts([]);
                setFile(null);
            } else {
                const result = await res.json().catch(() => null);
                setErrorMessage(
                    result?.error || "Something went wrong. Please try again later."
                );
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
                        src={images.atmosphere.containerYard}
                        alt="Container yard operations"
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
                                    Request for Quotation
                                </span>
                                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 uppercase leading-tight drop-shadow-sm">
                                    Get a <span className="text-accent drop-shadow-[0_0_15px_rgba(255,199,44,0.3)]">Quote</span>
                                </h1>
                                <p className="mt-4 text-white/70 text-lg max-w-xl font-light">
                                    Tell us what you need and our team will provide a customized
                                    quotation within 24 hours.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-16 relative">
                    {/* Background glow behind form */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative z-10 mx-auto max-w-[900px] px-6 lg:px-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="glass-panel p-8 lg:p-12 relative overflow-visible"
                        >
                            {/* Inner Top Right Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />

                            <div className="relative z-10">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 text-center"
                                    >
                                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 border border-accent/20 mb-6">
                                            <CheckCircle2 className="h-10 w-10 text-accent" />
                                        </div>
                                        <h2 className="font-heading text-3xl font-bold text-white mb-3">
                                            RFQ Submitted Successfully!
                                        </h2>
                                        <p className="text-white/60 font-light max-w-md mx-auto mb-8">
                                            Our team will review your request and send a customized quote
                                            within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                                        >
                                            Submit another RFQ
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 shrink-0">
                                                <FileText className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <h2 className="font-heading text-2xl font-bold text-white">
                                                    RFQ Form
                                                </h2>
                                                <p className="text-xs text-white/50 font-light mt-1">
                                                    Fields marked * are required
                                                </p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                            {/* Company & Contact */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Company Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("companyName", { required: "Required" })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="Your company"
                                                    />
                                                    {errors.companyName && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.companyName.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Contact Person *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("contactPerson", { required: "Required" })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="Full name"
                                                    />
                                                    {errors.contactPerson && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.contactPerson.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        {...register("email", {
                                                            required: "Required",
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: "Invalid email",
                                                            },
                                                        })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="you@company.com"
                                                    />
                                                    {errors.email && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.email.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Phone *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        {...register("phone", { required: "Required" })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="+91 XXXXX XXXXX"
                                                    />
                                                    {errors.phone && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.phone.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product Selection */}
                                            <div className="relative z-30">
                                                <label className="block text-sm font-semibold text-white/80 mb-2">
                                                    Select Products *
                                                </label>
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-left text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all flex items-center justify-between font-light"
                                                    >
                                                        <span className={selectedProducts.length === 0 ? "text-white/40" : ""}>
                                                            {selectedProducts.length === 0
                                                                ? "Choose products..."
                                                                : `${selectedProducts.length} product(s) selected`}
                                                        </span>
                                                        <ChevronDown
                                                            className={`h-4 w-4 text-white/50 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                                                        />
                                                    </button>

                                                    {dropdownOpen && (
                                                        <div className="absolute z-50 mt-2 w-full max-h-[300px] overflow-y-auto rounded-[16px] border border-white/10 bg-[#0a1223] backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                                            <div className="p-2 space-y-1">
                                                                {products.map((p) => (
                                                                    <button
                                                                        key={p.id}
                                                                        type="button"
                                                                        onClick={() => toggleProduct(p.name)}
                                                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between font-light ${selectedProducts.includes(p.name)
                                                                                ? "bg-accent text-navy font-semibold shadow-[0_0_10px_rgba(255,199,44,0.3)]"
                                                                                : "text-white/80 hover:bg-white/10"
                                                                            }`}
                                                                    >
                                                                        <span>
                                                                            {p.name}
                                                                            <span className={`ml-2 text-xs ${selectedProducts.includes(p.name) ? "text-navy/70 hidden sm:inline" : "text-white/40 hidden sm:inline"}`}>
                                                                                ({p.category})
                                                                            </span>
                                                                        </span>
                                                                        {selectedProducts.includes(p.name) && (
                                                                            <CheckCircle2 className="h-4 w-4 text-navy shrink-0 ml-2" />
                                                                        )}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Selected Tags */}
                                                {selectedProducts.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {selectedProducts.map((name) => (
                                                            <span
                                                                key={name}
                                                                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-3 py-1.5 text-xs font-semibold text-accent shadow-sm"
                                                            >
                                                                {name}
                                                                <button type="button" onClick={() => toggleProduct(name)} className="hover:bg-accent/20 rounded-full p-0.5 transition-colors">
                                                                    <X className="h-3 w-3 text-accent hover:text-white" />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {selectedProducts.length === 0 && (
                                                    <p className="mt-1.5 text-xs text-red-400">
                                                        Select at least one product
                                                    </p>
                                                )}
                                            </div>

                                            {/* Quantity & Delivery */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Quantity / Volume *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("quantity", { required: "Required" })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="e.g. 500 kg, 2 MT"
                                                    />
                                                    {errors.quantity && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.quantity.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-white/80 mb-2">
                                                        Delivery Location *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("deliveryLocation", { required: "Required" })}
                                                        className="w-full h-12 rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                                                        placeholder="City, Country"
                                                    />
                                                    {errors.deliveryLocation && (
                                                        <p className="mt-1.5 text-xs text-red-400">
                                                            {errors.deliveryLocation.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div className="relative z-10">
                                                <label className="block text-sm font-semibold text-white/80 mb-2">
                                                    Additional Details
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    {...register("message")}
                                                    className="w-full rounded-[var(--radius-btn)] bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/50 focus:bg-white/10 transition-all resize-none font-light"
                                                    placeholder="Specific grade requirements, packaging preferences, etc."
                                                />
                                            </div>

                                            {/* File Upload */}
                                            <div className="relative z-10">
                                                <label className="block text-sm font-semibold text-white/80 mb-2">
                                                    Attach Document (optional)
                                                </label>
                                                <label className="flex items-center justify-center sm:justify-start gap-4 cursor-pointer rounded-[var(--radius-btn)] border border-dashed border-white/20 bg-white/5 px-6 py-5 hover:border-accent/50 hover:bg-white/10 transition-all group">
                                                    <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 group-hover:bg-accent/20 transition-colors">
                                                        <Upload className="h-5 w-5 text-white/60 group-hover:text-accent transition-colors" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white break-all">
                                                            {file ? file.name : "Click to upload file"}
                                                        </p>
                                                        <p className="text-xs text-white/40 font-light mt-0.5">
                                                            PDF, DOC, XLSX — Max 10MB
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.doc,.docx,.xlsx,.xls"
                                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                    />
                                                </label>
                                            </div>

                                            {/* Error Message */}
                                            {errorMessage && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="rounded-[var(--radius-btn)] glass-panel bg-red-900/20 border-red-500/30 px-5 py-4 text-sm text-red-200 flex items-start gap-3 relative z-10 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                                >
                                                    <div className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                                                        <X className="h-3 w-3" />
                                                    </div>
                                                    <span className="font-light">{errorMessage}</span>
                                                </motion.div>
                                            )}

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={isLoading || selectedProducts.length === 0}
                                                className="w-full group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent/90 hover:bg-accent px-10 py-5 font-heading text-base font-bold text-navy transition-all overflow-hidden shadow-[0_0_20px_rgba(255,199,44,0.3)] hover:shadow-[0_0_30px_rgba(255,199,44,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none relative z-10"
                                            >
                                                {!isLoading && (
                                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[glass-shimmer_1.5s_linear]" />
                                                )}
                                                {isLoading ? (
                                                    <span className="animate-pulse">Submitting...</span>
                                                ) : (
                                                    <>
                                                        Submit RFQ
                                                        <Send className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}
