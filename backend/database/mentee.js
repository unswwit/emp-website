require("dotenv").config();
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const db = require('./db');

const Status = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// Mentee requests hours
const requestHours = async (req, res) => {
  const { numHours, description, timestamp, imageUrl } = req.body;
  console.log(req.body);
  const token = req.headers['authorization'].split(' ')[1];;

  // Verify and decode the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
  const zid = decoded.userId;

  // Check if zid exists
  const checkZidQuery = "SELECT zid FROM users WHERE zid=$1";
  try {
    const zidResult = await db.query(checkZidQuery, [zid]);

    if (zidResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Insert hours request into the database
    const insertQuery = `
      INSERT INTO hours (id, zid, num_hours, description, timestamp, image_url, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const id = shortid.generate();
    console.log(numHours);
    const values = [id, zid, numHours, description, timestamp, imageUrl, Status.PENDING];

    await db.query(insertQuery, values);

    res.status(201).json({ message: "Hours requested successfully" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Mentee view hours
const viewHours = async (req, res) => {
  
}

module.exports = {
    requestHours,
    viewHours
};