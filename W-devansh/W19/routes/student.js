const express = require('express');
const router = express.Router();
const studentController = require('../controller/students');

router.post('/insert', studentController.insertStudents);
router.get('/all', studentController.getAllStudents);
router.get('/dsbda-above-20', studentController.getDSBDAAbove20);
router.put('/update/:name', studentController.updateMarks);
router.get('/above-25-all', studentController.getAbove25AllSubjects);
router.get('/less-than-40-math-science', studentController.getLessThan40MathScience);
router.delete('/delete/:name', studentController.deleteStudent);
router.get('/display', studentController.displayTable);

module.exports = router;
