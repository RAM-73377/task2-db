const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
  
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'S4kura#97@',
  database: 'user_accounts'
});

db.connect((err) => {
  if (err) {
    console.log("error db");
    return;
  }
  console.log("connected");
});

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ps1.html'));
});

app.get("/college-details", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'collegeDetails.html'));
});

app.get("/family-background", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'familyBackground.html'));
});

app.post('/create-account', (req, res) => {
  const { firstName, lastName, email, password, contactNumber, domain } = req.body;

  const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ? OR contactNumber = ?';
  db.query(checkQuery, [email, contactNumber], (err, results) => {
    if (err) {
      console.error('Error checking user existence:', err);
      res.status(500).json({ error: 'Error creating account' });
      return;
    }

    const { count } = results[0];
    if (count > 0) {
      res.status(400).json({ message: 'Email or contact number already exists' });
      return;
    }

    const insertQuery = 'INSERT INTO users (firstName, lastName, email, password, contactNumber, domain) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [firstName, lastName, email, password, contactNumber, domain], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ error: 'Error creating account' });
      } else {
        res.status(201).json({ message: 'Account created successfully' });
      }
    });
  });
});

app.post('/college-details', (req, res) => {
  const { userId, collegeName, degree, fieldOfStudy, startDate, endDate } = req.body;

  const insertQuery = 'INSERT INTO colleges (userId, collegeName, degree, fieldOfStudy, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(insertQuery, [userId, collegeName, degree, fieldOfStudy, startDate, endDate], (err, results) => {
    if (err) {
      console.error('Error inserting college details:', err);
      res.status(500).json({ error: 'Error adding college details' });
    } else {
      res.status(201).json({ message: 'College details added successfully' });
    }
  });
});

app.post('/family-background', (req, res) => {
  const { userId, fatherName, motherName, numberOfSiblings } = req.body;

  const insertQuery = 'INSERT INTO family_background (userId, fatherName, motherName, numberOfSiblings) VALUES (?, ?, ?, ?)';
  db.query(insertQuery, [userId, fatherName, motherName, numberOfSiblings], (err, results) => {
    if (err) {
      console.error('Error inserting family background:', err);
      res.status(500).json({ error: 'Error adding family background' });
    } else {
      res.status(201).json({ message: 'Family background added successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
