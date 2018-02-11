import http from 'http'
const app = require('./app');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log('server running now on port.....' + process.env.PORT );
})