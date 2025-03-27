import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}
beforeAll(cleanDatabase);

test("GET to /api/v1/migrations should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const isArray = Array.isArray(responseBody);

  expect(isArray).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
