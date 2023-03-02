import { conn } from '@/utils/dbconnection';

export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await getImagesByCategoryId(req, res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }

async function getImagesByCategoryId(req, res) {

    const category_id = req.query.id;
    const query = "SELECT * FROM southwind.gallery WHERE category_id = $1;"     
    const value = [category_id];

    const response = await conn.query(query, value);
    const data = response.rows;
    return res.status(200).json(data);
}

