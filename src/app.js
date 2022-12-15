const express = require('express');
const Http = require('http');
const routes = require('./routes');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const http = Http.createServer(app);
// const port = process.env.EXPRESS_PORT;
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/', routes);

http.listen(port, (req, res) => {
  console.log(`Start listen Server:test ${port}`);
});

module.exports = http;
