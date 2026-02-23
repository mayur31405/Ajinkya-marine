export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    specs?: Record<string, string>;
}

export const categories = [
    "Food Additives",
    "Seafood Chemicals",
    "Egg Products",
    "Enzymes",
    "Sugars & Sweeteners",
    "Salts & Minerals",
];

export const products: Product[] = [
    // Food Additives
    {
        id: "sodium-tripolyphosphate",
        name: "Sodium Tripolyphosphate (STPP)",
        category: "Food Additives",
        description:
            "Food-grade sodium tripolyphosphate used as a quality enhancer in seafood processing. Improves moisture retention and texture.",
        specs: { Grade: "Food Grade", Approval: "FSSAI Approved", Packaging: "25kg Bags" },
    },
    {
        id: "citric-acid",
        name: "Citric Acid",
        category: "Food Additives",
        description:
            "High-purity citric acid for food preservation, flavoring, and pH adjustment in food and beverage manufacturing.",
        specs: { Form: "Anhydrous / Monohydrate", Grade: "Food Grade", Packaging: "25kg Bags" },
    },
    {
        id: "sodium-benzoate",
        name: "Sodium Benzoate",
        category: "Food Additives",
        description:
            "Preservative used in acidic food products, beverages, and condiments to inhibit microbial growth.",
        specs: { Grade: "Food Grade", Standard: "BP/USP", Packaging: "25kg Drums" },
    },
    {
        id: "ascorbic-acid",
        name: "Ascorbic Acid (Vitamin C)",
        category: "Food Additives",
        description:
            "Pharmaceutical and food-grade ascorbic acid used as an antioxidant and nutritional supplement in food processing.",
        specs: { Grade: "Food Grade", Standard: "USP", Packaging: "25kg Cartons" },
    },

    // Seafood Chemicals
    {
        id: "calcium-chloride",
        name: "Calcium Chloride",
        category: "Seafood Chemicals",
        description:
            "Industrial and food-grade calcium chloride for seafood firming, moisture control, and freezing point depression.",
        specs: { Grade: "Food / Industrial", Form: "Flakes & Pellets", Packaging: "25kg Bags" },
    },
    {
        id: "sodium-metabisulphite",
        name: "Sodium Metabisulphite",
        category: "Seafood Chemicals",
        description:
            "Antioxidant and preservative for shrimp and seafood processing to prevent blackspot and extend shelf life.",
        specs: { Grade: "Food Grade", Approval: "FSSAI Approved", Packaging: "25kg Bags" },
    },
    {
        id: "potassium-sorbate",
        name: "Potassium Sorbate",
        category: "Seafood Chemicals",
        description:
            "Effective preservative for seafood and food products, preventing yeast, mold, and bacterial growth.",
        specs: { Grade: "Food Grade", Standard: "FCC", Packaging: "25kg Drums" },
    },

    // Egg Products
    {
        id: "egg-white-powder",
        name: "Egg White Powder",
        category: "Egg Products",
        description:
            "Spray-dried egg white powder suitable for bakery, confectionery, and food manufacturing applications.",
        specs: { Process: "Spray Dried", Approval: "FSSAI Approved", Packaging: "20kg Bags" },
    },
    {
        id: "egg-yolk-powder",
        name: "Egg Yolk Powder",
        category: "Egg Products",
        description:
            "High-quality spray-dried egg yolk powder for use in mayonnaise, sauces, bakery, and pasta production.",
        specs: { Process: "Spray Dried", Grade: "Food Grade", Packaging: "20kg Bags" },
    },
    {
        id: "whole-egg-powder",
        name: "Whole Egg Powder",
        category: "Egg Products",
        description:
            "Complete egg replacement in powder form for food processing, baking, and industrial food manufacturing.",
        specs: { Process: "Spray Dried", Approval: "FSSAI Approved", Packaging: "20kg Bags" },
    },

    // Enzymes
    {
        id: "protease-enzyme",
        name: "Protease Enzyme",
        category: "Enzymes",
        description:
            "Protein-hydrolyzing enzyme for seafood tenderization, flavor enhancement, and waste protein recovery.",
        specs: { Grade: "Food Grade", Form: "Liquid & Powder", Packaging: "Custom" },
    },
    {
        id: "transglutaminase",
        name: "Transglutaminase (TGase)",
        category: "Enzymes",
        description:
            "Binding enzyme for restructured seafood and meat products. Improves texture and yield in processed foods.",
        specs: { Grade: "Food Grade", Packaging: "100g–1kg Packs", Type: "Cold Active" },
    },
    {
        id: "lipase-enzyme",
        name: "Lipase Enzyme",
        category: "Enzymes",
        description:
            "Fat-modifying enzyme for dairy, bakery, and food processing to enhance flavor profiles and texture.",
        specs: { Grade: "Food Grade", Form: "Liquid", Packaging: "Custom" },
    },

    // Sugars & Sweeteners
    {
        id: "dextrose-monohydrate",
        name: "Dextrose Monohydrate",
        category: "Sugars & Sweeteners",
        description:
            "Pure crystalline glucose used in food, beverages, confectionery, and pharmaceutical applications.",
        specs: { Grade: "Food Grade", Standard: "BP/USP", Packaging: "25kg–50kg Bags" },
    },
    {
        id: "maltodextrin",
        name: "Maltodextrin",
        category: "Sugars & Sweeteners",
        description:
            "Starch-derived food additive used as a thickener, filler, or preservative in processed foods.",
        specs: { DE: "10-20", Grade: "Food Grade", Packaging: "25kg Bags" },
    },
    {
        id: "sorbitol",
        name: "Sorbitol",
        category: "Sugars & Sweeteners",
        description:
            "Sugar alcohol sweetener used in sugar-free foods, oral care products, and moisture-retaining agents.",
        specs: { Form: "Liquid & Powder", Grade: "Food Grade", Packaging: "25kg Drums" },
    },

    // Salts & Minerals
    {
        id: "calcium-carbonate",
        name: "Calcium Carbonate",
        category: "Salts & Minerals",
        description:
            "High-purity calcium carbonate for food fortification, antacid formulations, and industrial processing.",
        specs: { Grade: "Food / Industrial", Form: "Fine Powder", Packaging: "25kg–50kg Bags" },
    },
    {
        id: "sodium-chloride",
        name: "Refined Sodium Chloride (Salt)",
        category: "Salts & Minerals",
        description:
            "Refined iodized and non-iodized salt for food processing, seafood preservation, and industrial applications.",
        specs: { Grade: "Food Grade", Form: "Fine & Coarse", Packaging: "50kg Bags" },
    },
    {
        id: "magnesium-sulphate",
        name: "Magnesium Sulphate",
        category: "Salts & Minerals",
        description:
            "Epsom salt used in food processing, agricultural, and industrial applications.",
        specs: { Grade: "Food / Industrial", Form: "Crystals", Packaging: "25kg Bags" },
    },
];
