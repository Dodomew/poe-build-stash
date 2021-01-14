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
const { Client } = require('pg');
const server = express();
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});
const connectClient = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield client.connect();
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
        yield client.end();
        console.log("client disconnected1");
    }
});
server.get('/', function (req, res) {
    connectClient();
});
server.listen(3000, function () {
    console.log('App is listening on port 3000');
});
//# sourceMappingURL=server.js.map