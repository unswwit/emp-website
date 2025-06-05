const express = require("express");
const cors = require("cors");
const multer = require("multer");

const auth = require("./database/auth");
const mentee = require("./database/mentee");
const admin = require("./database/admin");
const user = require("./database/user");

const app = express();
const port = process.env.PORT || 4000;
const url = `http://localhost:${port}`;
const upload = multer({ dest: "invitation_files/" });

app.use(express.json());
app.use(cors());

// db queries
// -------- User --------//
app.post("/user/register", auth.registerUser);
app.post("/user/login", auth.loginUser);
app.get("/user/profile", user.userInfo);
app.post("/user/forgot-password", auth.forgotPassword);
app.post("/user/reset-password", auth.resetPassword);

// -------- Mentee --------//
app.post("/mentee/request-hours", mentee.requestHours);
app.get("/mentee/view-hours", mentee.menteeViewHours);

// -------- Admin --------//
app.patch("/admin/approve-hours", admin.approveHours);
app.get("/admin/view-hours", admin.adminViewHours);
app.post("/admin/invite", upload.single("file"), admin.invite);

app.listen(port, "0.0.0.0", () => {
  console.log(`The server is running at ${url}`);
});
