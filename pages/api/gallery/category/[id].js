import { apiHandler} from '../../../../helpers/api/api-handler';
import { conn } from '../../../../utils/dbconnection';

export default apiHandler({
    get: categoryList
});

async function categoryList(req, res) {
   const user_id  = req.query.id;

   var query = "";
    if(user_id > 0)
        query = ("SELECT DISTINCT c.category_id, category_name FROM southwind.gallery g INNER JOIN southwind.categories c ON g.category_id = c.category_id WHERE g.user_id = $1;");      
    else
        query = ("SELECT DISTINCT c.category_id, category_name FROM southwind.gallery g INNER JOIN southwind.categories c ON g.category_id = c.category_id")
   
   const value = [user_id];
   const response = await conn.query(query, value);
   const data = response.rows;
   console.log(data)
   return res.status(200).json(data);
}
