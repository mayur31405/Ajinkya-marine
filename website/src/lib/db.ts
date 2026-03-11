import getClientPromise from "./mongodb";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DB_NAME = "ajinkya_marine";

// ── Local JSON fallback paths ──
const DATA_DIR = path.join(process.cwd(), "data");
const CONTACT_FILE = path.join(DATA_DIR, "contactSubmissions.json");
const RFQ_FILE = path.join(DATA_DIR, "rfqSubmissions.json");

// ── Types ──
export interface ContactSubmissionData {
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    message: string;
}

export interface RFQSubmissionData {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    products: string[];
    quantity: string;
    deliveryLocation: string;
    message?: string | null;
    fileName?: string | null;
    fileData?: string | null; // Base64 string of the file
    fileType?: string | null; // MIME type of the file
}

// ── MongoDB Helper ──
async function getDb() {
    const client = await getClientPromise();
    return client.db(DB_NAME);
}

// ── Local JSON Helpers ──
async function ensureDataDir() {
    await mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string): Promise<T[]> {
    try {
        const data = await readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeJsonFile<T>(filePath: string, data: T[]) {
    if (process.env.NODE_ENV === "production") {
        console.warn("⚠️ Skipping local filesystem write in production. Data will be lost if MongoDB is not connected.");
        return;
    }
    await ensureDataDir();
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// ── Check if MongoDB is available ──
let cachedMongoAvailable: boolean | null = null;
let lastMongoCheck = 0;
const MONGO_CHECK_INTERVAL = 60 * 1000; // 1 minute

async function isMongoAvailable(): Promise<boolean> {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            if (process.env.NODE_ENV === "production") {
                console.error("❌ CRITICAL: MONGODB_URI must be provided in production.");
            }
            return false;
        }

        const now = Date.now();
        // Return cached result if within interval
        if (cachedMongoAvailable !== null && (now - lastMongoCheck < MONGO_CHECK_INTERVAL)) {
            return cachedMongoAvailable;
        }

        const client = await getClientPromise();
        await client.db(DB_NAME).command({ ping: 1 }, { timeoutMS: 3000 });

        cachedMongoAvailable = true;
        lastMongoCheck = now;
        return true;
    } catch (error) {
        console.warn("⚠️ MongoDB unavailable, using local JSON fallback.");
        console.error("MongoDB Ping Error:", error instanceof Error ? error.message : error);
        cachedMongoAvailable = false;
        lastMongoCheck = Date.now();
        return false;
    }
}

// ── Contact Submissions ──
export async function saveContactSubmission(data: ContactSubmissionData) {
    if (await isMongoAvailable()) {
        const db = await getDb();
        const result = await db.collection("contactSubmissions").insertOne({
            ...data,
            read: false,
            createdAt: new Date(),
        });
        return result.insertedId.toString();
    }

    if (process.env.NODE_ENV === "production") {
        throw new Error("MongoDB is unavailable and local fallback is disabled in production.");
    }

    // Local fallback
    const entries = await readJsonFile<Record<string, unknown>>(CONTACT_FILE);
    const id = generateId();
    entries.push({
        _id: id,
        ...data,
        read: false,
        createdAt: new Date().toISOString(),
    });
    await writeJsonFile(CONTACT_FILE, entries);
    return id;
}

// ── RFQ Submissions ──
export async function saveRFQSubmission(data: RFQSubmissionData) {
    if (await isMongoAvailable()) {
        const db = await getDb();
        const result = await db.collection("rfqSubmissions").insertOne({
            ...data,
            status: "NEW",
            createdAt: new Date(),
        });
        return result.insertedId.toString();
    }

    if (process.env.NODE_ENV === "production") {
        throw new Error("MongoDB is unavailable and local fallback is disabled in production.");
    }

    // Local fallback
    const entries = await readJsonFile<Record<string, unknown>>(RFQ_FILE);
    const id = generateId();
    entries.push({
        _id: id,
        ...data,
        status: "NEW",
        createdAt: new Date().toISOString(),
    });
    await writeJsonFile(RFQ_FILE, entries);
    return id;
}

// ── Fetch Submissions ──
export async function getContactSubmissions() {
    if (await isMongoAvailable()) {
        const db = await getDb();
        return db
            .collection("contactSubmissions")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
    }

    const entries = await readJsonFile<Record<string, unknown>>(CONTACT_FILE);
    return entries.reverse();
}

export async function getRFQSubmissions() {
    if (await isMongoAvailable()) {
        const db = await getDb();
        return db
            .collection("rfqSubmissions")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
    }

    const entries = await readJsonFile<Record<string, unknown>>(RFQ_FILE);
    return entries.reverse();
}

// ── Admin Actions ──
export async function markContactAsRead(id: string) {
    if (await isMongoAvailable()) {
        const { ObjectId } = await import("mongodb");
        const db = await getDb();
        await db
            .collection("contactSubmissions")
            .updateOne({ _id: new ObjectId(id) }, { $set: { read: true } });
        return;
    }

    const entries = await readJsonFile<Record<string, unknown>>(CONTACT_FILE);
    const entry = entries.find((e) => e._id === id);
    if (entry) {
        entry.read = true;
        await writeJsonFile(CONTACT_FILE, entries);
    }
}

export async function updateRFQStatus(id: string, status: string) {
    if (await isMongoAvailable()) {
        const { ObjectId } = await import("mongodb");
        const db = await getDb();
        await db
            .collection("rfqSubmissions")
            .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
        return;
    }

    const entries = await readJsonFile<Record<string, unknown>>(RFQ_FILE);
    const entry = entries.find((e) => e._id === id);
    if (entry) {
        entry.status = status;
        await writeJsonFile(RFQ_FILE, entries);
    }
}

export async function clearAllContacts() {
    if (await isMongoAvailable()) {
        const db = await getDb();
        await db.collection("contactSubmissions").deleteMany({});
        return;
    }
    await writeJsonFile(CONTACT_FILE, []);
}

export async function clearAllRFQs() {
    if (await isMongoAvailable()) {
        const db = await getDb();
        await db.collection("rfqSubmissions").deleteMany({});
        return;
    }
    await writeJsonFile(RFQ_FILE, []);
}

export async function markAllContactsAsRead() {
    if (await isMongoAvailable()) {
        const db = await getDb();
        await db
            .collection("contactSubmissions")
            .updateMany({ read: false }, { $set: { read: true } });
        return;
    }

    const entries = await readJsonFile<Record<string, unknown>>(CONTACT_FILE);
    let updated = false;
    for (const entry of entries) {
        if (entry.read === false) {
            entry.read = true;
            updated = true;
        }
    }
    if (updated) {
        await writeJsonFile(CONTACT_FILE, entries);
    }
}
