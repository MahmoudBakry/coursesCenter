const Course = require('../../models/course');
const Student = require('../../models/student');
import mongoose from 'mongoose'
let createStudent = async (req, res, next) => {
    //check on required fields
    if (!(req.body.name && req.body.courseId)) {
        return res.status(422).json({
            "message": "required field is missid"
        })
    }
    let id = req.body.courseId;
    const courseDetails = await Course.findById(id).select('_id name price');
    if (courseDetails) {
        const student = new Student({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            age: req.body.age,
            imageUrl: req.body.imageUrl,
            courseId: req.body.courseId
        });
        let newStudent = await student.save();
        return res.status(201).json({
            "message": "new student has created",
            student: {
                _id: newStudent._id,
                name: newStudent.name,
                age: newStudent.age,
                imageUrl: newStudent.imageUrl,
                course: {
                    name: courseDetails.name,
                    price: courseDetails.price,
                }
            },
            request: {
                "type": "GET",
                "url": "http://" + process.env.HOST + ":" + process.env.PORT + "/students/" + newStudent._id
            }
        })
    }
    return res.status(400).json({
        "message": "no course found with this id"
    })
}

export default createStudent;