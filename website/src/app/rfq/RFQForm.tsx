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
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Hero Banner */}
            <section className="relative h-[300px] lg:h-[400px] overflow-hidden">
                <Image
                    src={images.atmosphere.containerYard}
                    alt="Container yard operations"
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
                                Request for Quotation
                            </span>
                            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white uppercase">
                                Get a <span className="text-accent">Quote</span>
                            </h1>
                            <p className="mt-4 text-white/70 text-lg max-w-xl">
                                Tell us what you need and our team will provide a customized
                                quotation within 24 hours.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-20 bg-light-grey">
                <div className="mx-auto max-w-[900px] px-6 lg:px-0">
                    <div className="rounded-[var(--radius-card)] bg-white p-8 lg:p-10 shadow-sm">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-16 text-center"
                            >
                                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h2 className="font-heading text-2xl font-bold text-dark-text">
                                    RFQ Submitted Successfully!
                                </h2>
                                <p className="text-medium-grey mt-2 max-w-md mx-auto">
                                    Our team will review your request and send a customized quote
                                    within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-sm font-semibold text-accent hover:text-accent-dark"
                                >
                                    Submit another RFQ
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                                        <FileText className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <h2 className="font-heading text-xl font-bold text-dark-text">
                                            RFQ Form
                                        </h2>
                                        <p className="text-xs text-medium-grey">
                                            Fields marked * are required
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Company & Contact */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                {...register("companyName", { required: "Required" })}
                                                className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                placeholder="Your company"
                                            />
                                            {errors.companyName && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.companyName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                Contact Person *
                                            </label>
                                            <input
                                                type="text"
                                                {...register("contactPerson", { required: "Required" })}
                                                className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                placeholder="Full name"
                                            />
                                            {errors.contactPerson && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.contactPerson.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-dark-text mb-1.5">
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
                                                className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                placeholder="you@company.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                {...register("phone", { required: "Required" })}
                                                className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                            Select Products *
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-left text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all flex items-center justify-between"
                                            >
                                                <span className={selectedProducts.length === 0 ? "text-medium-grey" : ""}>
                                                    {selectedProducts.length === 0
                                                        ? "Choose products..."
                                                        : `${selectedProducts.length} product(s) selected`}
                                                </span>
                                                <ChevronDown
                                                    className={`h-4 w-4 text-medium-grey transition-transform ${dropdownOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {dropdownOpen && (
                                                <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                                    {products.map((p) => (
                                                        <button
                                                            key={p.id}
                                                            type="button"
                                                            onClick={() => toggleProduct(p.name)}
                                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent/10 transition-colors flex items-center justify-between ${selectedProducts.includes(p.name)
                                                                ? "bg-accent/5 text-navy font-medium"
                                                                : "text-dark-text"
                                                                }`}
                                                        >
                                                            <span>
                                                                {p.name}
                                                                <span className="ml-2 text-xs text-medium-grey">
                                                                    ({p.category})
                                                                </span>
                                                            </span>
                                                            {selectedProducts.includes(p.name) && (
                                                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Selected Tags */}
                                        {selectedProducts.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {selectedProducts.map((name) => (
                                                    <span
                                                        key={name}
                                                        className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-medium text-navy"
                                                    >
                                                        {name}
                                                        <button type="button" onClick={() => toggleProduct(name)}>
                                                            <X className="h-3 w-3 text-navy/50 hover:text-red-500" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {selectedProducts.length === 0 && (
                                            <p className="mt-1 text-xs text-red-500">
                                                Select at least one product
                                            </p>
                                        )}
                                    </div>

                                    {/* Quantity & Delivery */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                Quantity / Volume *
                                            </label>
                                            <input
                                                type="text"
                                                {...register("quantity", { required: "Required" })}
                                                className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                placeholder="e.g. 500 kg, 2 MT"
                                            />
                                            {errors.quantity && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.quantity.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                                Delivery Location *
                                            </label>
                                            <input
                                                type="text"
                                                {...register("deliveryLocation", { required: "Required" })}
                                                className="w-full h-12 rounded-[var(--radius-btn)] border border-gray-200 px-4 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                                placeholder="City, Country"
                                            />
                                            {errors.deliveryLocation && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.deliveryLocation.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                            Additional Details
                                        </label>
                                        <textarea
                                            rows={4}
                                            {...register("message")}
                                            className="w-full rounded-[var(--radius-btn)] border border-gray-200 px-4 py-3 text-sm text-dark-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                                            placeholder="Specific grade requirements, packaging preferences, etc."
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <label className="block text-sm font-semibold text-dark-text mb-1.5">
                                            Attach Document (optional)
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer rounded-[var(--radius-btn)] border-2 border-dashed border-gray-200 px-4 py-4 hover:border-accent/50 transition-colors">
                                            <Upload className="h-5 w-5 text-medium-grey" />
                                            <div>
                                                <p className="text-sm font-medium text-dark-text">
                                                    {file ? file.name : "Click to upload"}
                                                </p>
                                                <p className="text-xs text-medium-grey">
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

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isLoading || selectedProducts.length === 0}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-10 py-4 font-heading text-sm font-bold text-navy transition-all hover:bg-accent-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            "Submitting..."
                                        ) : (
                                            <>
                                                Submit RFQ
                                                <Send className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
