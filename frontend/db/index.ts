import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV !== "test") {
    if (typeof globalThis !== "undefined" && !(globalThis as { __swapnotthanDbWarned?: boolean }).__swapnotthanDbWarned) {
        (globalThis as { __swapnotthanDbWarned?: boolean }).__swapnotthanDbWarned = true;
        console.warn(
            "[swapnotthan] DATABASE_URL is not set. Add it to frontend/.env.local — e.g. DATABASE_URL=postgresql://user:pass@localhost:5432/swapnotthan"
        );
    }
}

const pool = new Pool({
    connectionString: connectionString || undefined,
    connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
    console.error("[swapnotthan] Database pool error:", err.message);
});

export const db = drizzle(pool, { schema });
