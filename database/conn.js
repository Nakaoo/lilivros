const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Animeloud1@',
  database: 'livros_lidos',
})

module.exports = pool