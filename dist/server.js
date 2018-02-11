'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('./app');
var server = _http2.default.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function () {
	console.log('server running now on port.....' + process.env.PORT);
});