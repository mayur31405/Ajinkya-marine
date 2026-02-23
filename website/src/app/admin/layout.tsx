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
        <div className="min-h-screen bg-[#0B1D33]">
            {children}
        </div>
    );
}
