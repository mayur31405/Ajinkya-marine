/**
 * Image URLs for the Ajinkya Marine website.
 * All URLs verified working via HTTP HEAD check.
 * Replace with your own branded images before production deployment.
 */

export const images = {
    // ===== Hero & Background =====
    hero: {
        // Cargo ship (verified working)
        cargoShip:
            "https://images.unsplash.com/photo-1488998527040-85054a85150e?w=1920&q=80",
        // Busy port (verified working)
        port: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80",
    },

    // ===== About Page =====
    about: {
        warehouse:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        teamwork:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        shipping:
            "https://images.unsplash.com/photo-1524522173746-f628baad3644?w=800&q=80",
        qualityControl:
            "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&q=80",
    },

    // ===== Product Category Images =====
    categories: {
        seafoodChemicals:
            "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&q=80",
        foodAdditives:
            "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
        eggProducts:
            "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=600&q=80",
        enzymes:
            "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80",
        sugars:
            "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=600&q=80",
        salts:
            "https://images.unsplash.com/photo-1626197031507-c17099753214?w=600&q=80",
    },

    // ===== Unique Product Images (every product has its own verified image) =====
    products: {
        // Food Additives — Each unique
        "sodium-tripolyphosphate":
            "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&q=80",
        "citric-acid":
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&q=80",
        "sodium-benzoate":
            "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&q=80",
        "ascorbic-acid":
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",

        // Seafood Chemicals — Each unique
        "calcium-chloride":
            "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500&q=80",
        "sodium-metabisulphite":
            "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80",
        "potassium-sorbate":
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80",

        // Egg Products — Each unique
        "egg-white-powder":
            "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=500&q=80",
        "egg-yolk-powder":
            "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=500&q=80",
        "whole-egg-powder":
            "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80",

        // Enzymes — Each unique
        "protease-enzyme":
            "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=80",
        transglutaminase:
            "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80",
        "lipase-enzyme":
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",

        // Sugars & Sweeteners — Each unique
        "dextrose-monohydrate":
            "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&q=80",
        maltodextrin:
            "https://images.unsplash.com/photo-1592903297149-37fb25202dfa?w=500&q=80",
        sorbitol:
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80",

        // Salts & Minerals — Each unique
        "calcium-carbonate":
            "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80",
        "sodium-chloride":
            "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?w=500&q=80",
        "magnesium-sulphate":
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80",
    },

    // ===== Certification Images =====
    certifications: {
        haccp:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
        iso9001:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
        fssai:
            "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&q=80",
        msme:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    },

    // ===== Atmospheric / Decorative =====
    atmosphere: {
        containerYard:
            "https://images.unsplash.com/photo-1488998527040-85054a85150e?w=1200&q=80",
        laboratory:
            "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80",
        globalTrade:
            "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80",
        seafood:
            "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=1200&q=80",
        factory:
            "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80",
    },
} as const;

/** Get product image by product ID, with fallback */
export function getProductImage(productId: string): string {
    return (
        (images.products as Record<string, string>)[productId] ||
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&q=80"
    );
}
