const http = require('http');
const hostname = "127.0.0.1";//'herokuapp.com';
const port = process.env.PORT;
console.log("current port: "+ process.env.PORT);
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});


server.listen(port,()=> {
  console.log(`Server running at http://${hostname}:${port}/`);
});
