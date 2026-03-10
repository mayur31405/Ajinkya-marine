"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ── Types ──
interface ContactSubmission {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    read: boolean;
    createdAt: string;
}

interface RFQSubmission {
    _id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    products: string[];
    quantity: string;
    deliveryLocation: string;
    message?: string;
    fileName?: string;
    status: string;
    createdAt: string;
}

type Tab = "contact" | "rfq";

export default function AdminDashboard() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("contact");
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [rfqs, setRFQs] = useState<RFQSubmission[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
    const [selectedRFQ, setSelectedRFQ] = useState<RFQSubmission | null>(null);

    const fetchSubmissions = useCallback(async (type: Tab) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/submissions?type=${type}`, {
                headers: { Authorization: `Bearer ${password}` },
            });
            const data = await res.json();
            if (type === "contact") setContacts(data.submissions || []);
            else setRFQs(data.submissions || []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
        setLoading(false);
    }, [password]);

    useEffect(() => {
        if (authenticated) {
            fetchSubmissions(activeTab);
        }
    }, [authenticated, activeTab, fetchSubmissions]);

    // ── Login ──
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                setAuthenticated(true);
            } else {
                setLoginError("Invalid password");
            }
        } catch {
            setLoginError("Connection error");
        }
    };

    // ── Mark contact as read ──
    const handleMarkRead = async (id: string) => {
        await fetch("/api/admin/submissions", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${password}`,
            },
            body: JSON.stringify({ id, type: "contact" }),
        });
        fetchSubmissions("contact");
        setSelectedContact(null);
    };

    // ── Mark all contacts as read ──
    const handleMarkAllRead = async () => {
        try {
            const res = await fetch("/api/admin/submissions", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${password}`,
                },
                body: JSON.stringify({ type: "contact", action: "markAllRead" }),
            });
            if (res.ok) {
                fetchSubmissions("contact");
            } else {
                alert("Failed to mark all as read.");
            }
        } catch (err) {
            console.error("Mark all read error:", err);
        }
    };

    // ── Update RFQ status ──
    const handleUpdateRFQStatus = async (id: string, status: string) => {
        await fetch("/api/admin/submissions", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${password}`,
            },
            body: JSON.stringify({ id, type: "rfq", status }),
        });
        fetchSubmissions("rfq");
    };

    // ── Clear All Submissions ──
    const handleClearAll = async (type: Tab) => {
        if (!confirm(`Are you sure you want to clear all ${type === "contact" ? "Contact" : "RFQ"} submissions? This action cannot be undone.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/submissions?type=${type}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${password}` },
            });
            if (res.ok) {
                fetchSubmissions(type);
            } else {
                alert("Failed to clear submissions.");
            }
        } catch (err) {
            console.error("Clear error:", err);
            alert("A connection error occurred.");
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // ═══════════════════════════════════
    // LOGIN SCREEN
    // ═══════════════════════════════════
    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
                            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
                        <p className="text-medium-grey text-sm">Ajinkya Marine Pvt. Ltd.</p>
                    </div>

                    <form onSubmit={handleLogin} className="glass-panel p-6 shadow-2xl">
                        <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                            autoFocus
                            autoComplete="off"
                        />
                        {loginError && (
                            <p className="text-red-400 text-sm mt-2">{loginError}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full mt-4 px-4 py-3 bg-accent text-navy font-semibold rounded-xl hover:bg-accent-dark transition-colors cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════
    // DASHBOARD
    // ═══════════════════════════════════
    return (
        <div className="min-h-screen">
            {/* Top Bar */}
            <header className="bg-white/5 backdrop-blur-3xl border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                            <span className="text-navy font-bold text-sm">AM</span>
                        </div>
                        <h1 className="text-white font-semibold text-lg hidden sm:block">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => fetchSubmissions(activeTab)}
                            className="px-3 py-2 text-sm text-medium-grey hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            ↻ Refresh
                        </button>
                        <button
                            onClick={() => { setAuthenticated(false); setPassword(""); }}
                            className="px-3 py-2 text-sm text-red-400 hover:text-red-300 border border-red-400/20 rounded-lg hover:bg-red-400/5 transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="glass-panel p-5">
                        <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">Total Contacts</p>
                        <p className="text-2xl font-bold text-white mt-1">{contacts.length || "—"}</p>
                    </div>
                    <div className="glass-panel p-5">
                        <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">Unread</p>
                        <p className="text-2xl font-bold text-accent mt-1 drop-shadow-[0_0_8px_rgba(255,199,44,0.4)]">
                            {contacts.filter((c) => !c.read).length || "—"}
                        </p>
                    </div>
                    <div className="glass-panel p-5">
                        <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">Total RFQs</p>
                        <p className="text-2xl font-bold text-white mt-1">{rfqs.length || "—"}</p>
                    </div>
                    <div className="glass-panel p-5">
                        <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">New RFQs</p>
                        <p className="text-2xl font-bold text-green-400 mt-1 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">
                            {rfqs.filter((r) => r.status === "NEW").length || "—"}
                        </p>
                    </div>
                </div>

                {/* Tab Switcher & Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                    <div className="flex gap-1 glass-panel p-1.5 w-fit">
                        <button
                            onClick={() => setActiveTab("contact")}
                            className={`px-5 py-2.5 rounded-[calc(var(--radius-btn)-2px)] text-sm font-medium transition-all cursor-pointer border ${activeTab === "contact"
                                ? "bg-white/10 text-white shadow-sm border-white/20"
                                : "text-white/50 hover:text-white hover:bg-white/5 border-transparent"
                                }`}
                        >
                            📧 Contact Submissions
                        </button>
                        <button
                            onClick={() => setActiveTab("rfq")}
                            className={`px-5 py-2.5 rounded-[calc(var(--radius-btn)-2px)] text-sm font-medium transition-all cursor-pointer border ${activeTab === "rfq"
                                ? "bg-white/10 text-white shadow-sm border-white/20"
                                : "text-white/50 hover:text-white hover:bg-white/5 border-transparent"
                                }`}
                        >
                            📋 RFQ Submissions
                        </button>
                    </div>

                    <div className="flex gap-2">
                        {/* Mark All as Read Button (Contacts only) */}
                        {activeTab === "contact" && contacts.some(c => !c.read) && (
                            <button
                                onClick={handleMarkAllRead}
                                disabled={loading}
                                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border flex items-center gap-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20 hover:border-blue-500/30 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Mark All Read
                            </button>
                        )}

                        {/* Clear All Button */}
                        <button
                            onClick={() => handleClearAll(activeTab)}
                            disabled={loading || (activeTab === "contact" && contacts.length === 0) || (activeTab === "rfq" && rfqs.length === 0)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border flex items-center gap-2 ${(activeTab === "contact" && contacts.length === 0) || (activeTab === "rfq" && rfqs.length === 0)
                                    ? "bg-white/5 text-white/30 border-white/5 cursor-not-allowed"
                                    : "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20 hover:border-red-500/30 cursor-pointer"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear All {activeTab === "contact" ? "Contacts" : "RFQs"}
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                        <p className="text-medium-grey mt-3 text-sm">Loading submissions...</p>
                    </div>
                )}

                {/* ── CONTACT TABLE ── */}
                {!loading && activeTab === "contact" && (
                    <>
                        {contacts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-medium-grey text-lg">No contact submissions yet</p>
                                <p className="text-medium-grey/50 text-sm mt-1">They will appear here when customers submit the contact form</p>
                            </div>
                        ) : (
                            <div className="glass-panel overflow-hidden p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Status</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Name</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Email</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Company</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contacts.map((c) => (
                                                <tr
                                                    key={c._id}
                                                    className={`border-b border-white/10 hover:bg-white/5 transition-colors ${!c.read ? "bg-accent/5 backdrop-blur-sm" : ""}`}
                                                >
                                                    <td className="px-4 py-3">
                                                        <span className={`inline-block w-2 h-2 rounded-full ${c.read ? "bg-medium-grey" : "bg-accent"}`} />
                                                    </td>
                                                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                                                    <td className="px-4 py-3 text-medium-grey hidden sm:table-cell">{c.email}</td>
                                                    <td className="px-4 py-3 text-medium-grey hidden md:table-cell">{c.company || "—"}</td>
                                                    <td className="px-4 py-3 text-medium-grey text-xs hidden lg:table-cell">{formatDate(c.createdAt)}</td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            onClick={() => setSelectedContact(c)}
                                                            className="text-accent hover:text-accent-dark text-xs font-medium cursor-pointer"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Contact Detail Modal */}
                        {selectedContact && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedContact(null)}>
                                <div className="glass-panel max-w-lg w-full p-8 shadow-2xl backdrop-blur-3xl border-white/20" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-white font-semibold text-lg">Contact Details</h3>
                                        <button onClick={() => setSelectedContact(null)} className="text-medium-grey hover:text-white cursor-pointer">✕</button>
                                    </div>
                                    <div className="space-y-3">
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Name</span><p className="text-white">{selectedContact.name}</p></div>
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Email</span><p className="text-accent">{selectedContact.email}</p></div>
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Phone</span><p className="text-white">{selectedContact.phone || "—"}</p></div>
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Company</span><p className="text-white">{selectedContact.company || "—"}</p></div>
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Message</span><p className="text-white whitespace-pre-wrap bg-white/5 border border-white/10 rounded-xl p-4 mt-2 text-sm max-h-48 overflow-y-auto font-light leading-relaxed">{selectedContact.message}</p></div>
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Received</span><p className="text-white">{formatDate(selectedContact.createdAt)}</p></div>
                                    </div>
                                    <div className="mt-6 flex gap-3">
                                        {!selectedContact.read && (
                                            <button
                                                onClick={() => handleMarkRead(selectedContact._id)}
                                                className="flex-1 px-4 py-2.5 bg-accent text-navy font-semibold rounded-xl hover:bg-accent-dark transition-colors cursor-pointer"
                                            >
                                                ✓ Mark as Read
                                            </button>
                                        )}
                                        <a
                                            href={`mailto:${selectedContact.email}`}
                                            className="flex-1 px-4 py-2.5 border border-accent/30 text-accent text-center font-medium rounded-xl hover:bg-accent/10 transition-colors"
                                        >
                                            Reply via Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ── RFQ TABLE ── */}
                {!loading && activeTab === "rfq" && (
                    <>
                        {rfqs.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-medium-grey text-lg">No RFQ submissions yet</p>
                                <p className="text-medium-grey/50 text-sm mt-1">They will appear here when customers submit the RFQ form</p>
                            </div>
                        ) : (
                            <div className="glass-panel overflow-hidden p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Status</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Company</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Contact</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Products</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                                                <th className="text-left px-4 py-4 text-white/50 font-semibold text-xs uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rfqs.map((r) => (
                                                <tr key={r._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full ${r.status === "NEW" ? "bg-green-400/10 text-green-400" :
                                                            r.status === "REVIEWED" ? "bg-blue-400/10 text-blue-400" :
                                                                r.status === "QUOTED" ? "bg-purple-400/10 text-purple-400" :
                                                                    "bg-medium-grey/10 text-medium-grey"
                                                            }`}>
                                                            {r.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-white font-medium">{r.companyName}</td>
                                                    <td className="px-4 py-3 text-medium-grey hidden sm:table-cell">{r.contactPerson}</td>
                                                    <td className="px-4 py-3 text-medium-grey text-xs hidden md:table-cell">
                                                        {Array.isArray(r.products)
                                                            ? r.products.slice(0, 2).join(", ") + (r.products.length > 2 ? ` +${r.products.length - 2}` : "")
                                                            : r.products
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-medium-grey text-xs hidden lg:table-cell">{formatDate(r.createdAt)}</td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            onClick={() => setSelectedRFQ(r)}
                                                            className="text-accent hover:text-accent-dark text-xs font-medium cursor-pointer"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* RFQ Detail Modal */}
                        {selectedRFQ && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedRFQ(null)}>
                                <div className="glass-panel max-w-lg w-full p-8 shadow-2xl backdrop-blur-3xl border-white/20 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-white font-semibold text-lg">RFQ Details</h3>
                                        <button onClick={() => setSelectedRFQ(null)} className="text-medium-grey hover:text-white cursor-pointer">✕</button>
                                    </div>
                                    <div className="space-y-3">
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Company</span><p className="text-white">{selectedRFQ.companyName}</p></div>
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Contact Person</span><p className="text-white">{selectedRFQ.contactPerson}</p></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><span className="text-medium-grey text-xs uppercase tracking-wider">Email</span><p className="text-accent text-sm">{selectedRFQ.email}</p></div>
                                            <div><span className="text-medium-grey text-xs uppercase tracking-wider">Phone</span><p className="text-white text-sm">{selectedRFQ.phone}</p></div>
                                        </div>
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Products</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {(Array.isArray(selectedRFQ.products) ? selectedRFQ.products : [selectedRFQ.products]).map((p, i) => (
                                                    <span key={i} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-lg">{p}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><span className="text-medium-grey text-xs uppercase tracking-wider">Quantity</span><p className="text-white">{selectedRFQ.quantity}</p></div>
                                            <div><span className="text-medium-grey text-xs uppercase tracking-wider">Delivery To</span><p className="text-white">{selectedRFQ.deliveryLocation}</p></div>
                                        </div>
                                        {selectedRFQ.message && (
                                            <div><span className="text-medium-grey text-xs uppercase tracking-wider">Message</span><p className="text-white whitespace-pre-wrap bg-white/5 border border-white/10 rounded-xl p-4 mt-2 text-sm font-light leading-relaxed">{selectedRFQ.message}</p></div>
                                        )}
                                        {selectedRFQ.fileName && (
                                            <div>
                                                <span className="text-medium-grey text-xs uppercase tracking-wider">Attached File</span>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            const res = await fetch(`/api/admin/files?name=${encodeURIComponent(selectedRFQ.fileName!)}`, {
                                                                headers: { Authorization: `Bearer ${password}` },
                                                            });
                                                            if (!res.ok) { alert("Failed to download file."); return; }
                                                            const blob = await res.blob();
                                                            const url = URL.createObjectURL(blob);
                                                            window.open(url, "_blank");
                                                        } catch { alert("Error downloading file."); }
                                                    }}
                                                    className="mt-1 flex items-center gap-2 text-accent hover:text-accent-dark text-sm font-medium cursor-pointer hover:underline transition-colors"
                                                >
                                                    📎 {selectedRFQ.fileName} — View / Download ↗
                                                </button>
                                            </div>
                                        )}
                                        <div><span className="text-medium-grey text-xs uppercase tracking-wider">Received</span><p className="text-white">{formatDate(selectedRFQ.createdAt)}</p></div>
                                    </div>

                                    {/* Status Buttons */}
                                    <div className="mt-6">
                                        <p className="text-medium-grey text-xs uppercase tracking-wider mb-2">Update Status</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["NEW", "REVIEWED", "QUOTED", "CLOSED"].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => { handleUpdateRFQStatus(selectedRFQ._id, s); setSelectedRFQ({ ...selectedRFQ, status: s }); }}
                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${selectedRFQ.status === s
                                                        ? "bg-accent text-navy"
                                                        : "border border-white/10 text-medium-grey hover:text-white hover:bg-white/5"
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <a
                                            href={`mailto:${selectedRFQ.email}`}
                                            className="block w-full px-4 py-2.5 border border-accent/30 text-accent text-center font-medium rounded-xl hover:bg-accent/10 transition-colors"
                                        >
                                            Reply via Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
