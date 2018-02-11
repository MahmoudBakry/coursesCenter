'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = require('../../models/course');

var createCourse = async function createCourse(req, res, next) {
    //if missing any parameter 
    if (!(req.body.name && req.body.price)) {
        return res.status(422).json({
            "message": "missing required field"
        });
    }
    //create new object of coures 
    var course = new Course({
        _id: new _mongoose2.default.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    var newCourse = await course.save();
    //the response when it created 
    return res.status(201).json({
        "message": "new course has created",
        course: {
            _id: newCourse._id,
            name: newCourse.name,
            price: newCourse.price
        },
        request: {
            "type": "GET",
            "url": "http://" + process.env.HOST + ":" + process.env.PORT + "/courses/" + newCourse._id
        }
    });
};

exports.default = createCourse;