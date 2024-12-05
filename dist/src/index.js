import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
// Import Drizzle-related modules
import { buildSchema } from "drizzle-graphql";
import { drizzle } from "drizzle-orm/postgres-js";
import * as dbSchema from "./db/schema"; // Ensure this exports your Drizzle ORM schema
import client from "./db";
// Initialize Drizzle ORM
const db = drizzle({ client, schema: dbSchema });
// Build GraphQL schema from Drizzle ORM
const { schema } = buildSchema(db);
// Initialize Express app
const app = express();
const httpServer = http.createServer(app);
// Initialize Apollo Server
const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Start the Apollo Server
await server.start();
// Apply Express middleware for Apollo
app.use("/graphql", cors(), express.json(), expressMiddleware(server, {
    context: async ({ req }) => ({
        token: req.headers.authorization || "",
    }),
}));
// Start the HTTP server
const PORT = process.env.PORT || 4000;
await new Promise((resolve) => {
    httpServer.listen({ port: PORT }, () => resolve());
});
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
