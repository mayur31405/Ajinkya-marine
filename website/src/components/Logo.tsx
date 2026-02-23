import { Anchor, Waves } from "lucide-react";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    variant?: "light" | "dark";
}

export default function Logo({ size = "md", variant = "light" }: LogoProps) {
    const sizeConfig = {
        sm: { icon: "h-6 w-6", text: "text-base", sub: "text-[8px]", gap: "gap-1.5" },
        md: { icon: "h-8 w-8", text: "text-lg", sub: "text-[10px]", gap: "gap-2" },
        lg: { icon: "h-12 w-12", text: "text-2xl", sub: "text-xs", gap: "gap-3" },
    };

    const cfg = sizeConfig[size];
    const textColor = variant === "light" ? "text-white" : "text-navy";

    return (
        <div className={`flex items-center ${cfg.gap} group`}>
            {/* Logo Mark - Anchor with waves */}
            <div className="relative">
                <div className={`flex items-center justify-center rounded-xl bg-accent p-1.5 ${size === 'lg' ? 'p-2.5' : 'p-1.5'} shadow-sm`}>
                    <Anchor className={`${cfg.icon} text-navy transition-transform group-hover:rotate-12`} />
                </div>
                <Waves className={`absolute -bottom-1 -right-1 ${size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} text-accent opacity-70`} />
            </div>

            {/* Logo Text */}
            <div className="flex flex-col leading-tight">
                <span className={`font-heading ${cfg.text} font-extrabold ${textColor} tracking-wide`}>
                    AJINKYA <span className="text-accent">MARINE</span>
                </span>
                <span className={`${cfg.sub} text-accent font-semibold tracking-[0.2em] uppercase`}>
                    Pvt. Ltd.
                </span>
            </div>
        </div>
    );
}
