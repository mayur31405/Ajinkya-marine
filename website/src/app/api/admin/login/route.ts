import { NextRequest, NextResponse } from "next/server";

// ── In-memory brute-force tracking ──
// The middleware handles rate limiting globally, but the login route
// tracks individual IP failures for brute-force lockout.

interface BruteForceEntry {
    failures: number;
    lockedUntil: number;
}

const loginAttempts = new Map<string, BruteForceEntry>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIP(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

export async function POST(request: NextRequest) {
    const ip = getClientIP(request);

    // Check if IP is locked out
    const entry = loginAttempts.get(ip);
    if (entry && entry.lockedUntil > Date.now()) {
        const retryAfter = Math.ceil((entry.lockedUntil - Date.now()) / 1000);
        return NextResponse.json(
            { error: "Too many failed attempts. Please try again later." },
            {
                status: 429,
                headers: { "Retry-After": retryAfter.toString() },
            }
        );
    }

    try {
        const { password } = await request.json();

        const adminPassword = process.env.ADMIN_PASSWORD;

        // Require ADMIN_PASSWORD env var to be set
        if (!adminPassword) {
            console.error("SECURITY: ADMIN_PASSWORD environment variable is not set!");
            return NextResponse.json(
                { error: "Server configuration error." },
                { status: 500 }
            );
        }

        if (password === adminPassword) {
            // Successful login — clear failures
            loginAttempts.delete(ip);
            return NextResponse.json({ success: true });
        }

        // Failed login — record attempt
        const current = loginAttempts.get(ip) || { failures: 0, lockedUntil: 0 };
        current.failures++;
        if (current.failures >= MAX_ATTEMPTS) {
            current.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
            console.warn(`SECURITY: IP ${ip} locked out after ${MAX_ATTEMPTS} failed login attempts`);
        }
        loginAttempts.set(ip, current);

        // Generic error message — don't reveal specifics
        return NextResponse.json(
            { error: "Authentication failed." },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { error: "Invalid request." },
            { status: 400 }
        );
    }
}
