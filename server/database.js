const mysql = require('mysql2/promise'); // Use the promise version

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "pizza",
  password: "achref2050",
});

db.getConnection() // Optional: Test if connection is working
  .then(() => console.log("MySQL connection is active!"))
  .catch(err => console.error("MySQL connection failed:", err));

module.exports = db;