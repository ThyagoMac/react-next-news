//pages/api/v1/status/index.js
import database from "@/infra/database";

async function status(request, response) {
  const databaseResult = await database.query("SHOW server_version;");

  const version = databaseResult.rows[0].server_version;
  const updatedAt = new Date().toISOString();

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const dataBaseMaxConnections =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const dataBaseOpenConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const dataBaseOpenConnections = dataBaseOpenConnectionsResult.rows[0].count;

  response.status(200).json({
    status: "OK",
    updated_at: updatedAt,
    dependences: {
      database: {
        version,
        max_connections: +dataBaseMaxConnections,
        opened_connections: dataBaseOpenConnections,
      },
    },
  });
}
export default status;
