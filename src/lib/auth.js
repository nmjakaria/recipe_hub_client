// lib/auth.js (or wherever your backend auth configuration lives)
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const dns = require("node:dns");
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
    console.warn("DNS override failed (likely in an edge environment):", e);
}

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client // Keeps your database transaction tracking active
    }),
    
    // 1. Better Auth requires a secret explicitly mapped or via BETTER_AUTH_SECRET env variable
    secret: process.env.BETTER_AUTH_SECRET,

    emailAndPassword: {
        enabled: true,
    },
    
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    
    // 2. CRITICAL FIX: You must provide a "type" for your additional fields!
    user: {
        additionalFields: {
            role: {
                type: "string", 
                default: "user"
            },
            plan: {
                type: "string",
                default: "user_free"
            }
        }
    }
});