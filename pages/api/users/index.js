import { apiHandler} from '@/helpers/api/api-handler';
import { conn } from '@/utils/dbconnection';

export default apiHandler({
    get: getUsers
});

async function getUsers(req, res) {
    const response = await conn.query("SELECT user_id, first_name, last_name, email FROM southwind.users;");
    const data = response.rows;
     return res.status(200).json(data);
}
