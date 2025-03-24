test("Get to /api/v1/status should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json(response);
  const updatedAt = new Date(responseBody.updated_at).toISOString();

  console.log(responseBody);

  expect(responseBody.updated_at).toEqual(updatedAt);
  expect(["16.8", "16.6"]).toContain(responseBody.dependences.database.version);
  expect([901, 100]).toContain(
    responseBody.dependences.database.max_connections,
  );
  expect(responseBody.dependences.database.opened_connections).toEqual(1);
});
