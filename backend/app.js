const express = require('express');
const Database = require("mongoose");
const log = require("morgan");
const environment = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const guestRoute = require('./api/AuthorizeRoute');
const authRoute = require('./api/AuthorizedRoute');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');

const app = express();

environment.config();

app.use(log("dev"));

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
app.use(methodOverride('_method'));
app.use(bodyParser.json());

const connection = Database.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

// connection.once('open', function() {
//     // Initialize file stream
//     gfs = Grid(connection.db, Database.mongo);
//     gfs.collection('uploads');
// })
//
// // Create storage engine
// const storage = new GridFsStorage({
//     url: process.env.DB_CONNECT,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });
// const upload = multer({ storage });

app.use('/', guestRoute);
app.use('/user', authRoute);
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.send(req.file);
// });
module.exports = app;