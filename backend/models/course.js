const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    credit: { type: String, required: true },
    teacherId: { type: String, ref:"Teacher", required: true },
    year: { type: String, required: true }
});

module.exports = mongoose.model("Course", courseSchema);
