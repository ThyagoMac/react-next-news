//infra/database.js
import { Client } from "pg";

const query = async (queryObject) => {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error("Erro na conexão/consulta do banco de dados:");
    console.error(`Host: ${process.env.POSTGRES_HOST}`);
    console.error(`Database: ${process.env.POSTGRES_DB}`);
    console.error(`User: ${process.env.POSTGRES_USER}`);
    console.error("Detalhes do erro:", err.message);
    throw err;
  } finally {
    await client.end();
  }
};

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
    //ssl: process.env.NODE_ENV === "production",
  });
  await client.connect();
  return client;
};

export default {
  query,
  getNewClient,
};

const getSSLValues = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
};
