import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getDbClient } from "./client";

async function migrate() {
  const db = getDbClient();
  const schemaPath = join(process.cwd(), "src/lib/db/schema.sql");
  const rawSql = readFileSync(schemaPath, "utf-8");

  const cleanedSql = rawSql.replace(/^--.*$/gm, "");
  const statements = cleanedSql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await db.execute(stmt);
  }

  console.log(`✓ Migrated ${statements.length} schema statements successfully.`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
