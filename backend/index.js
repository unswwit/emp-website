const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = process.env.port || 4000;

app.use(express.json());
app.use(cors());

// db queries
app.post("/user/register", db.registerUser);
app.post("/user/login", db.loginUser);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
