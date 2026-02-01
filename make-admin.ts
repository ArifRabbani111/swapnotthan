import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function makeAdmin(email: string) {
    console.log(`Promoting ${email} to admin...`);

    const result = await db
        .update(users)
        .set({ role: "admin" })
        .where(eq(users.email, email))
        .returning();

    if (result.length === 0) {
        console.error(`User with email ${email} not found. Please log in first via the web UI.`);
    } else {
        console.log(`Successfully promoted ${result[0].name} to admin!`);
    }
}

const email = process.argv[2];
if (!email) {
    console.error("Please provide an email address: npm run make-admin your@email.com");
    process.exit(1);
}

makeAdmin(email);
