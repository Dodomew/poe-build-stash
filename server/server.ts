require('dotenv').config();

const express = require('express');
const { Client } = require('pg');

const server = express();
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const connectClient = async () => {
    try {
        await client.connect();
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
        await client.end();
        console.log("client disconnected")
    }
}

server.get('/', function (req, res) {
    res.send('Hello Doortje123');
    connectClient();
});

server.listen(3000, function () {
    console.log('App is listening on port 3000');
});