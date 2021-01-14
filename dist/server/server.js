var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');
const { Client, Pool } = require('pg');
const server = express();
server.use(express.urlencoded({ extended: false })); // make variables from form accessible in the POST request object
const DbClient = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});
const DbPool = new Pool();
const connectClient = () => __awaiter(this, void 0, void 0, function* () {
    const client = yield DbPool.connect();
    try {
        yield client.query("BEGIN");
        const { rows } = yield client.query("select * from users");
        console.log('queried * from users');
        console.log(rows);
        yield client.query("COMMIT");
    }
    catch (error) {
        console.log(`Failed to execute query : ${error}`);
        yield client.query("ROLLBACK");
    }
    finally {
        yield client.release();
        console.log("client disconnected");
    }
});
/*
    User :
    user_id: uuid (database generated that)
    email: string[]
    password: string[]
*/
const addNewUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (yield doesEmailAlreadyExist(req.body.email)) {
        console.log('email already exists');
        res.redirect('/register');
        return;
    }
    try {
        const userId = uuidv4();
        const email = req.body.email;
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        const client = yield DbPool.connect();
        try {
            console.log('addNewUser');
            yield client.query("BEGIN");
            yield client.query("INSERT INTO users values($1, $2, $3)", [userId, email, hashedPassword]);
            console.log('INSERT INTO users');
            yield client.query("COMMIT");
        }
        catch (error) {
            console.log(`Failed to execute query : ${error}`);
            yield client.query("ROLLBACK");
        }
        finally {
            yield client.release();
            console.log("client disconnected");
        }
    }
    catch (error) {
        console.log('Error while connecting to database: ' + error);
        res.redirect('/redirect');
    }
    finally {
        res.redirect('/redirect');
    }
});
const doesEmailAlreadyExist = (email) => __awaiter(this, void 0, void 0, function* () {
    console.log('doesEmailAlreadyExist');
    console.log(email);
    const client = yield DbPool.connect();
    try {
        yield client.query("BEGIN");
        yield client.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log('checked if email already exists');
        yield client.query("COMMIT");
        return true;
    }
    catch (error) {
        console.log(`Failed to execute query : ${error}`);
        yield client.query("ROLLBACK");
    }
    finally {
        yield client.releases();
        console.log("client disconnected");
    }
});
server.get('/', function (req, res) {
    console.log('homepage');
});
server.post('/register', (req, res) => {
    console.log("POSTED");
    addNewUser(req, res);
    // res.redirect('/');
});
server.listen(5000, function () {
    console.log('App is listening on port 5000');
});
//# sourceMappingURL=server.js.map