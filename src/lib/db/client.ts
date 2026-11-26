import { createClient, type Client } from "@libsql/client";

let cachedClient: Client | null = null;

/**
 * Returns a singleton Turso / libSQL database client.
 * Never import this module in Client Components.
 */
export function getDbClient(): Client {
  if (typeof window !== "undefined") {
    throw new Error("Database client cannot be initialized in the browser.");
  }

  if (cachedClient) {
    return cachedClient;
  }

  const url = process.env.TURSO_DATABASE_URL?.trim() || "file:local.db";
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim() || undefined;

  cachedClient = createClient({
    url,
    ...(authToken ? { authToken } : {}),
  });

  return cachedClient;
}

