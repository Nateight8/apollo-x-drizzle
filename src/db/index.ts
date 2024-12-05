import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Initialize the PostgreSQL connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });

// Pass client as the first argument and schema in the config object

export default client;
