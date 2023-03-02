import { apiHandler } from "@/helpers/api/api-handler";
import { conn } from "@/utils/dbconnection";

export default apiHandler({
  get: imageList,
});

async function imageList(req, res) {
  //const userid = req.query.userid;
  const { userid, categoryid } = req.query;

  var query = "";
  if (userid > 0) query = "SELECT * FROM southwind.gallery WHERE user_id = $1;";
  else query = "SELECT * FROM southwind.gallery;";

  const value = [userid];
  const images = await conn.query(query, value);

  return res.status(200).json(images.rows);

  //    const {userid, categoryid } = req.query;
  //    console.log("user and category ids: ", userid, categoryid);
  //    const query = "SELECT * FROM southwind.gallery WHERE user_id LIKE $1;";
  //    const value = [userid];
  //    const response = await conn.query(query, value);
  //    const data = response.rows;
  //    console.log("images: ", data);
  //    return res.status(200).json(data);
}
