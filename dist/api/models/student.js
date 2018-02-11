'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = require('./course');

var studentSchema = _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    imageUrl: {
        type: String,
        default: "https://cdn4.iconfinder.com/data/icons/professions-1-2/151/8-512.png"
    },
    courseId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

module.exports = _mongoose2.default.model('Student', studentSchema);