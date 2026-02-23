import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["400", "600", "700", "800"],
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["400", "500", "600"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Ajinkya Marine Pvt. Ltd. | Marine & Food-Grade Chemical Solutions",
    description:
        "Ajinkya Marine Pvt. Ltd. is a leading importer and exporter of industrial and food-grade marine chemicals, seafood additives, food enzymes, and egg products. HACCP, ISO, FSSAI certified.",
    keywords: [
        "marine chemicals",
        "food additives",
        "seafood chemicals",
        "food enzymes",
        "egg products",
        "HACCP certified",
        "ISO certified",
        "FSSAI approved",
        "Ajinkya Marine",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
            <body className="bg-white">
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
