import { apiHandler } from "@/helpers/api/api-handler";
import { conn } from "@/utils/dbconnection";

export default apiHandler({
  get: statusList,
});

async function statusList(req, res) {
  const response = await conn.query(
    "SELECT status_id, status_name, status_typeid FROM southwind.status ORDER BY status_name;"
  );
  const data = response.rows;
  console.log("status", data);
  return res.status(200).json(data);
}
