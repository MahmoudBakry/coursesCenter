'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _allCourses = require('../controller/course/allCourses');

var _allCourses2 = _interopRequireDefault(_allCourses);

var _courseDetails = require('../controller/course/courseDetails');

var _courseDetails2 = _interopRequireDefault(_courseDetails);

var _createCoures = require('../controller/course/createCoures');

var _createCoures2 = _interopRequireDefault(_createCoures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
//get all courses
router.get('/', _allCourses2.default);
//get one course by Id
router.get('/:_id', _courseDetails2.default);
//create new coures
router.post('/', _createCoures2.default);

exports.default = router;