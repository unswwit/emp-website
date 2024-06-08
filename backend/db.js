require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Pool = require("pg").Pool;
const db = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
});

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

  const params = [email, zid, firstName, lastName, hashedPassword]
  const q = "INSERT INTO users (zid, firstname, lastname, email, password) VALUES ($2, $3, $4, $1, $5)";
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

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });

    // console.log(`${userId} login success`); // FOR DEBUGGING
    return res.status(200).json({ message: "Login successful", token: token });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
