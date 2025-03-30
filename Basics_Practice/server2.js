import { createServer } from 'http';
const PORT = process.env.PORT || 3000;

//Middleware / Routing / Get Req Body for Post

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Jim Doe' },
];

//MIDDLEWARE: Middleware is a function that sits b/w the request and response in a web server. It processes the request and response objects and performs some operations on them. It can be used to perform the following tasks: Execute any code. Make changes to the request and the response objects. End the request-response cycle. Call the next middleware function in the stack.

//_______________________________________________________

// const logger = (req,res,next) => 
// {
//     console.log(`${req.method} ${req.url}`);
//     next();
// }
// app.use(logger);
// app.get('/',(req,res) =>
// {
//     res.send('Hi');
// });

//_______________________________________________________


// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

//_______________________________________________________

//Route Handler: A route handler is a callback function that is called when a request matches a specific route. It is responsible for processing the request and sending the response back to the client. The route handler takes two arguments: req: The request object that contains information about the request. res: The response object that is used to send the response back to the client.

//_______________________________________________________

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split('/')[3];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'User not found' }));
  }
  res.end();
};

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = '';
  // Listen for data
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// Not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Route not found' }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === 'GET'
      ) {
        getUserByIdHandler(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



// const server=http.createServer((req,res) =>
// {
// if(req.url==='/api/users' && req.method === 'GET')
// {
// res.setHeader('Content-Type','application/json');
// res.write(JSON.stringify(users));
//JSON.stringify() converts a JavaScript object to a JSON string.
//JSON.parse() converts a JSON string to a JavaScript object.
// res.end();
// }
// else
// {
//     res.setHeader('Content-Type','application/json');
//     res.write(JSON.stringify({message: 'Route not found'}));
// }
// });

