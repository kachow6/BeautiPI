let http = require('http');

let server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end();
});

server.listen(80);
console.log('listening...');
