'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = require('../../models/course');

var allCourses = async function allCourses(req, res, next) {
    var courses = await Course.find();
    if (courses.length > 0) {
        return res.status(200).json({
            count: courses.length,
            data: courses.map(function (elem) {
                return {
                    _id: elem._id,
                    name: elem.name,
                    price: elem.price,
                    request: {
                        type: 'GET',
                        url: "http://" + process.env.HOST + ":" + process.env.PORT + "/courses/" + elem._id
                    }
                };
            })
        });
    }
    return res.status(204).json({
        "message": "no courses exist yet"
    });
};

exports.default = allCourses;