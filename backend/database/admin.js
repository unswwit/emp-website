// Admin API endpoints

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const fs = require("fs");

const db = require("./db");
const { verifyToken } = require("./auth");
const { checkUserExists } = require("./helper");

// Admin approve hours
const approveHours = async (req, res) => {
  const { hourId, status } = req.body;
  const zid = verifyToken(req.headers["authorization"], res);
  if (zid instanceof Object) {
    return;
  }

  const userExists = checkUserExists(zid, res);
  if (!userExists) {
    return;
  }

  // Validate inputs
  if (!hourId || !status) {
    return res.status(400).json({ message: "Hour ID, and status are required" });
  }

  // Update hour request status in the database
  try {
    checkAdminPrivilege(zid, res);
    const query = `
      UPDATE hours
      SET status = $1
      WHERE id = $2
    `;
    const values = [status, hourId];

    const result = await db.query(query, values);

    if (result.rowCount === 1) {
      return res.status(200).json({ message: "Hour request updated successfully" });
    } else {
      return res.status(404).json({ message: "Hour request not found or unauthorized" });
    }
  } catch (error) {
    console.error("Error updating hour request:", error);
    return res.status(500).json({ message: "Failed to update hour request" });
  }
};

// Admin view hours
const adminViewHours = async (req, res) => {
  const zid = verifyToken(req.headers["authorization"], res);
  if (zid instanceof Object) {
    return;
  }

  const userExists = checkUserExists(zid, res);
  if (!userExists) {
    return;
  }

  try {
    checkAdminPrivilege(zid, res);
    // Fetch hours data for all zids
    const query = `
      SELECT id, zid, num_hours, description, timestamp, image_url, status
      FROM hours
    `;

    const { rows } = await db.query(query, []);
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error retrieving hours:", error);
    return res.status(500).json({ message: "Failed to retrieve hours data" });
  }
};

const invite = async (req, res) => {
  const filePath = req.file.path;
  const emails = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      emails.push(row.email);
    })
    .on("end", async () => {
      for (const email of emails) {
        const token = uuidv4();
        const date = new Date().toLocaleString();
        const query = `
          INSERT INTO invitation_tokens (token, used, created_at)
          VALUES ($1, $2, $3)
        `;

        const params = [token, false, date];
        await db.query(query, params);
        sendInvitationEmail(email, token);
      }
      fs.unlinkSync(filePath);
    });
  res.status(200).send("Invitations sent successfully");
};

// Function to send invitation email
const sendInvitationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // TODO: Change link when deployed
  const link = `http://localhost:3000/user/register?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "UNSW WIT Empowerment Program Invitation Link",
    text: `Hi there!, \n\nThis email is sent to you as a member of WIT Empowerment Program. Please click the following link to register to the Empower Program Website: \n${link}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const checkAdminPrivilege = async (zid, res) => {
  const query = `SELECT role FROM users WHERE zid = $1`;
  const result = await db.query(query, [zid]);
  const userRole = result.rows[0].role;

  if (userRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized: Only admins can approve/reject hours" });
  }
};

module.exports = {
  approveHours,
  adminViewHours,
  invite,
};
