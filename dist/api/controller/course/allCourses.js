'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = require('../../models/course');


var allCourses = async function allCourses(req, res, next) {
    var perPage = 2;
    var page = req.query.page || 1;
    var allCourses = await Course.count();
    var courses = await Course.find().skip(perPage * page - perPage).limit(perPage);
    if (courses.length > 0) {
        return res.status(200).json({
            allCourses: allCourses,
            count: courses.length,
            pages: Math.ceil(allCourses / perPage),
            currentPage: page,
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