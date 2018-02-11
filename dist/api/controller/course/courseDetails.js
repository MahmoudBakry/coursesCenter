'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _valid_Id = require('../..//help/valid_Id');

var _valid_Id2 = _interopRequireDefault(_valid_Id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = require('../../models/course');


var courseDetails = async function courseDetails(req, res, next) {
    var id = req.params._id;
    if (!id) {
        return res.status(422).json({
            "message": "must to sent id of this course"
        });
    }
    //fanction to check if _id is valid
    //validId(id);
    if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
    //retrive course details
    var courseDetail = await Course.findById(id).select('_id name price');
    if (courseDetail) {
        return res.status(200).json({
            data: courseDetail
        });
    }
    return res.status(204).json({
        "message": "no Course has found with this id"
    });
};

exports.default = courseDetails;