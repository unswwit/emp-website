const db = require('./db');

// Helper to check if user with zid exists
const checkUserExists = async (zid, res) => {
  const checkZidQuery = "SELECT zid FROM users WHERE zid=$1";
  const zidResult = await db.query(checkZidQuery, [zid]);

  if (zidResult.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
}

module.exports = {
  checkUserExists
};