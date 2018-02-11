require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import multer from 'multer'
//require routes to use it 
import courseRoutes from './api/routes/course';
import studentRouutes from './api/routes/student';
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
//set mongodbUrl
const mongoDb = process.env.MONGODB || 'mongodb://127.0.0.1/coursesCenter';
//setup the connettion 
mongoose.connect(mongoDb);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
//route for upluod image 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
//pass all of above to multer instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 15 //avaliable up to 15 mega
    },
});

app.post("/upload", upload.single("image"), (req, res) => {
    const response = {
        image : req.file.path,
        message : "image has uploaded successfuly"
    }
    res.status(200).json(response);
});

//use our routes 
app.use('/courses', courseRoutes);
app.use('/students', studentRouutes)


//handel not found request 404 
app.use((req, res, next) => {
    //1- create new error object with message 
    const error = new Error('Not Found');
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
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            "message": error.message
        }
    });
});


module.exports = app;