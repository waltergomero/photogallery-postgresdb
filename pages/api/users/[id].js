const bcrypt = require("bcryptjs");

import { apiHandler } from "@/helpers/api/api-handler";
import { omit } from "@/helpers/api";
import { conn } from "@/utils/dbconnection";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const query =
    "SELECT user_id, first_name, last_name, email, password FROM southwind.users WHERE user_id = $1";
  const value = [req.query.id];
  const user = await conn.query(query, value).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    const user = data.rows[0];
    return Promise.resolve(user);
  });

  if (!user) throw "User Not Found";
  console.log("user: ", user);
  return res.status(200).json(omit(user, "hash"));
}

async function update(req, res) {
  const { user_id, first_name, last_name, email, ...params } = req.body;

  // validate
  const query =
    "SELECT * FROM southwind.users WHERE email = $1 AND user_id <> $2";
  const values = [email, user_id];
  const user = await conn.query(query, values).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    const user = data.rows[0];
    return Promise.resolve(user);
  });

  if (user) throw `User with the email "${email}" already exists`;

  const query2 =
    "UPDATE southwind.users SET first_name = $1, last_name = $2, email = $3 WHERE user_id = $4";
  const values2 = [first_name, last_name, email, user_id];
  const result = await conn.query(query2, values2);
  return res.status(200).json(result.rows);
}

async function _delete(req, res) {
  const query = "DELETE FROM southwind.users WHERE user_id = $1;";
  const value = [req.query.id];
  const result = await conn.query(query, value);
  return res.status(200).json({});
}
