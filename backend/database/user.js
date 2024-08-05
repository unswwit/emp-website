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

module.exports = {
  userInfo,
};
