const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
import { error, ok } from "../result"

const addNewUser = async (dbPool, req, res, next) => {
    const emailAlreadyExists = await doesEmailAlreadyExist(dbPool, req.body.email);

    if (emailAlreadyExists) {
        return error("User email already exists");
    }

    try {
        const userId = uuidv4();
        const email = req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const client = await dbPool.connect();
        try {
            console.log('addNewUser');
            await client.query("BEGIN");
            await client.query("INSERT INTO users values($1, $2, $3)", [userId, email, hashedPassword]);
            console.log('INSERT INTO users');
            await client.query("COMMIT");
            return ok("User added to db");
        }
        catch (error) {
            console.log(`Failed to execute query : ${error}`);
            await client.query("ROLLBACK");
            return error("Failed executing query");
        }
        finally {
            await client.release();
            console.log("client disconnected");
        }
    }
    catch (error) {
        console.log('Error while connecting to database: ' + error);
        return error("Failed to connect to the database");
    }
}

const doesEmailAlreadyExist = async (dbPool, email) => {
    console.log('doesEmailAlreadyExist');
    console.log(email);
    const client = await dbPool.connect();
    try {
        await client.query("BEGIN");
        const { rows } = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        console.table(rows);
        console.log('checked if email already exists');
        await client.query("COMMIT");

        return rows.length > 0;
    }
    catch (error) {
        console.log(`Failed to execute query : ${error}`);
        await client.query("ROLLBACK");
    }
    finally {
        await client.release();
        console.log("client disconnected");
    }
}

export default addNewUser;