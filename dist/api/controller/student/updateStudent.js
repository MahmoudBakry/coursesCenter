'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Student = require('../../models/student');

var updateStudent = async function updateStudent(req, res, next) {
    var id = req.params._id;
    if (!id) {
        return res.status(422).json({
            "message": "missing id"
        });
    }
    if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
    var studentInfo = await Student.findById(id);
    try {
        await Student.update({ _id: id }, {
            $set: {
                name: req.body.name || studentInfo.name,
                age: req.body.age || studentInfo.age,
                courseId: req.body.courseId || studentInfo.courseId,
                imageUrl: req.body.imageUrl || studentInfo.imageUrl
            }
        });
        var newStudent = await Student.findById(id);
        return res.status(200).json({
            "message": "updating complete correctly",
            student: {
                name: newStudent.name,
                age: newStudent.age,
                _id: newStudent._id,
                imageUrl: newStudent.imageUrl,
                courseId: newStudent.courseId
            }
        });
    } catch (err) {
        return res.status(500).json({
            "message": "updating process not completed",
            error: err
        });
    }
};

exports.default = updateStudent;