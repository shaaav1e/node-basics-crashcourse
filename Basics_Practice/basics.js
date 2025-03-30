import http from 'http'; // Core module in Node.js
import fs from 'fs/promises'; // For reading and writing files
import url from 'url';
import path from 'path';

const PORT = process.env.PORT || 3000;


//____________________________________________________________________________________

// Simple Get, Post, Put, Delete Request

// const http = require('http');

// const server = http.createServer((req, res) => {
//   console.log(`Received a ${req.method} request at ${req.url}`);

//   // Set response headers
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   if (req.method === 'GET') {
//     res.end('Received a GET request!');
//   } else if (req.method === 'POST') {
//     let body = '';
//     req.on('data', chunk => {
//       body += chunk.toString();
//     });
//     req.on('end', () => {
//       res.end(`Received a POST request with data: ${body}`);
//     });
//   } else if (req.method === 'PUT') {
//     let body = '';
//     req.on('data', chunk => {
//       body += chunk.toString();
//     });
//     req.on('end', () => {
//       res.end(`Received a PUT request with updated data: ${body}`);
//     });
//   } else if (req.method === 'DELETE') {
//     res.end('Received a DELETE request!');
//   } else {
//     res.writeHead(405, { 'Content-Type': 'text/plain' });
//     res.end('Method not allowed');
//   }
// });

// server.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// Nodemon is no longer required. You can also use the in-built "--watch" flag with node command from node v18.11 and above.




// Get Current Path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
    try {
        if (req.method === "GET") {
            let filepath;

            if (req.url === "/") {
                filepath = path.join(__dirname, 'public', 'index.html');
            } else if (req.url === "/about") {
                filepath = path.join(__dirname, 'public', 'about.html');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('ERROR 404! Page Not Found');
                return;
            }
//_______________________________________________________

            // To Read file
            const data = await fs.readFile(filepath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid Request" }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Server Error" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'Server is running successfully!' }));
// });


