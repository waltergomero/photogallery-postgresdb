import { apiHandler} from '../../../../helpers/api/api-handler';
import { conn } from '../../../../utils/dbconnection';

export default apiHandler({
    get: imagesByCategory
});

async function imagesByCategory(req, res) {

   var query = (`SELECT a.category_id, a.category_name, b.path_original
                    FROM (
                            SELECT c.category_id, c.category_name, MAX(image_id) as image_id 
                                FROM southwind.gallery g INNER JOIN southwind.categories c ON g.category_id = c.category_id
                                    GROUP BY c.category_id, c.category_name) as a
                                        INNER JOIN southwind.gallery b on a.image_id = b.image_id
                                        ORDER BY a.category_name;`);      

   const response = await conn.query(query);
   const data = response.rows;
   console.log(data)
   return res.status(200).json(data);
}
