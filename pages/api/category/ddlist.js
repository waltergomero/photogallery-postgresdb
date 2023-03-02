import { apiHandler} from '@/helpers/api/api-handler';
import { conn } from '@/utils/dbconnection';

export default apiHandler({
    get: categoryDDList
});

async function categoryDDList(req, res) {
   const query ="SELECT category_id, category_name FROM southwind.categories ORDER BY category_name";

   const response = await conn.query(query);
    return res.status(200).json(response.rows);
}
