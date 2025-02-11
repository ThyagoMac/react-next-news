//pages/api/v1/status/index.js
import database from "@/infra/database";

async function status(request, response) {
  const result = await database.query("SELECT NOW()");
  console.log("result: ", result);
  response.status(200).json({ status: "OK" });
}
export default status;
