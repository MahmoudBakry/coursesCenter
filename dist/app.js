'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _course = require('./api/routes/course');

var _course2 = _interopRequireDefault(_course);

var _student = require('./api/routes/student');

var _student2 = _interopRequireDefault(_student);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
//require routes to use it 

var app = (0, _express2.default)();
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static("public"));
//set mongodbUrl
var mongoDb = process.env.MONGODB || 'mongodb://127.0.0.1/coursesCenter';
//setup the connettion 
_mongoose2.default.connect(mongoDb);
// Get Mongoose to use the global promise library
_mongoose2.default.Promise = global.Promise;
//Get the default connection
var db = _mongoose2.default.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//route for upluod image 
var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function filename(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
//pass all of above to multer instance
var upload = (0, _multer2.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 15 //avaliable up to 15 mega
    }
});

app.post("/upload", upload.single("image"), function (req, res) {
    var response = {
        image: req.file.path,
        message: "image has uploaded successfuly"
    };
    res.status(200).json(response);
});

//use our routes 
app.use('/courses', _course2.default);
app.use('/students', _student2.default);

//handel not found request 404 
app.use(function (req, res, next) {
    //1- create new error object with message 
    var error = new Error('Not Found');
    //2- create status of this error 
    error.status = 404;
    //pass this object to next midelware 
    //error : {
    //     "message" : "Not Found",
    //     "status" : 404
    // }
    next(error);
});
//create midelware to handle any thrown error from any where 
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            "message": error.message
        }
    });
});

module.exports = app;