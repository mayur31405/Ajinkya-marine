import { NextRequest, NextResponse } from "next/server";
import { getContactSubmissions, getRFQSubmissions, markContactAsRead, updateRFQStatus, clearAllContacts, clearAllRFQs } from "@/lib/db";

// Simple password auth check
function isAuthorized(request: NextRequest): boolean {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return false;
    const password = authHeader.replace("Bearer ", "");
    // Trim the environment variable to handle any trailing whitespace/newlines from CLI pushes
    const envPassword = (process.env.ADMIN_PASSWORD || "ajinkya2024").trim();
    return password === envPassword;
}

// GET - Fetch submissions
export async function GET(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type") || "contact";

        if (type === "rfq") {
            const submissions = await getRFQSubmissions();
            return NextResponse.json({ submissions });
        }

        const submissions = await getContactSubmissions();
        return NextResponse.json({ submissions });
    } catch (error) {
        console.error("Admin API error:", error);
        return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
    }
}

// PATCH - Update submission status
export async function PATCH(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, type, status } = body;

        if (!id || !type) {
            return NextResponse.json({ error: "Missing id or type" }, { status: 400 });
        }

        if (type === "contact") {
            await markContactAsRead(id);
        } else if (type === "rfq" && status) {
            await updateRFQStatus(id, status);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin PATCH error:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

// DELETE - Clear submissions
export async function DELETE(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type") || "contact";

        if (type === "contact") {
            await clearAllContacts();
        } else if (type === "rfq") {
            await clearAllRFQs();
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
