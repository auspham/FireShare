const express = require('express');
const Database = require("mongoose");
const log = require("morgan");
const environment = require('dotenv');

const bodyParser = require("body-parser");
const guestRoute = require('./routes/AuthorizeRoute');
const authRoute = require('./routes/AuthorizedRoute')
const app = express();

environment.config();

Database.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(log("dev"));

app.use('/', guestRoute);
app.use('/user', authRoute);

module.exports = app;