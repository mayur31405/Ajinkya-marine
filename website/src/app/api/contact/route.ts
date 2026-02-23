import { NextResponse } from "next/server";
import { saveContactSubmission } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, phone, company, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
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
