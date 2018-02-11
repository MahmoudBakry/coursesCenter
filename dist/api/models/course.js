'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var courseSchema = _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    name: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = _mongoose2.default.model('Course', courseSchema);