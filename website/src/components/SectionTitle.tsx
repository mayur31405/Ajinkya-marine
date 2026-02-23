interface SectionTitleProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionTitle({
    title,
    subtitle,
    centered = true,
    light = false,
}: SectionTitleProps) {
    return (
        <div className={`mb-12 ${centered ? "text-center" : ""}`}>
            <h2
                className={`font-heading text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight ${light ? "text-white" : "text-dark-text"
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""
                        } ${light ? "text-white/70" : "text-medium-grey"}`}
                >
                    {subtitle}
                </p>
            )}
            <div
                className={`mt-4 h-1 w-16 rounded-full bg-accent ${centered ? "mx-auto" : ""
                    }`}
            />
        </div>
    );
}
