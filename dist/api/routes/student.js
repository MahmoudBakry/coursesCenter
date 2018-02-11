'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _createStudent = require('../controller/student/createStudent');

var _createStudent2 = _interopRequireDefault(_createStudent);

var _studentDetails = require('../controller/student/studentDetails');

var _studentDetails2 = _interopRequireDefault(_studentDetails);

var _updateStudent = require('../controller/student/updateStudent');

var _updateStudent2 = _interopRequireDefault(_updateStudent);

var _removeStudent = require('../controller/student/removeStudent');

var _removeStudent2 = _interopRequireDefault(_removeStudent);

var _allStudents = require('../controller/student/allStudents');

var _allStudents2 = _interopRequireDefault(_allStudents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//create new student 
router.post('/', _createStudent2.default);
//retrive one student 
router.get('/:_id', _studentDetails2.default);
//retrive all student 
router.get('/', _allStudents2.default);
//update student info 
router.put('/:_id', _updateStudent2.default);
//remove one student 
router.delete('/:_id', _removeStudent2.default);

exports.default = router;