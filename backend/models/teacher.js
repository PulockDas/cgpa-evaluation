const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
    "teacher id": { type: String, required: true },
    "teacher name": { type: String, required: true },
    "dept": { type: String, required: true }
});

module.exports = mongoose.model("Teacher", teacherSchema);
