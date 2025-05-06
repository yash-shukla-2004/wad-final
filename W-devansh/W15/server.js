const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors')

app.use(cors())
// Serve static files from "public"
app.use(express.static('public'));

// Serve product data from JSON
app.get('/api/products', (req, res) => {
  const filePath = path.join(__dirname, 'product.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read product data' });
    const products = JSON.parse(data);
    res.json(products);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
