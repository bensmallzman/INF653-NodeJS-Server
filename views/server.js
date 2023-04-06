const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// if i put any parameters in .listen then i get errno -98 'EADDRINUSE'
server.listen( () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});