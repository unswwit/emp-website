// User (both Mentee and Admin) API Endpoints

require("dotenv").config();

const db = require("./db");
const { verifyToken } = require("./auth");
const { checkUserExists } = require("./helper");

// Get user info
const userInfo = async (req, res) => {
  const zid = verifyToken(req.headers["authorization"], res);

  if (zid instanceof Object) {
    return zid;
  }

  const userExists = checkUserExists(zid, res);
  if (!userExists) {
    return;
  }

  try {
    const query = `
      SELECT email, zid, firstname, lastname, role, year, mentor 
      FROM users 
      WHERE zid = $1
    `;
    const values = [zid];

    const result = await db.query(query, values);
    const user = result.rows[0];

    res.status(200).json({
      email: user.email,
      zid: user.zid,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      year: user.year,
      mentor: user.mentor,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.email;

  // Check if email is valid
  const data = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
  const arr = data.rows;
  if (arr.length === 0) {
    return res.status(400).json({ message: `Email doesn't exist. Please register first.` });
  }

  // NOTE: re-using database because of tight deadlines
  const token = base64.encode(uuidv4() + email);
  const date = new Date().toLocaleString();
  const query = `
    INSERT INTO invitation_tokens (token, used, created_at)
    VALUES ($1, $2, $3)
  `;

  const params = [token, false, date];
  await db.query(query, params);
  sendForgotPasswordEmail(email, token);
  res.status(200).send("Reset password email sent successfully");
};

// Function to send forgot password email
const sendForgotPasswordEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // TODO: Change link when deployed
  const link = `https://empowerment.unswwit.com/user/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "UNSW WIT Empowerment Program Reset Password",
    text: `Hi there!,\n\nWe received a request to reset the password for ${email}.\n\nClick this link to enter a new password: ${link}.\n\nIf you did NOT expect to receive this message, please notify the admins immediately!.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  userInfo,
  forgotPassword,
};
