const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));