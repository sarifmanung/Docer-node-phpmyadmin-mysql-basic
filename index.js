const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 8000;

let conn;

const initMySQL = async () => {
  try {
    conn = await mysql.createConnection({
      host: "db", // Connects to the MySQL container
      user: "root",
      password: "password",
      database: "tutorial",
    });
    console.log("Connected to MySQL database successfully.");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
};

app.get("/hello-world", (req, res) => {
  res.send("hello world");
});

app.get("/users", async (req, res) => {
  try {
    const [results] = await conn.query("SELECT * FROM users");
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users.\n", error);
  }
});

app.listen(port, async () => {
  await initMySQL();
  console.log(`Server running at http://localhost:${port}/`);
});
