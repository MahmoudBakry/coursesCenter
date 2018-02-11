const Course = require('../../models/course');
import mongoose from 'mongoose'
let createCourse = async (req, res, next) => {
    //if missing any parameter 
    if (!(req.body.name && req.body.price)) {
        return res.status(422).json({
            "message": "missing required field"
        })
    }
    //create new object of coures 
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    let newCourse = await course.save();
    //the response when it created 
    return res.status(201).json({
        "message": "new course has created",
        course: {
            _id: newCourse._id,
            name: newCourse.name,
            price: newCourse.price,
        },
        request: {
            "type": "GET",
            "url": "http://" + process.env.HOST + ":" + process.env.PORT + "/courses/" + newCourse._id
        }
    })
}

export default createCourse;