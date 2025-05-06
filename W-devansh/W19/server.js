const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./dbconfig/dbconfig');
const studentRoutes = require('./routes/student');
connectDB
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
