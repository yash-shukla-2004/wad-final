const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB (replace <DB_URL> with your MongoDB URI)
mongoose.connect('mongodb+srv://pirateking1803:Randi@cluster0.m7aloax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Define the schema and model for employee
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  joining_date: { type: Date, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes

// 1. Add a new employee
app.post('/add-employee', (req, res) => {
  const { name, department, designation, salary, joining_date } = req.body;

  const newEmployee = new Employee({
    name,
    department,
    designation,
    salary,
    joining_date: new Date(joining_date),
  });

  newEmployee.save();
});

// 2. View all employee records
app.get('/employees', (req, res) => {
  const emp = Employee.find();
  res.send(emp);
});

// 3. Update an existing employee’s details
app.put('/update-employee/:id', (req, res) => {
  const { id } = req.params;
  const { name, department, designation, salary, joining_date } = req.body;

  Employee.findByIdAndUpdate(
    id,
    { name, department, designation, salary, joining_date: new Date(joining_date) },
    { new: true },
    (err, updatedEmployee) => {
      if (err) return res.status(500).send('Error updating employee');
      if (!updatedEmployee) return res.status(404).send('Employee not found');
      res.send(`Employee updated: ${updatedEmployee.name}`);
    }
  );
});

// 4. Delete an employee record
app.delete('/delete-employee/:id', (req, res) => {
  const { id } = req.params;

  Employee.findByIdAndDelete(id, (err, deletedEmployee) => {
    if (err) return res.status(500).send('Error deleting employee');
    if (!deletedEmployee) return res.status(404).send('Employee not found');
    res.send(`Employee deleted: ${deletedEmployee.name}`);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
