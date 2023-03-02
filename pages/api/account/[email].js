import { apiHandler } from "@/helpers/api/api-handler";
import { conn } from "@/utils/dbconnection";

export default apiHandler({
  get: getuserid,
});

async function getuserid(req, res) {
  // validate
  const userid = await checkIfEmailExists(req.query.email);

  if (!userid) {
    throw `User with the email "${email}" do not exists`;
  }
  if (userid) {
    return res.status(200).json(userid);
  } else {
    return null;
  }
}

async function checkIfEmailExists(email) {
  const query = "SELECT user_id FROM southwind.users WHERE email = $1";
  const values = [email];
  return await conn.query(query, values).then((result) => {
    const data = JSON.parse(JSON.stringify(result));
    const userid = data.rows[0];
    return Promise.resolve(userid);
  });
}
