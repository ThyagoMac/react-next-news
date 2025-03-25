import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  try {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join(process.cwd(), "infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    });
    response.status(200).json(migrations);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
