const express = require('express');
const cors = require('cors');
const app = express();
const dbconfig = require('./dbconfig/dbconfig.js');
dbconfig;


const bookRoutes = require('./routes/books.js');

app.use(cors());
app.use(express.json());
app.use('/api', bookRoutes);    
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});