require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');
const { Client, Pool } = require('pg');

const server = express();
server.use(express.urlencoded({ extended: false })); // make variables from form accessible in the POST request object

const DbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const connectClient = async () => {
    const client = await DbPool.connect();
    try {
        await client.query("BEGIN");
        const { rows } = await client.query("select * from users");
        console.log('queried * from users');
        console.log(rows)
        await client.query("COMMIT");
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

/*
    User :
    user_id: uuid (database generated that)
    email: string[]
    password: string[]
*/

const addNewUser = async (req, res, next) => {
    const emailAlreadyExists = await doesEmailAlreadyExist(req.body.email);

    if (emailAlreadyExists) {
        console.log('email already exists');
        return;
    }

    try {
        const userId = uuidv4();
        const email = req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const client = await DbPool.connect();
        try {
            console.log('addNewUser');
            await client.query("BEGIN");
            await client.query("INSERT INTO users values($1, $2, $3)", [userId, email, hashedPassword]);
            console.log('INSERT INTO users');
            await client.query("COMMIT");
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
    catch (error) {
        console.log('Error while connecting to database: ' + error);
    }

}

const doesEmailAlreadyExist = async (email) => {
    console.log('doesEmailAlreadyExist');
    console.log(email);
    const client = await DbPool.connect();
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

server.get('/', function (req, res) {
    console.log('homepage');
});

server.post('/register', (req, res, next) => {
    console.log("POSTED")
    addNewUser(req, res, next);
    res.redirect('/');
})

server.listen(5000, function () {
    console.log('App is listening on port 5000');
});