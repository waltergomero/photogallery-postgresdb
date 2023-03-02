import { apiHandler } from "@/helpers/api/api-handler";
import { conn } from "@/utils/dbconnection";

export default apiHandler({
  get: statusDDList,
});

async function statusDDList(req, res) {
  const query =
    "SELECT status_id, status_name FROM southwind.status WHERE status_typeid = $1";
  const type_id = [0];

  const response = await conn.query(query, type_id);

  return res.status(200).json(response.rows);
}
