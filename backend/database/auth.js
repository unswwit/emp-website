// Authentication API endpoints

require("dotenv").config();
const nodemailer = require("nodemailer");
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

    // if zid/email does not exist
    if (!results || !results.rows || results.rows.length === 0) {
      // console.log(`${userId} login fail`); // FOR DEBUGGING
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if email is valid
    const data = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    const arr = data.rows;
    if (arr.length === 0) {
      return res.status(400).json({ message: "No account found with that email." });
    }

    const zid = await db.query(`SELECT zid FROM users WHERE email = $1;`, [email]);

    const token = uuidv4();

    const date = new Date().toLocaleString();

    const query = `
      INSERT INTO invitation_tokens (token, used, created_at)
      VALUES ($1, $2, $3)
    `;

    const params = [token, false, date];
    await db.query(query, params);

    // Send reset email
    sendForgotPasswordEmail(email, token);

    return res.status(200).json({ message: "Reset email sent!" });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// SEND EMAIL FUNCTION
const sendForgotPasswordEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const link = `https://empowerment.unswwit.com/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "UNSW WIT Empowerment Program Reset Password",
    text: `Hi there!\n\nWe received a request to reset the password for ${email}.\n\nClick this link to enter a new password:\n${link}\n\nIf you did NOT expect this, please contact the admins immediately.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending reset email:", error);
    } else {
      console.log("Reset email sent:", info.response);
    }
  });
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    console.log("RESET FAIL: Missing fields", { email, password, token });
    return res.status(400).send({ message: "Invalid request." });
  }

  try {
    console.log("Reset Password Request:", { email, token });

    const tokenResult = await db.query(
      "SELECT * FROM invitation_tokens WHERE token = $1 AND used = $2",
      [token, false]
    );
    const check = await db.query(`SELECT * FROM invitation_tokens`);

    console.log("Token DB query result:", tokenResult.rows);

    if (tokenResult.rows.length === 0) {
      return res.status(400).send({ message: "Invalid/expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const params = [email, hashedPassword];
    const q = "UPDATE users SET password = $2 WHERE email = $1";
    await db.query(q, params);

    await db.query("UPDATE invitation_tokens SET used = $1 WHERE token = $2", [true, token]);

    console.log(`Password reset successful for ${email}`);
    return res.status(200).json({ message: "Password reset successfully! Please proceed to login." });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
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
  forgotPassword,
  resetPassword,
};
