/**
 * Input sanitization utilities for security hardening.
 * Prevents XSS, injection, and oversized inputs.
 */

/**
 * Escapes HTML special characters to prevent XSS when
 * user data is interpolated into HTML (e.g., email templates).
 */
export function sanitizeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}

/**
 * Trims whitespace and enforces a maximum string length.
 * Returns empty string for null/undefined.
 */
export function sanitizeInput(str: unknown, maxLength: number = 1000): string {
    if (typeof str !== "string") return "";
    return str.trim().slice(0, maxLength);
}

/**
 * Server-side email format validation.
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validates phone number format (digits, spaces, +, -, parens).
 */
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+\d\s\-().]{6,20}$/;
    return phoneRegex.test(phone);
}

// ── Field length limits ──
export const FIELD_LIMITS = {
    name: 100,
    email: 254,
    phone: 20,
    company: 200,
    message: 5000,
    companyName: 200,
    contactPerson: 100,
    quantity: 100,
    deliveryLocation: 300,
    product: 200,
} as const;
