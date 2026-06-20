// lib/auth.js
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

// Singleton MongoDB (important)
const client = new MongoClient(process.env.MONGO_DB_URI);
// await client.connect();

const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),

    secret: process.env.BETTER_AUTH_SECRET,

    // ✅ THIS MUST BE TOP LEVEL (NO async wrapper)
    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    user: {
        additionalFields: {
            role: { type: "string", default: "user" },
            plan: { type: "string", default: "user_free" },
            isBlocked: { type: "boolean", default: false },
        },
    },
    session:{
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 5 * 24 * 60 * 60
        }
    },
    plugins:[
        jwt()
    ]
});