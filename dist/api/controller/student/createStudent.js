'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = require('../../models/course');
var Student = require('../../models/student');

var createStudent = async function createStudent(req, res, next) {
    //check on required fields
    if (!(req.body.name && req.body.courseId)) {
        return res.status(422).json({
            "message": "required field is missid"
        });
    }
    var id = req.body.courseId;
    var courseDetails = await Course.findById(id).select('_id name price');
    if (courseDetails) {
        var student = new Student({
            _id: new _mongoose2.default.Types.ObjectId(),
            name: req.body.name,
            age: req.body.age,
            imageUrl: req.body.imageUrl,
            courseId: req.body.courseId
        });
        var newStudent = await student.save();
        return res.status(201).json({
            "message": "new student has created",
            student: {
                _id: newStudent._id,
                name: newStudent.name,
                age: newStudent.age,
                imageUrl: newStudent.imageUrl,
                course: {
                    name: courseDetails.name,
                    price: courseDetails.price
                }
            },
            request: {
                "type": "GET",
                "url": "http://" + process.env.HOST + ":" + process.env.PORT + "/students/" + newStudent._id
            }
        });
    }
    return res.status(400).json({
        "message": "no course found with this id"
    });
};

exports.default = createStudent;