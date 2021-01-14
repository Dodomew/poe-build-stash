const express = require('express');
const server = express();

server.get('/', function (req, res) {
    res.send('Hello Doortje!');
});

server.listen(3000, function () {
    console.log('App is listening on port 3000');
});