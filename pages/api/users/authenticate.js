const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';
import { conn } from '@/utils/dbconnection';
import { apiHandler} from '@/helpers/api/api-handler';

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const { email, password } = req.body;
    const user = await getData(email);

    if(!user){
        console.log("use does not exists.");
        throw "User with this email doesn't exists.";}

    // validate
    if (!(user && bcrypt.compareSync(password, user.password))) {
        console.log("something is incorrect");
        throw 'Email or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // return basic user details and token
    return res.status(200).json({
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        token
    });
}

async function getData (email) {
    const query = "SELECT * FROM southwind.users WHERE email = $1";
    const value = [email]
    return await conn.query(query, value)
        .then(result => {
            const data = JSON.parse(JSON.stringify(result));
            const user = data.rows[0];
            console.log("returned user:", user)
            return Promise.resolve(user);
        });
        
  }