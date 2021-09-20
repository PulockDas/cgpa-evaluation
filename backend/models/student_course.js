const mongoose = require("mongoose");

const student_courseSchema = mongoose.Schema({
    studentId: {type: String, ref:"Student", required: true},
    courseId: {type: String, ref:"Course", required: true},
    cgpa: { type: String, required: true },
});

module.exports = mongoose.model("Student_Course", student_courseSchema);

// "studentId": "614758bc82f77515474189bd",
// "courseId": "614646381beb0ab1fefd03f3",
// "cgpa": "3.75"