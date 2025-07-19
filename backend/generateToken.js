const jwt = require("jsonwebtoken");

const token = jwt.sign({ zid: "z1234567", role: "admin" }, "witemp", {
  expiresIn: "2h",
});

console.log("Your fake admin token:", token);


