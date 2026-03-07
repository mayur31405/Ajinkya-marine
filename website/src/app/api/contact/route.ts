import { NextResponse } from "next/server";
import { saveContactSubmission } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { sanitizeInput, isValidEmail, FIELD_LIMITS } from "@/lib/sanitize";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Sanitize + enforce length limits
        const name = sanitizeInput(body.name, FIELD_LIMITS.name);
        const email = sanitizeInput(body.email, FIELD_LIMITS.email);
        const phone = sanitizeInput(body.phone, FIELD_LIMITS.phone);
        const company = sanitizeInput(body.company, FIELD_LIMITS.company);
        const message = sanitizeInput(body.message, FIELD_LIMITS.message);

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Validate email format server-side
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        // Save to MongoDB
        const id = await saveContactSubmission({
            name,
            email,
            phone: phone || null,
            company: company || null,
            message,
        });

        // Send email notification (non-blocking)
        sendContactNotification({ name, email, phone, company, message }).catch(
            (err) => console.error("Email notification failed:", err)
        );

        return NextResponse.json(
            { success: true, message: "Inquiry received successfully.", id },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Failed to process inquiry." },
            { status: 500 }
        );
    }
}
