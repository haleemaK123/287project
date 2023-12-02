const http = require("http");
const url = require("url");
const Database = require('./databaseForDeleting'); // Assuming database.js is in the same directory

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname === '/delete' && req.method === 'POST') {
    const db = new Database();
    db.connect();
    db.deleteRecord();
    db.close();

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Record deleted successfully');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 9000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
