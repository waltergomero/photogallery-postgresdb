import { apiHandler} from '@/helpers/api/api-handler';
import { conn } from '@/utils/dbconnection';

export default apiHandler({
    get: getImagesByUserId,
    put: update,
    delete: _delete
});

async function getImagesByUserId(req, res) {
    const userid = req.query.id;
    var query = "";
    if(userid > 0)
        query = "SELECT * FROM southwind.gallery WHERE user_id = $1;"     
    else
        query = "SELECT * FROM southwind.gallery;";

    const value = [userid];
    const images = await conn.query(query, value);

    return res.status(200).json(images.rows);
}


async function update(req, res) {
    const image_id = req.body.image_id;
    const title = req.body.title;
    const category_id = req.body.category_id;
    const description = req.body.description;
    const user_id = req.body.user_id;

    // validate
    const query = "UPDATE southwind.gallery SET title = $1, category_id = $2, description = $3, user_id = $4 WHERE image_id = $5";
    const value = [title, category_id, description, user_id, image_id];
    const results = await conn.query(query, value);
    return res.status(200).json(results.rows);
}

async function _delete(req, res) {
    const image_id = req.query.id;
    const query = "DELETE FROM southwind.gallery  WHERE image_id = $1 ";
    const value = [image_id];
    const delete_image = await conn.query(query, value);

    return res.status(200).json({});
}
