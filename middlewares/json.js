function json(req, res, cb) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    req.body = JSON.parse(body);
    cb(req, res);
  });
}

module.exports = json;
