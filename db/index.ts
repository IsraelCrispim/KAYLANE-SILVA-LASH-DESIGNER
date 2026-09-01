import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  const runtimeEnv =
    (globalThis as { env?: Record<string, unknown> }).env ??
    (typeof process !== "undefined" ? process.env : undefined);

  const db = runtimeEnv?.DB as any;

  if (!db) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `DB` environment variable or provide the binding in the runtime before using the database."
    );
  }

  return drizzle(db, { schema });
}
