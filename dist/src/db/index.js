import postgres from "postgres";
// Initialize the PostgreSQL connection
const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString, { max: 1 });
// Pass client as the first argument and schema in the config object
export default client;
