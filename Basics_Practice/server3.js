import { createServer } from 'http';

//For coding practice - Middleware / Routing / Get Req Body for Post

const PORT = process.env.PORT || 3000;

// A REST API (Representational State Transfer API) is a set of rules that allows apps to communicate over the internet using HTTP methods like GET, POST, PUT & DELETE. It follows a stateless architecture, meaning each request from a client contains all necessary information and server does not store any session data. REST APIs are used to build web services that are lightweight, maintainable, and scalable.

const users = [
    { id: 128, name: 'Swz' },
    { id: 134, name: 'Mtk' },
    { id: 133, name: 'Kb' },
];

// Request comes in goes through logger
// Server checks request url and http method to determine which function (route handler in this case) should handle the request
// GET /api/users will call --> getUsersHandler
// GET /api/users/2 will call --> getUsersHandlerByid

//_______________________________________________________


const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

//_______________________________________________________

// Ensures response is in JSON format
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}


//_______________________________________________________

// Can see all users in JSON String
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

//_______________________________________________________

// api/users/:id -> Getting by specific id
const getUsersHandlerByid = (req, res) => {
    const id = req.url.split('/')[3]; // Extract ID from URL
    const user = users.find((user) => user.id === parseInt(id));

    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
}

//_______________________________________________________

// Handle POST /api/users -> Creating a new user

const createUserHandler = (req, res) => {

// When a client sends data (e.g., a new user) in a POST request, it doesn't arrive all at once.
// Instead, it comes in small "chunks" of data.
// This body variable will store the full data once all chunks are received.
  let body = '';
  req.on('data', callback) 
//  Listens for incoming data chunks.
//  Each chunk is received in binary form, so chunk.toString() converts it into text (a string).
//  These chunks keep adding to the body variable until the request is fully received.
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

//When all data is received, the end event triggers.
// 1) JSON.parse(body) converts the JSON string from the request body into a JavaScript object.
// 2) users.push(newUser) adds the new user to the users array.
// 3) res.statusCode = 201 sets the HTTP status code to 201 Created, indicating success.
// 4) res.write(JSON.stringify(newUser)) sends the new user back as a response in JSON format.
// 5) res.end() ends the response.

  req.on('end', () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// Not Found Handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
}

// This is how next() works in middleware functions
// when next is called, next() passes control to the next function in the chain
// Middleware is structured this way so each request flows through multiple functions in order.


//_______________________________________________________

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req, res);
            }
            else if (req.url.match(/^\/api\/users\/\d+$/) && req.method === 'GET') {
                getUsersHandlerByid(req, res);
            }
            else if (req.url === '/api/users' && req.method === 'POST') {
                createUserHandler(req, res);
            }
            else {
                notFoundHandler(req, res);
            }
        });
    });
});

//_______________________________________________________

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
