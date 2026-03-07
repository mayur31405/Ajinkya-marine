import nodemailer from "nodemailer";
import { sanitizeHtml } from "./sanitize";

interface ContactData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}

interface RFQData {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    products: string[];
    quantity: string;
    deliveryLocation: string;
    message?: string;
    fileName?: string;
}

function getTransporter() {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: { user, pass },
    });
}

export async function sendContactNotification(data: ContactData): Promise<boolean> {
    const transporter = getTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || "admin@ajinkyamarine.com";

    if (!transporter) {
        console.log("📧 [Email Fallback] Contact notification:");
        console.log(`   From: ${data.name} <${data.email}>`);
        console.log(`   Company: ${data.company || "N/A"}`);
        console.log(`   Phone: ${data.phone || "N/A"}`);
        console.log(`   Message: ${data.message}`);
        return true;
    }

    // Sanitize all user data before embedding in HTML
    const safeName = sanitizeHtml(data.name);
    const safeEmail = sanitizeHtml(data.email);
    const safePhone = sanitizeHtml(data.phone || "N/A");
    const safeCompany = sanitizeHtml(data.company || "N/A");
    const safeMessage = sanitizeHtml(data.message);

    try {
        await transporter.sendMail({
            from: `"Ajinkya Marine Website" <${process.env.SMTP_USER}>`,
            to: adminEmail,
            subject: `New Contact Inquiry from ${safeName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #0E2A47; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="color: #FFC72C; margin: 0;">New Contact Inquiry</h2>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td>${safeName}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${safePhone}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${safeCompany}</td></tr>
                        </table>
                        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;">
                        <h3 style="margin: 0 0 8px;">Message:</h3>
                        <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
                    </div>
                </div>
            `,
        });
        return true;
    } catch (error) {
        console.error("❌ Failed to send contact email:", error);
        return false;
    }
}

export async function sendRFQNotification(data: RFQData): Promise<boolean> {
    const transporter = getTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || "admin@ajinkyamarine.com";

    if (!transporter) {
        console.log("📧 [Email Fallback] RFQ notification:");
        console.log(`   Company: ${data.companyName}`);
        console.log(`   Contact: ${data.contactPerson} <${data.email}>`);
        console.log(`   Phone: ${data.phone}`);
        console.log(`   Products: ${data.products.join(", ")}`);
        console.log(`   Quantity: ${data.quantity}`);
        console.log(`   Delivery: ${data.deliveryLocation}`);
        console.log(`   Message: ${data.message || "N/A"}`);
        console.log(`   File: ${data.fileName || "None"}`);
        return true;
    }

    // Sanitize all user data before embedding in HTML
    const safeCompany = sanitizeHtml(data.companyName);
    const safeContact = sanitizeHtml(data.contactPerson);
    const safeEmail = sanitizeHtml(data.email);
    const safePhone = sanitizeHtml(data.phone);
    const safeQuantity = sanitizeHtml(data.quantity);
    const safeDelivery = sanitizeHtml(data.deliveryLocation);
    const safeFileName = sanitizeHtml(data.fileName || "None");
    const safeMessage = data.message ? sanitizeHtml(data.message) : "";
    const safeProducts = data.products.map((p) => sanitizeHtml(p));

    try {
        await transporter.sendMail({
            from: `"Ajinkya Marine Website" <${process.env.SMTP_USER}>`,
            to: adminEmail,
            subject: `New RFQ from ${safeCompany}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #0E2A47; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="color: #FFC72C; margin: 0;">New RFQ Request</h2>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Company:</td><td>${safeCompany}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Contact Person:</td><td>${safeContact}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${safePhone}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Quantity:</td><td>${safeQuantity}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">Delivery To:</td><td>${safeDelivery}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold;">File Attached:</td><td>${safeFileName}</td></tr>
                        </table>
                        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;">
                        <h3 style="margin: 0 0 8px;">Selected Products:</h3>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${safeProducts.map((p) => `<li>${p}</li>`).join("")}
                        </ul>
                        ${safeMessage ? `
                            <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;">
                            <h3 style="margin: 0 0 8px;">Additional Details:</h3>
                            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
                        ` : ""}
                    </div>
                </div>
            `,
        });
        return true;
    } catch (error) {
        console.error("❌ Failed to send RFQ email:", error);
        return false;
    }
}
