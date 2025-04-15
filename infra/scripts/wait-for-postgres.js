const { exec } = require("node:child_process"); // Import the exec function from the child_process module

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn); // Execute the command to check if PostgreSQL is ready

  function handleReturn(err, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    process.stdout.write("\n🟢 Postgres is ready!\n");
  }
}

process.stdout.write("\n🔴 Loading postgres");

checkPostgres();
