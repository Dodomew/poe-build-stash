require('dotenv').config();

const express = require('express');
const { Client, Pool } = require('pg');

const server = express();
server.use(express.urlencoded({ extended: false })); // make variables from form accessible in the POST request object

import addNewUser from "./database/addNewUser";

const DbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// const connectClient = async () => {
//     const client = await DbPool.connect();
//     try {
//         await client.query("BEGIN");
//         const { rows } = await client.query("select * from users");
//         console.log('queried * from users');
//         console.log(rows)
//         await client.query("COMMIT");
//     }
//     catch (error) {
//         console.log(`Failed to execute query : ${error}`);
//         await client.query("ROLLBACK");
//     }
//     finally {
//         await client.release();
//         console.log("client disconnected");
//     }
// }

server.get('/', function (req, res) {
    console.log('homepage');
});

server.post('/register', async (req, res, next) => {
    console.log("POSTED")
    addNewUser(DbPool, req, res, next);
    res.redirect('/');
})

server.listen(5000, function () {
    console.log('App is listening on port 5000');
});