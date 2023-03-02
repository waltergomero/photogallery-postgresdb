import { apiHandler} from '@/helpers/api/api-handler';
import { conn } from '@/utils/dbconnection';

export default apiHandler({
    get: getCategories
});

async function getCategories(req, res) {
    console.log("land here:", req)
    const query = "SELECT c.category_id, c.category_name, c.parent_category_id, c2.category_name as parent_category_name, s.status_name FROM southwind.categories c\
    LEFT JOIN southwind.categories c2 ON c.parent_category_id = c2.category_id  INNER JOIN southwind.status s ON c.status_id = s.status_id ORDER BY c.category_name;";

   const response = await conn.query(query);
   console.log("returned data:", response)
    return res.status(200).json(response.rows);
}
