import { conn } from '@/utils/dbconnection';

export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await getRandomImages(req, res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }

async function getRandomImages(req, res) {
    const response = await conn.query(`SELECT g.image_id, g.image_name, g.category_id, g.path_original, c.category_name 
                                        FROM southwind.gallery g INNER JOIN southwind.categories c ON g.category_id = c.category_id
                                        ORDER BY random() LIMIT 20;`);
    const data = response.rows;
     return res.status(200).json(data);
}
