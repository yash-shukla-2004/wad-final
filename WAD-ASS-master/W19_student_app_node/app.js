const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB (replace <DB_URL> with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Define the schema and model for students
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number,
});

const Student = mongoose.model('Student', studentSchema);

// Insert sample data if collection is empty
const sampleStudents = [
    {
        Name: 'ABC',
        Roll_No: 111,
        WAD_Marks: 25,
        CC_Marks: 25,
        DSBDA_Marks: 25,
        CNS_Marks: 25,
        AI_marks: 25,
    },
    {
        Name: 'DEF',
        Roll_No: 112,
        WAD_Marks: 15,
        CC_Marks: 20,
        DSBDA_Marks: 15,
        CNS_Marks: 30,
        AI_marks: 20,
    },
    // Add more students here...
];

// Insert documents into the collection if it's empty
async function insertSampleData() {
    try {
        const count = await Student.countDocuments({});
        if (count === 0) {
            await Student.insertMany(sampleStudents);
            console.log('Sample students inserted');
        }
    } catch (err) {
        console.log('Error inserting data: ', err);
    }
}

insertSampleData();

// Routes
app.get('/', async (req, res) => {
    try {
        const students = await Student.find({});
        res.render('index', { students });
    } catch (err) {
        return res.status(500).send('Error fetching data');
    }
});

// 1. Total document count
app.get('/count', async (req, res) => {
    try {
        const count = await Student.countDocuments({});
        res.send(`Total student count: ${count}`);
    } catch (err) {
        return res.status(500).send('Error counting documents');
    }
});

// 2. List students with DSBDA marks > 20
app.get('/dsbda-greater-than-20', async (req, res) => {
    try {
        const students = await Student.find({ DSBDA_Marks: { $gt: 20 } }, 'Name');
        res.send(students);
    } catch (err) {
        return res.status(500).send('Error fetching data');
    }
});

// 3. Update marks of specified students by 10
app.put('/update-marks', async (req, res) => {
    try {
        const { rollNo } = req.body;
        await Student.updateMany(
            { Roll_No: rollNo },
            { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_marks: 10 } }
        );
        res.send('Marks updated by 10');
    } catch (err) {
        return res.status(500).send('Error updating marks');
    }
});

// 4. List names with marks > 25 in all subjects
app.get('/marks-greater-than-25', async (req, res) => {
    try {
        const students = await Student.find(
            { WAD_Marks: { $gt: 25 }, CC_Marks: { $gt: 25 }, DSBDA_Marks: { $gt: 25 }, CNS_Marks: { $gt: 25 }, AI_marks: { $gt: 25 } },
            'Name'
        );
        res.send(students);
    } catch (err) {
        return res.status(500).send('Error fetching data');
    }
});

// 5. List names who got less than 40 in both Maths (WAD and DSBDA) and Science (CNS and AI)
app.get('/less-than-40', async (req, res) => {
    try {
        const students = await Student.find(
            {
                $and: [
                    { WAD_Marks: { $lt: 40 } },
                    { DSBDA_Marks: { $lt: 40 } },
                    { CNS_Marks: { $lt: 40 } },
                    { AI_marks: { $lt: 40 } },
                ],
            },
            'Name'
        );
        res.send(students);
    } catch (err) {
        return res.status(500).send('Error fetching data');
    }
});

// 6. Remove a specified student document
app.delete('/remove-student', async (req, res) => {
    try {
        const { rollNo } = req.body;
        await Student.deleteOne({ Roll_No: rollNo });
        res.send('Student removed');
    } catch (err) {
        return res.status(500).send('Error deleting student');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
