const http = require("http");
const router = require("./routes/index");

const server = http.createServer(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
