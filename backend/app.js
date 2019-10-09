const express = require('express');
const app = express();
const Database = require("mongoose");
const authRoute = require('./routes/AuthorizeRoute');
const log = require("morgan");
const environment = require('dotenv');

environment.config();

Database.connect(process.env.DB_CONNECT, { useNewUrlParser: true});

app.use(log("dev"));

app.use('/', authRoute);

module.exports = app;