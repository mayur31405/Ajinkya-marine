import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel | Ajinkya Marine",
    description: "Admin dashboard for managing submissions",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full bg-[#030914] text-white overflow-hidden">
            {/* Ambient Background — Ocean Liquid Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none ocean-gradient-bg">
                <div className="bg-blob bg-blob-1 opacity-60" />
                <div className="bg-blob bg-blob-2 opacity-60" />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full min-h-screen">
                {children}
            </div>
        </div>
    );
}
