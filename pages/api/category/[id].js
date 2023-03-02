const bcrypt = require('bcryptjs');
import { apiHandler} from '../../../helpers/api/api-handler';
import { conn} from '@/utils/dbconnection';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const query = "SELECT category_id, category_name, status_id FROM southwind.categories WHERE category_id = $1;";
    const value = [req.query.id];
    const category = await conn.query(query, value)
    .then(result => {
        const data = JSON.parse(JSON.stringify(result));
        const category = data.rows[0];
        return Promise.resolve(category);
    });

    if (!category) throw 'Category Not Found';

    return res.status(200).json(category);
}

async function update(req, res) {

    const { category_id, category_name, status_id } = req.body;
    
     // validate
    const categoryExists = await checkIfCategoryExists(category_name, category_id);

    if (categoryExists && categoryExists.category_name.toLowerCase() === category_name.toLowerCase())
    throw `Category name "${category_name}" already exists`;

    const update = "UPDATE southwind.categories SET category_name = $1, parent_category_id = $2, status_id = $3 WHERE category_id = $4";
    const values = [category_name, 0, status_id, category_id];
    const result = await conn.query(update, values);
    return res.status(200).json(result.rows);
}

async function checkIfCategoryExists (category_name, category_id) {
    const query = "SELECT * FROM southwind.categories WHERE category_name = $1 AND category_id <> $2;";
    const value = [category_name, category_id]
    return await conn.query(query, value)
    .then(result => {
        const data = JSON.parse(JSON.stringify(result));
        const category = data.rows[0];
        return Promise.resolve(category);
    });
        
  }

async function _delete(req, res) {
    const query = "DELETE FROM southwind.categories  WHERE category_id = $1 ;";
    const category_id = [req.query.id];
    const delete_category = await conn.query(query, category_id)
    return res.status(200).json({});
}
