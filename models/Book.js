const pool = require("../database/conn");

module.exports = class Book {
  constructor(name, dateread, description, userid) {
    this.name = name;
    this.dateread = dateread;
    this.description = description;
    this.userid = userid;
  }

  save() {
    const sql = `INSERT INTO books (name, readDate, description, iduser) VALUES ('${this.name}', '${this.dateread}', '${this.description}', '${this.userid}')`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    });
  }

  getAllBooks() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM books WHERE iduser = ${this.userid}`,
        (error, data) => {
          if (error) {
            return reject(error);
          }
          return resolve(data);
        }
      );
    });
  }

  getBookById(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, name, DATE_FORMAT(readDate, "%Y%-%m-%d") as readDate, description, iduser FROM books WHERE id = ${id}`,
        (error, data) => {
          if (error) {
            return reject(error);
          }
          return resolve(data[0]);
        }
      );
    });
  }

  deleteBookById(id) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM books WHERE id = ${id}`, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  }

  updateBookById(id) {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE books SET name = "${this.name}", readDate = "${this.dateread}", description = "${this.description}" WHERE id = ${id}`, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  }
};
