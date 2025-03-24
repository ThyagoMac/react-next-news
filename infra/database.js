//infra/database.js
import { Client } from "pg";

const query = async (params) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: false,
    //ssl: process.env.NODE_ENV === "production",
  });

  try {
    await client.connect();
    const result = await client.query(params);
    return result;
  } catch (err) {
    console.error("Erro na conexão/consulta do banco de dados:");
    console.error(`Host: ${process.env.POSTGRES_HOST}`);
    console.error(`Database: ${process.env.POSTGRES_DB}`);
    console.error(`User: ${process.env.POSTGRES_USER}`);
    console.error("Detalhes do erro:", err.message);
    throw new Error("Erro ao acessar o banco de dados: " + err.message);
  } finally {
    await client.end();
  }
};

export default {
  query: query,
};
