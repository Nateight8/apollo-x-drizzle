import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
const connectionString = process.env.DATABASE_URL;
const pool = postgres(connectionString, { max: 1 });
export const db = drizzle(pool);
