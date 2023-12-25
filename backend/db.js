require("dotenv").config();
const Pool = require("pg").Pool;
const db = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
});

// User registration
const registerUser = (req, res) => {
  const { email, zid, firstName, lastName, password } = req.body;
  const params = [email, zid, firstName, lastName, password]
  const q = "INSERT INTO users (zid, firstname, lastname, email, password) VALUES ($2, $3, $4, $1, $5)";

  db.query(q, params, (err, results) => {
    if (err) {
      console.error(err.stack);
    }

    return res.status(200).json({ message: "Register successful" });
  });
};

// User login
const loginUser = (req, res) => {
  const { userId, password } = req.body;
  const params = [userId];
  const q = "SELECT * FROM users WHERE zid=$1 OR email=$1";

  db.query(q, params, (err, results) => {
    if (err) {
      console.error(err.stack);
    }

    // if zid/email does not exist, or password does not match
    if (results.rows.length === 0 || results.rows[0].password !== password) {
      // console.log(`${userId} login fail`); // FOR DEBUGGING
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // console.log(`${userId} login success`); // FOR DEBUGGING
    return res.status(200).json({ message: "Login successful" });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
