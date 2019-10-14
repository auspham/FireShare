global.__basedir = __dirname;

const express = require('express');
const Database = require("mongoose");
const environment = require('dotenv');
const cors = require('cors');

const bodyParser = require("body-parser");
const guestRoute = require('./api/AuthorizeRoute');
const authRoute = require('./api/AuthorizedRoute');
const downloadRoute = require('./api/DownloadFile');

const app = express();

environment.config();


// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, auth-token"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = Database.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true });


app.use('/', guestRoute);
app.use('/user', authRoute);
app.use('/storage', downloadRoute);

module.exports = app;