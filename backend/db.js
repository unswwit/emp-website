const Pool = require("pg").Pool;
const db = new Pool({
  user: "dummy",
  password: "dummy",
  database: "emp",
  host: "localhost",
  port: 5432,
});

// User registration
const registerUser = (req, res) => {
  const { email, zid, fname, lname, password } = req.body;
  res.json({ requestData: { email, zid } });
  // console.log(req.body); // FOR DEBUGGING
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
