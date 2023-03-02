const bcrypt = require("bcryptjs");
import { apiHandler } from "@/helpers/api/api-handler";
import { conn } from "@/utils/dbconnection";

export default apiHandler({
  post: add,
});

async function add(req, res) {
  // split out password from user details
  console.log("request body", req.body);
  const { status_typeid, status_name, ...status } = req.body;

  // validate
  const statusExists = await checkIfStatusExists(status_name);

  if (
    statusExists &&
    statusExists.status_name.toLowerCase() === status_name.toLowerCase()
  )
    throw `Status name "${category_name}" already exists`;

  //insert status
  const query =
    "INSERT INTO southwind.status(status_name,status_typeid) VALUES($1, $2)";
  const values = [status_name, status_typeid];
  const result = await conn.query(query, values);

  return res.status(200).json(result.rows);
}

async function checkIfStatusExists(status_name) {
  const query = "SELECT * FROM southwind.status WHERE status_name = $1";
  const value = [status_name];
  return await conn.query(query, value).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    const status = data.rows[0];
    return Promise.resolve(status);
  });
}
