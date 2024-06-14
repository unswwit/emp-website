const express = require("express");
const cors = require("cors");
const auth = require("./database/auth");
const mentee = require("./database/mentee");
const app = express();
const port = process.env.port || 4000;

app.use(express.json());
app.use(cors());

// db queries
app.post("/user/register", auth.registerUser);
app.post("/user/login", auth.loginUser);
app.post("/mentee/request-hours", mentee.requestHours);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
