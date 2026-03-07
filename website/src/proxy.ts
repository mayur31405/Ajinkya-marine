import { NextRequest, NextResponse } from "next/server";

// ── In-Memory Rate Limiting Store ──
// Tracks request counts per IP for different route categories.
// Suitable for single-server deployment. For multi-server, use Redis.

interface RateEntry {
    count: number;
    resetAt: number;
}

interface BruteForceEntry {
    failures: number;
    lockedUntil: number;
}

const rateLimitStore = new Map<string, RateEntry>();
const bruteForceStore = new Map<string, BruteForceEntry>();

// Clean up expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore) {
        if (now > entry.resetAt) rateLimitStore.delete(key);
    }
    for (const [key, entry] of bruteForceStore) {
        if (now > entry.lockedUntil && entry.failures === 0) bruteForceStore.delete(key);
    }
}, 5 * 60 * 1000);

// ── Rate Limit Config ──
const RATE_LIMITS: Record<string, { maxRequests: number; windowMs: number }> = {
    "/api/admin/login": { maxRequests: 10, windowMs: 60 * 1000 },    // 10 req/min
    "/api/contact": { maxRequests: 5, windowMs: 60 * 1000 },          // 5 req/min
    "/api/rfq": { maxRequests: 5, windowMs: 60 * 1000 },              // 5 req/min
    default: { maxRequests: 60, windowMs: 60 * 1000 },                 // 60 req/min
};

// ── Brute Force Config ──
const BRUTE_FORCE_MAX_ATTEMPTS = 5;
const BRUTE_FORCE_LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

// ── Security Headers ──
const SECURITY_HEADERS: Record<string, string> = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

function getClientIP(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

function checkRateLimit(ip: string, path: string): { allowed: boolean; retryAfterMs: number } {
    const config = RATE_LIMITS[path] || RATE_LIMITS.default;
    const key = `${ip}:${path}`;
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetAt) {
        rateLimitStore.set(key, { count: 1, resetAt: now + config.windowMs });
        return { allowed: true, retryAfterMs: 0 };
    }

    entry.count++;
    if (entry.count > config.maxRequests) {
        return { allowed: false, retryAfterMs: entry.resetAt - now };
    }

    return { allowed: true, retryAfterMs: 0 };
}

function checkBruteForce(ip: string): { allowed: boolean; retryAfterMs: number } {
    const entry = bruteForceStore.get(ip);
    if (!entry) return { allowed: true, retryAfterMs: 0 };

    const now = Date.now();
    if (entry.lockedUntil > now) {
        return { allowed: false, retryAfterMs: entry.lockedUntil - now };
    }

    // Lockout expired — reset
    if (entry.failures >= BRUTE_FORCE_MAX_ATTEMPTS) {
        entry.failures = 0;
        entry.lockedUntil = 0;
    }

    return { allowed: true, retryAfterMs: 0 };
}

// Called by the login API after failed attempts (exported for use in login route)
export function recordLoginFailure(ip: string): void {
    const entry = bruteForceStore.get(ip) || { failures: 0, lockedUntil: 0 };
    entry.failures++;
    if (entry.failures >= BRUTE_FORCE_MAX_ATTEMPTS) {
        entry.lockedUntil = Date.now() + BRUTE_FORCE_LOCKOUT_MS;
    }
    bruteForceStore.set(ip, entry);
}

export function clearLoginFailures(ip: string): void {
    bruteForceStore.delete(ip);
}

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const ip = getClientIP(request);

    // ── Only rate-limit API routes ──
    if (pathname.startsWith("/api/")) {
        // Brute-force check for admin login
        if (pathname === "/api/admin/login" && request.method === "POST") {
            const bruteCheck = checkBruteForce(ip);
            if (!bruteCheck.allowed) {
                return NextResponse.json(
                    { error: "Too many failed attempts. Please try again later." },
                    {
                        status: 429,
                        headers: {
                            "Retry-After": Math.ceil(bruteCheck.retryAfterMs / 1000).toString(),
                            ...SECURITY_HEADERS,
                        },
                    }
                );
            }
        }

        // Rate limit check
        const rateCheck = checkRateLimit(ip, pathname);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please slow down." },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil(rateCheck.retryAfterMs / 1000).toString(),
                        ...SECURITY_HEADERS,
                    },
                }
            );
        }
    }

    // ── Add security headers to all responses ──
    const response = NextResponse.next();
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        response.headers.set(key, value);
    }

    return response;
}

export const config = {
    matcher: [
        // Match all routes except static files and images
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
