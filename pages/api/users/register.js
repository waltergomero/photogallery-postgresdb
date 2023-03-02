const bcrypt = require('bcryptjs');
import { apiHandler } from '@/helpers/api/api-handler';
import { conn } from '@/utils/dbconnection';

export default apiHandler({
    post: register
});

async function register(req, res) {
    // split out password from user details 
    const { first_name, last_name, email, ...user } = req.body;
    
    // validate
    const userExists = await checkIfEmailExists(email);
    console.log("does user exist", userExists);
    if (userExists && userExists.email === email)
        throw `User with the email "${email}" already exists`;
    
    // hash password
    const password = bcrypt.hashSync(user.password, 10);    
   
    //insert user
    const query = "INSERT INTO southwind.users(first_name, last_name, email, password) VALUES($1, $2, $3, $4)";
    const values = [first_name, last_name, email, password ];
    const result = await conn.query(query, values);
      
    return res.status(200).json(result.rows);
}

async function checkIfEmailExists (email) {
    const query = "SELECT * FROM southwind.users WHERE email = $1";
    const values = [email];
    return await conn.query(query, values)
    .then(result => {
        const data = JSON.parse(JSON.stringify(result));
        const user = data.rows[0];
        return Promise.resolve(user);
    });
        
  }