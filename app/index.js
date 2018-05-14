const express = require('express');
// middlewares
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
// database
const db = require('./db');
// api
const api = require('./api');

// app instance
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/api', api);

module.exports = app;