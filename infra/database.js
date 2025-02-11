//infra/database.js
import { Client } from "pg";

const query = async (params) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(params);
  client.end();

  console.log(result);
  return result;
};

export default {
  query: query,
};
