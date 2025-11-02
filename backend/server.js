const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Bind the router db to the app
server.db = router.db;

// Enable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Use json-server-auth
server.use(auth);
server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server with Auth is running on http://localhost:${PORT}`);
});