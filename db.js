const mysql = require('mysql2');
require('dotenv').config();

console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 
});

module.exports = connection;
