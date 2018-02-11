'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Student = require('../../models/student');

var removeStudent = async function removeStudent(req, res, next) {
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
    try {
        var studentDetails = await Student.findById(id);
        if (studentDetails) {
            await Student.remove({ _id: id });
            return res.status(204).json({
                "message": "student has deleted"
            });
        } else {
            return res.status(400).json({
                "message": "no student with this id"
            });
        }
    } catch (error) {
        return res.status(500).json({
            "message": "deletting has error",
            err: error
        });
    }
};

exports.default = removeStudent;