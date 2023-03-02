const bcrypt = require("bcryptjs");
import { apiHandler } from "@/helpers/api/api-handler";
import { conn } from "@/utils/dbconnection";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const query =
    "SELECT status_id, status_name, status_typeid FROM southwind.status WHERE status_id = $1";
  const value = [req.query.id];
  const status = await conn.query(query, value).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    const status = data.rows[0];
    return Promise.resolve(status);
  });

  if (!status) throw "User Not Found";

  return res.status(200).json(status);
}

async function update(req, res) {
  const { status_id, status_name, status_typeid } = req.body;
  // validate
  const query =
    "SELECT * FROM southwind.status WHERE status_name = $1 AND status_id <> $2";
  const value = [status_name, status_id];

  const status = await conn.query(query, value).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    const s = data.rows[0];
    return Promise.resolve(s);
  });

  if (status) throw `Status "${status_name}" already exists`;

  //usersRepo.update(req.query.id, params);
  const query2 =
    "UPDATE southwind.status  SET status_name = $1, status_typeid = $2 WHERE status_id = $3";
  const value2 = [status_name, status_typeid, status_id];
  const results = await conn.query(query2, value2);

  return res.status(200).json(results.rows);
}

async function _delete(req, res) {
  const status_id = req.query.id;
  const query = "DELETE FROM southwind.status  WHERE status_id = $1 ";
  const value = [status_id];
  const delete_status = await conn.query(query, value);

  return res.status(200).json({});
}
