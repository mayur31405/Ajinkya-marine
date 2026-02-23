import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
    if (clientPromise) return clientPromise;

    if (process.env.NODE_ENV === "development") {
        // In dev, use a global variable to preserve the client across hot-reloads
        const globalWithMongo = globalThis as typeof globalThis & {
            _mongoClientPromise?: Promise<MongoClient>;
        };

        if (!globalWithMongo._mongoClientPromise) {
            client = new MongoClient(uri);
            globalWithMongo._mongoClientPromise = client.connect();
        }
        clientPromise = globalWithMongo._mongoClientPromise;
    } else {
        client = new MongoClient(uri);
        clientPromise = client.connect();
    }

    return clientPromise;
}

export default getClientPromise;
