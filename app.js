const http = require('http');
const hostname = 'herokuapp.com';
const port = process.env.PORT;
console.log(port);
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});


server.listen(port,hostname, ()=> {
  console.log(`Server running at http://${hostname}:${port}/`);
});
