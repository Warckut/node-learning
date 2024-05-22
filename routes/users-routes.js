const url = require("url");
const usersController = require("../controller");
const json = require("../middlewares/json");

function usersRoutes(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  res.setHeader("Content-Type", "application/json");

  if (path === "/users" && method === "GET") {
    usersController.getUsers(req, res);
  } else if (path === "/users" && method === "POST") {
    json(req, res, (req, res) => {
      usersController.createUser(req, res);
    });
  } else if (path.startsWith("/users/") && method === "GET") {
    usersController.getUser(req, res);
  } else if (path.startsWith("/users/") && method === "PUT") {
    json(req, res, (req, res) => {
      usersController.updateUser(req, res);
    });
  } else if (path.startsWith("/users/") && method === "DELETE") {
    usersController.deleteUser(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found in users" }));
  }
}

module.exports = usersRoutes;
