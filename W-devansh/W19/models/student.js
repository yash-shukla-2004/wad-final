const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Roll_No: {
        type: Number,
        required: true
    },
    WAD_Marks: {
        type: Number,
        required: true
    },
    CC_Marks: {
        type: Number,
        required: true
    },
    DSBDA_Marks: {
        type: Number,
        required: true
    },
    CNS_Marks: {
        type: Number,
        required: true
    },
    AI_marks:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Student_Marks', studentSchema);