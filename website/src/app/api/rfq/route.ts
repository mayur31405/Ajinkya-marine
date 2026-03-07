import { NextResponse } from "next/server";
import { saveRFQSubmission } from "@/lib/db";
import { sendRFQNotification } from "@/lib/email";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { sanitizeInput, isValidEmail, isValidPhone, FIELD_LIMITS } from "@/lib/sanitize";

// ── File Upload Security Config ──
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".xls", ".xlsx"];
const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Sanitize + enforce length limits on all text fields
        const companyName = sanitizeInput(formData.get("companyName"), FIELD_LIMITS.companyName);
        const contactPerson = sanitizeInput(formData.get("contactPerson"), FIELD_LIMITS.contactPerson);
        const email = sanitizeInput(formData.get("email"), FIELD_LIMITS.email);
        const phone = sanitizeInput(formData.get("phone"), FIELD_LIMITS.phone);
        const selectedProducts = (formData.getAll("selectedProducts") as string[])
            .map((p) => sanitizeInput(p, FIELD_LIMITS.product))
            .filter(Boolean);
        const quantity = sanitizeInput(formData.get("quantity"), FIELD_LIMITS.quantity);
        const deliveryLocation = sanitizeInput(formData.get("deliveryLocation"), FIELD_LIMITS.deliveryLocation);
        const message = sanitizeInput(formData.get("message"), FIELD_LIMITS.message);
        const file = formData.get("file") as File | null;

        // Validate required fields
        if (!companyName || !contactPerson || !email || !phone || selectedProducts.length === 0 || !quantity || !deliveryLocation) {
            return NextResponse.json(
                { error: "All required fields must be filled." },
                { status: 400 }
            );
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        // Validate phone format
        if (!isValidPhone(phone)) {
            return NextResponse.json(
                { error: "Invalid phone number." },
                { status: 400 }
            );
        }

        // ── Secure File Upload Handling ──
        let fileName: string | null = null;
        let filePath: string | null = null;

        if (file && file.size > 0) {
            // Enforce file size limit
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: "File size exceeds 10 MB limit." },
                    { status: 400 }
                );
            }

            // Validate file extension
            const ext = path.extname(file.name).toLowerCase();
            if (!ALLOWED_EXTENSIONS.includes(ext)) {
                return NextResponse.json(
                    { error: `File type '${ext}' is not allowed. Accepted: ${ALLOWED_EXTENSIONS.join(", ")}` },
                    { status: 400 }
                );
            }

            // Validate MIME type
            if (!ALLOWED_MIME_TYPES.includes(file.type)) {
                return NextResponse.json(
                    { error: "Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX files are accepted." },
                    { status: 400 }
                );
            }

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
