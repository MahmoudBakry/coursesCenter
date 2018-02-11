"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validId = function validId(id, res, req, next) {
    if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
};

exports.default = validId;