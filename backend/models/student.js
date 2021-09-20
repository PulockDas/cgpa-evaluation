const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    registration: { type: String, required: true },
    name: { type: String, required: true },
    totalcredit: { type: String, required: true },
    cgpa: { type: String, required: true },
    year: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);
