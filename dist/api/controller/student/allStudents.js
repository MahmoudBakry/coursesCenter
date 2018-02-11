'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Student = require('../../models/student');


var allStudents = async function allStudents(req, res, next) {
    var perPage = 2;
    var page = req.query.page || 1;
    var allStudents = await Student.count();
    var students = await Student.find().populate('courseId', 'name price').skip(perPage * page - perPage).limit(perPage);
    if (students.length > 0) {
        return res.status(200).json({
            allStudents: allStudents,
            count: students.length,
            pages: Math.ceil(allStudents / perPage),
            currentPage: page,
            data: students.map(function (elem) {
                return {
                    _id: elem._id,
                    name: elem.name,
                    age: elem.age,
                    imageUrl: elem.imageUrl,
                    courseId: elem.courseId,
                    request: {
                        type: 'GET',
                        url: "http://" + process.env.HOST + ":" + process.env.PORT + "/students/" + elem._id
                    }
                };
            })

        });
    }
    return res.status(204).json({
        //"message": "no courses exist yet"
    });
};

exports.default = allStudents;