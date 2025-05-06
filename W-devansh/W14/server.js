const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files (index.html)
app.use(express.static('public'));

// API to get user data
app.get('/api/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read file' });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
