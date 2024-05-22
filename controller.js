const url = require("url");
const db = require("./db/index");

class UsersController {
  constructor(db) {
    this.db = db;
  }

  async getUsers(req, res) {
    const result = await this.db.all(`SELECT * FROM users`);

    res.end(JSON.stringify(result));
  }

  async getUser(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const userId = pathname.split("/").pop();
    const result = await this.db.get(
      `SELECT * FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );

    res.end(JSON.stringify(result));
  }

  async createUser(req, res) {
    const user = req.body;
    const result = await this.db.run(
      `INSERT INTO users (name, age) VALUES (?, ?)`,
      [user.name, user.age]
    );

    res.end(JSON.stringify(result));
  }

  async updateUser(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const userId = pathname.split("/").pop();
    const user = req.body;
    const result = await this.db.run(
      `UPDATE users SET name = ?, age = ? WHERE id = ?`,
      [user.name, user.age, userId]
    );

    res.end(JSON.stringify(result));
  }

  async deleteUser(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const userId = pathname.split("/").pop();
    const result = await this.db.run(`DELETE FROM users WHERE id = ?`, [
      userId,
    ]);

    res.end(JSON.stringify(result));
  }
}

module.exports = new UsersController(db);
