require("dotenv").config();
const jwt = require('jsonwebtoken');

const db = require('./db');
const { verifyToken } = require('./auth');
const { checkUserExists } = require('./helper');

// Admin approve hours
const approveHours = async (req, res) => {
    
}