// Authentication API endpoints

require("dotenv").config();
const db = require("./db");
const { Roles } = require("../enums.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// User registration
const registerUser = async (req, res) => {
  const { email, zid, firstName, lastName, password } = req.body;
  const token = req.query.token;

  if (token === "undefined") {
    return res
      .status(400)
      .send({
        message:
          "You do not have permission to register. Please contact the WIT sponsorship team.",
      });
  }

  // Check valid invitation token
  const tokenResult = await db.query(
    `SELECT * FROM invitation_tokens WHERE token = $1 AND used = $2`,
    [token, false]
  );

  // console.log(tokenResult);
  if (tokenResult.rows.length === 0) {
    return res.status(400).send({ message: "Invalid/expired token" });
  }

  // Check if zid has already been registered
  const data = await db.query(`SELECT * FROM users WHERE zid= $1;`, [zid]);
  const arr = data.rows;
  if (arr.length != 0) {
    return res
      .status(400)
      .json({ message: `Account already registered with zid ${zid}` });
  }

  // Insert user into users table
  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultRole = Roles.MENTEE;
  const currentYear = new Date().getFullYear();
  const mentor = null;
  const params = [
    email,
    zid,
    firstName,
    lastName,
    hashedPassword,
    defaultRole,
    currentYear,
    mentor,
  ];
  const q =
    "INSERT INTO users (zid, firstname, lastname, email, password, role, year, mentor) VALUES ($2, $3, $4, $1, $5, $6, $7, $8)";
  await db.query(q, params);

  // Mark the token as used
  await db.query("UPDATE invitation_tokens SET used = $1 WHERE token = $2", [
    true,
    token,
  ]);

  return res.status(200).json({ message: "Register successful" });
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

    if (!results || !results.rows || results.rows.length === 0) {
      console.log(`${userId} login fail`); // Optional debug log
      return res.status(401).json({ message: `Email/zID is not registered.` });
    }
    // // if zid/email does not exist
    // if (results.rows.length === 0) {
    //   // console.log(`${userId} login fail`); // FOR DEBUGGING
    //   return res.status(401).json({ message: `Email/zID is not registered.` });
    // }

    const user = results.rows[0];

    // Password does not match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    var token = jwt.sign({ userId: user.zid }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // console.log(`${userId} login success`); // FOR DEBUGGING
    return res
      .status(200)
      .json({ message: "Login successful", token: token, role: user.role });
  });
};

// Verify and decode token
const verifyToken = (token_header, res) => {
  if (!token_header) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = token_header.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.userId;
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};
