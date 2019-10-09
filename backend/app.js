const express = require('express');
const Database = require("mongoose");
const log = require("morgan");
const environment = require('dotenv');

const bodyParser = require("body-parser");
const authRoute = require('./routes/AuthorizeRoute');
const app = express();

environment.config();

Database.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }).then(
        () => {
            console.log("Connected to Database")
        }
    );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(log("dev"));

app.use('/', authRoute);

module.exports = app;