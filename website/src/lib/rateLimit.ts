// In-memory rate limiting store
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export interface RateLimitOptions {
    windowMs?: number; // Time window in milliseconds (default: 1 minute)
    max?: number;      // Max requests per window (default: 5)
}

/**
 * Basic rate limiting check based on IP address.
 * Use for protecting public endpoints like contact forms.
 */
export function rateLimit(ip: string, options?: RateLimitOptions): { success: boolean, limit: number, remaining: number, reset: number } {
    const windowMs = options?.windowMs || 60 * 1000;
    const max = options?.max || 5;

    const now = Date.now();
    let record = rateLimitMap.get(ip);

    // If no record or outside the window, reset
    if (!record || (now - record.lastReset > windowMs)) {
        record = { count: 1, lastReset: now };
        rateLimitMap.set(ip, record);
        return { success: true, limit: max, remaining: max - 1, reset: record.lastReset + windowMs };
    }

    // Increment count
    record.count += 1;
    rateLimitMap.set(ip, record);

    if (record.count > max) {
        return { success: false, limit: max, remaining: 0, reset: record.lastReset + windowMs };
    }

    return { success: true, limit: max, remaining: max - record.count, reset: record.lastReset + windowMs };
}
