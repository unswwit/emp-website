const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 4000;

app.use(express.json());
app.use(cors());

// User registration
app.post('/user/register', (req, res) => {
  const {email, zid, fname, lname, password} = req.body;
  res.json({requestData:{email, zid}});
  // console.log(req.body); // FOR DEBUGGING
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`)
});