import { NextResponse } from "next/server";
import { saveRFQSubmission } from "@/lib/db";
import { sendRFQNotification } from "@/lib/email";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const companyName = formData.get("companyName") as string;
        const contactPerson = formData.get("contactPerson") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const selectedProducts = formData.getAll("selectedProducts") as string[];
        const quantity = formData.get("quantity") as string;
        const deliveryLocation = formData.get("deliveryLocation") as string;
        const message = formData.get("message") as string;
        const file = formData.get("file") as File | null;

        // Validate required fields
        if (!companyName || !contactPerson || !email || !phone || selectedProducts.length === 0 || !quantity || !deliveryLocation) {
            return NextResponse.json(
                { error: "All required fields must be filled." },
                { status: 400 }
            );
        }

        // Handle file upload to local filesystem
        let fileName: string | null = null;
        let filePath: string | null = null;

        if (file && file.size > 0) {
            const uploadsDir = path.join(process.cwd(), "uploads", "rfq");
            await mkdir(uploadsDir, { recursive: true });

            const timestamp = Date.now();
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
            fileName = `${timestamp}_${safeName}`;
            filePath = path.join(uploadsDir, fileName);

            const bytes = await file.arrayBuffer();
            await writeFile(filePath, Buffer.from(bytes));
        }

        // Save to MongoDB
        const id = await saveRFQSubmission({
            companyName,
            contactPerson,
            email,
            phone,
            products: selectedProducts,
            quantity,
            deliveryLocation,
            message: message || null,
            fileName,
            filePath,
        });

        // Send email notification (non-blocking)
        sendRFQNotification({
            companyName,
            contactPerson,
            email,
            phone,
            products: selectedProducts,
            quantity,
            deliveryLocation,
            message,
            fileName: fileName || undefined,
        }).catch((err) => console.error("RFQ email notification failed:", err));

        return NextResponse.json(
            { success: true, message: "RFQ received successfully.", id },
            { status: 200 }
        );
    } catch (error) {
        console.error("RFQ API error:", error);
        return NextResponse.json(
            { error: "Failed to process RFQ." },
            { status: 500 }
        );
    }
}
