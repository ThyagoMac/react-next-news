import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}
beforeAll(cleanDatabase);

test("POST to /api/v1/migrations should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  const isArray = Array.isArray(responseBody);

  expect(isArray).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  //second test would return []
  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();
  const isArray2 = Array.isArray(response2Body);

  expect(isArray2).toBe(true);
  expect(response2Body.length).toBe(0);
});
