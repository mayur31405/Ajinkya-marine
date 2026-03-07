import { NextRequest, NextResponse } from "next/server";
import { readFile, access } from "fs/promises";
import path from "path";
import { constants } from "fs";

// Simple password auth check (same as submissions route)
function isAuthorized(request: NextRequest): boolean {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return false;
    const password = authHeader.replace("Bearer ", "");
    return password === (process.env.ADMIN_PASSWORD || "ajinkya2024");
}

// Map file extension to MIME type
function getMimeType(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    const mimeMap: Record<string, string> = {
        ".pdf": "application/pdf",
        ".doc": "application/msword",
        ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ".xls": "application/vnd.ms-excel",
        ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
    };
    return mimeMap[ext] || "application/octet-stream";
}

export async function GET(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("name");

    if (!fileName) {
        return NextResponse.json({ error: "Missing file name" }, { status: 400 });
    }

    // Prevent directory traversal attacks
    const safeName = path.basename(fileName);
    const filePath = path.join(process.cwd(), "uploads", "rfq", safeName);

    try {
        await access(filePath, constants.R_OK);
        const fileBuffer = await readFile(filePath);
        const mimeType = getMimeType(safeName);

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": mimeType,
                "Content-Disposition": `inline; filename="${safeName}"`,
                "Content-Length": fileBuffer.length.toString(),
            },
        });
    } catch {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
}
