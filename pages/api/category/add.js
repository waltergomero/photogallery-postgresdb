const bcrypt = require('bcryptjs');
import { apiHandler} from '../../../helpers/api/api-handler';
import { conn } from '@/utils/dbconnection';


export default apiHandler({
    post: add
});

async function add(req, res) {
    
    const {category_id, category_name, ...category } = req.body;
    
    //get active status id until it's solved in the UI
    const status_id = await getStatusId();
    
    // validate
    const categoryExists = await checkIfCategoryExists(category_name);
 
    if (categoryExists && categoryExists.category_name.toLowerCase() === category_name.toLowerCase())
        throw `Category name "${category_name}" already exists`;
    
    //insert category
    const query = "INSERT INTO southwind.categories(category_name, parent_category_id, status_id)  VALUES($1, $2, $3)";
    const values = [category_name, 0, status_id];
    const result = await conn.query(query, values);
      
    return res.status(200).json(result.rows);
}

async function checkIfCategoryExists (category_name) {
    const query = "SELECT * FROM southwind.categories WHERE category_name = $1";
    const value = [category_name]
    return await conn.query(query, value)
    .then(result => {
        const data = JSON.parse(JSON.stringify(result));
        const category = data.rows[0];
        return Promise.resolve(category);
    });
        
  }

async function getStatusId () {
    const query ="SELECT status_id FROM southwind.status WHERE status_name = $1 AND status_typeid = $2";
    const values =['Active', 0];
    return await conn.query(query, values)
    .then(result => {
        const data = JSON.parse(JSON.stringify(result));
        const status = data.rows[0];
        return Promise.resolve(status["status_id"]);
    });
        
  }
