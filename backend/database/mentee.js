// Mentee API endpoints

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const db = require("./db");
const { verifyToken } = require("./auth");
const { checkUserExists } = require("./helper");
const { Status } = require("../enums.js");

// Mentee requests hours
const requestHours = async (req, res) => {
  const { numHours, description, timestamp, imageUrl } = req.body;

  const zid = verifyToken(req.headers["authorization"], res);
  if (zid instanceof Object) {
    return;
  }

  const userExists = checkUserExists(zid, res);
  if (!userExists) {
    return;
  }

  try {
    // Insert hours request into the database
    const insertQuery = `
      INSERT INTO hours (id, zid, num_hours, description, timestamp, image_url, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const id = uuidv4();
    const values = [
      id,
      zid,
      numHours,
      description,
      timestamp,
      imageUrl,
      Status.PENDING,
    ];

    await db.query(insertQuery, values);

    res.status(201).json({ message: "Hours requested successfully" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mentee view hours
const menteeViewHours = async (req, res) => {
  const zid = verifyToken(req.headers["authorization"], res);
  if (zid instanceof Object) {
    return;
  }

  const userExists = checkUserExists(zid, res);
  if (!userExists) {
    return;
  }

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
    console.error("Error retrieving hours:", error);
    res.status(500).json({ message: "Failed to retrieve hours data" });
  }
};

// Edit hours if log is pending
const editHours = async (req, res) => {
  const { logId, numHours, description, imageUrl } = req.body;

  if (!logId || !numHours || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const zid = verifyToken(req.headers["authorization"], res);
  if (zid instanceof Object) {
    return;
  }

  const userExists = checkUserExists(zid, res);
  if (!userExists) {
    return;
  }

  try {
    // Fetch log using logId
    const query = `SELECT * FROM hours WHERE id = $1 AND zid = $2`;
    const { rows } = await db.query(query, [logId, zid]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Log not found" });
    }
    const log = rows[0];

    // Check if status is pending
    if (log.status !== Status.PENDING) {
      return res
        .status(403)
        .json({ message: "Log cannot be edited unless status is 'Requested'" });
    }

    // Use new imageUrl if provided, else keep existing
    const updatedImageUrl = imageUrl || log.image_url;
    const updatedTimestamp = new Date().toISOString();

    // Update log
    const updateQuery = `
      UPDATE hours
      SET num_hours = $1, description = $2, image_url = $3, timestamp = $4
      WHERE id = $5 AND zid = $6
    `;
    const updateValues = [
      numHours,
      description,
      updatedImageUrl,
      updatedTimestamp,
      logId,
      zid,
    ];

    await db.query(updateQuery, updateValues);

    res.status(200).json({ message: "Log updated successfully" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// function for storing and retrieving mentee hours from the database
// unique identifier for each mentee, full name
// total required hours, sum of logged hours, timestamp of last log update

const menteeLogSummary = async (req, res) => {
  const zid = verifyToken(req.headers["authorization"], res);
  if (zid instanceof Object) return;

  try {
    const query = `
      SELECT
      u.zid,
      u.firstname,
      u.lastname,
      COALESCE(SUM(h.num_hours), 0) AS total_logged_hours,
      MAX(h.timestamp) AS last_log_timestamp
    FROM users u
    LEFT JOIN hours h ON u.zid = h.zid AND h.status = 'approved'
    WHERE u.zid = $1
    GROUP BY u.zid, u.firstname, u.lastname
    `;

    const { rows } = await db.query(query, [zid]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Mentee not found" });
    }

    const result = {
      ...rows[0],
      total_required_hours: 20,
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("Error retrieving mentee log summary:", err);
    res.status(500).json({ message: "Failed to retrieve mentee log summary" });
  }
};

module.exports = {
  requestHours,
  menteeViewHours,
  editHours,
  menteeLogSummary,
};
