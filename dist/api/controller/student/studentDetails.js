'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _valid_Id = require('../../help/valid_Id');

var _valid_Id2 = _interopRequireDefault(_valid_Id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = require('../../models/course');
var Student = require('../../models/student');

var studentDetails = async function studentDetails(req, res, next) {
    var id = req.params._id;
    if (!id) {
        return res.status(422).json({
            "message": "missing id"
        });
    }
    //validId(id);
    if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
    var studentDetail = await Student.findById(id).select('_id name age imageUrl').populate('courseId', 'name price');
    if (studentDetail) {
        return res.status(200).json({
            student: studentDetail
        });
    }
    return res.status(204).json({
        "message": "no student with this id"
    });
};
exports.default = studentDetails;