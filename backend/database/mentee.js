require("dotenv").config();
const { v4: uuidv4 } = require('uuid');

const db = require('./db');
const { verifyToken } = require('./auth');
const { checkUserExists } = require('./helper');

const Status = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// Mentee requests hours
const requestHours = async (req, res) => {
  const { numHours, description, timestamp, imageUrl } = req.body;
  const zid = verifyToken(req.headers['authorization']);

  checkUserExists(zid);
  try {
    // Insert hours request into the database
    const insertQuery = `
      INSERT INTO hours (id, zid, num_hours, description, timestamp, image_url, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const id = uuidv4();
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
  const zid = verifyToken(req.headers['authorization']);
  checkUserExists(zid);

  try {
    // Fetch hours data for a specific zid
    const query = `
      SELECT id, num_hours, description, timestamp, image_url, status
      FROM hours
      WHERE zid = $1
    `;

    const params = [zid];
    const { rows } = await db.query(query, params);
    res.status(200).json(rows);

  } catch (error) {
    console.error('Error retrieving hours:', error);
    res.status(500).json({ message: "Failed to retrieve hours data" });
  }
}

module.exports = {
    requestHours,
    viewHours
};