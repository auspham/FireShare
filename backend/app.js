const express = require('express');
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/AuthorizeRoute');
const morgan = require("morgan");

app.use('/', authRoute);


module.exports = app;