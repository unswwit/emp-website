const express = require("express");
const cors = require("cors");
const auth = require("./database/auth");
const mentee = require("./database/mentee");
const admin = require("./database/admin");
const user = require("./database/user");

const app = express();
const port = process.env.port || 4000;

app.use(express.json());
app.use(cors());

// db queries
// -------- User --------//
app.post("/user/register", auth.registerUser);
app.post("/user/login", auth.loginUser);
app.get("/user/profile", user.userInfo);

// -------- Mentee --------//
app.post("/mentee/request-hours", mentee.requestHours);
app.get("/mentee/view-hours", mentee.menteeViewHours);

// -------- Admin --------//
app.patch("/admin/approve-hours", admin.approveHours);
app.get("/admin/view-hours", admin.adminViewHours);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
