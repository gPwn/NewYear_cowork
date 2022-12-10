const express = require('express');
const Http = require('http');
const routes = require('./routes');
require('dotenv').config();

const cookieParser = require('cookie-parser');

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT;

app.use(cookieParser());
app.use(express.json());
app.use('/api', routes);

http.listen(port, (req, res) => {
  console.log(`Start listen Server:test ${port}`);
});

module.exports = http;
