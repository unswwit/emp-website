// Admin API endpoints

require("dotenv").config();
const jwt = require("jsonwebtoken");

const db = require("./db");
const { verifyToken } = require("./auth");
const { checkUserExists } = require("./helper");

// Admin approve hours
const approveHours = async (req, res) => {
  const { hourId, status } = req.body;
  const zid = verifyToken(req.headers["authorization"], res);
  checkUserExists(zid, res);

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
  checkUserExists(zid, res);

  try {
    checkAdminPrivilege(zid, res);
    // Fetch hours data for all zids
    const query = `
      SELECT id, zid, num_hours, description, timestamp, image_url, status
      FROM hours
    `;

    const { rows } = await db.query(query, []);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error retrieving hours:", error);
    res.status(500).json({ message: "Failed to retrieve hours data" });
  }
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
};
