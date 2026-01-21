const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("data/db.json");
const middlewares = jsonServer.defaults();

// ✅ REQUIRED: bind the router db to the app
server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ✅ auth MUST come after db binding
server.use(auth);

// ✅ router MUST come last
server.use(router);

server.listen(8000, () => {
  console.log("🚀 JSON Server + Auth running on http://localhost:8000");
});
