const Database = require('./databaseForAdding');
// const db = require("./database.js");

// Import the HTTP module
const http = require("http");
// Import the URL module
const url = require("url");
const db = new Database();

// Make our HTTP server
const server = http.createServer((req, res) => {
    // Set our header
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // Parse the request url
    const parsed = url.parse(req.url, true)
    // Get the path from the parsed URL
    const reqUrl = parsed.pathname

    console.log(reqUrl);
console.log (req.method);

if (req.method === 'OPTIONS') {
    res.writeHead(204); // No content
    res.end();
}

    // Compare our request method
    if (req.method == "GET") {
        if (reqUrl == "/") {
            db.insert();
            console.log("hello");
            // Send a JSON version of our URL query
            res.write("Hello, you sent\n" +  JSON.stringify(parsed.query))
            res.end()
        }
    } else if (req.method == "POST") {
        if (reqUrl === "/license") {

            console.log("SUCCESS");
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log(
                    parse(body)
                );
                res.end('ok');
            });
            db.insert();
            res.write("add license");
            res.end()
        }
    }
})
// Have the server listen on port 9000
server.listen(9000)
  

