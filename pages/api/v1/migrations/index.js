import database from "@/infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  };
  if (request.method === "POST") {
    try {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        response.status(201).json(migratedMigrations);
      }
      response.status(200).json(migratedMigrations);
    } catch (error) {
      response.status(500).json({ error: error.message });
    } finally {
      await dbClient.end();
      return;
    }
  }

  if (request.method === "GET") {
    try {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      response.status(200).json(pendingMigrations);
    } catch (error) {
      response.status(500).json({ error: error.message });
    } finally {
      await dbClient.end();
      return;
    }
  }

  return response.status(405).end();
}
