import getClientPromise from "./mongodb";

const DB_NAME = "ajinkya_marine";

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
    filePath?: string | null;
}

// ── Helpers ──
async function getDb() {
    const client = await getClientPromise();
    return client.db(DB_NAME);
}

// ── Contact Submissions ──
export async function saveContactSubmission(data: ContactSubmissionData) {
    const db = await getDb();
    const result = await db.collection("contactSubmissions").insertOne({
        ...data,
        read: false,
        createdAt: new Date(),
    });
    return result.insertedId.toString();
}

// ── RFQ Submissions ──
export async function saveRFQSubmission(data: RFQSubmissionData) {
    const db = await getDb();
    const result = await db.collection("rfqSubmissions").insertOne({
        ...data,
        status: "NEW",
        createdAt: new Date(),
    });
    return result.insertedId.toString();
}

// ── Fetch Submissions ──
export async function getContactSubmissions() {
    const db = await getDb();
    return db
        .collection("contactSubmissions")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
}

export async function getRFQSubmissions() {
    const db = await getDb();
    return db
        .collection("rfqSubmissions")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
}

// ── Admin Actions ──
export async function markContactAsRead(id: string) {
    const { ObjectId } = await import("mongodb");
    const db = await getDb();
    await db
        .collection("contactSubmissions")
        .updateOne({ _id: new ObjectId(id) }, { $set: { read: true } });
}

export async function updateRFQStatus(id: string, status: string) {
    const { ObjectId } = await import("mongodb");
    const db = await getDb();
    await db
        .collection("rfqSubmissions")
        .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}
