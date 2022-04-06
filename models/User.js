const pool = require("../database/conn");

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    const sql = `INSERT INTO users (name, email, password) VALUES ('${this.name}', '${this.email}', '${this.password}')`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  // password
  getUserId(email) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id FROM users WHERE email = '${email}'`,
        (error, users) => {
          if (error) {
            return reject(error);
          }
          return resolve(users[0]);
        }
      );
    });
  }

  // login
  getUserPassword(email) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT password FROM users WHERE email = '${email}'`,
        (error, users) => {
          if (error) {
            return reject(error);
          }
          return resolve(users[0].password);
        }
      );
    });
  }
}

module.exports = User;
