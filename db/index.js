const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("node-learning.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
)`);

module.exports = {
  all: (query, params) =>
    new Promise((resolve, reject) => {
      db.all(query, params, (error, rows) => {
        if (error) reject(error);
        resolve(rows);
      });
    }).catch((err) => {
      console.error(err);
      return null;
    }),
  get: (query, params) =>
    new Promise((resolve, reject) => {
      db.get(query, params, (error, row) => {
        if (error) reject(error);
        resolve(row);
      });
    }).catch((err) => {
      console.error(err);
      return null;
    }),
  run: (query, params) =>
    new Promise((resolve, reject) => {
      db.run(query, params, (error) => {
        if (error) reject(error);
        resolve();
      });
    }).catch((err) => {
      console.error(err);
      return null;
    }),
};
