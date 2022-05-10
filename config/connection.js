const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_KEY,
  database: "Employee_Tracker",
});

module.exports = db;
