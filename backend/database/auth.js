require("dotenv").config();
const db = require('./db');
const { Roles } = require('../enums.js');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
const registerUser = async (req, res) => {
  const { email, zid, firstName, lastName, password } = req.body;

  // Check if zid has already been registered
  const data = await db.query(`SELECT * FROM users WHERE email= $1;`, [email]);
  const arr = data.rows;
  if (arr.length != 0) {
    return res.status(400).json({ message: `Account already registered with zid ${zid}` });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const defaultRole = Roles.ADMIN;
  const currentYear = new Date().getFullYear();
  const mentor = null;
  const params = [email, zid, firstName, lastName, hashedPassword, defaultRole, currentYear, mentor]
  const q = "INSERT INTO users (zid, firstname, lastname, email, password, role, year, mentor) VALUES ($2, $3, $4, $1, $5, $6, $7, $8)";
  db.query(q, params, (err, results) => {
    if (err) {
      console.error(err.stack);
    }

    return res.status(200).json({ message: "Register successful" });
  });
};
  
// User login
const loginUser = async (req, res) => {
  const { userId, password } = req.body;
  const params = [userId];
  const q = "SELECT * FROM users WHERE zid=$1 OR email=$1";

  db.query(q, params, async (err, results) => {
    if (err) {
      console.error(err.stack);
    }

    // if zid/email does not exist
    if (results.rows.length === 0) {
      // console.log(`${userId} login fail`); // FOR DEBUGGING
      return res.status(401).json({ message: `Email/zID is not registered.` });
    }

    const user = results.rows[0];

    // Password does not match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    var token = jwt.sign({ userId: user.zid }, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });
    console.log(token);

    // console.log(`${userId} login success`); // FOR DEBUGGING
    return res.status(200).json({ message: "Login successful", token: token, role: user.role});
  });
};

// Verify and decode token
const 
verifyToken = (token_header, res) => {
  if (!token_header) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = token_header.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
  return decoded.userId;
}
  
module.exports = {
  registerUser,
  loginUser,
  verifyToken
};
