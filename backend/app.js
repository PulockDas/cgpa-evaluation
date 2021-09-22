const express = require("express");
const bodyParser = require("body-parser");

const Course = require("./models/course");
const Student = require("./models/student");
const Student_Course = require("./models/student_course");

const mongoose = require('mongoose');
const student_course = require("./models/student_course");
const app = express();

mongoose.connect("mongodb+srv://max:ddEG5tU5ZsobiBLA@cluster0.70221.mongodb.net/cgpaDataBase?retryWrites=true&w=majority")
  .then( () => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length, X-Requested-With , yourHeaderFeild"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});


// all get end points

app.get("/api/courses", (req, res, next) => {
  const batch = req.query.batch;
  console.log(batch);
  // console.log(db.collections);
  Course.find({year: batch})
  .then(students => {
    if(students)
      res.status(200).json({message: "successful", answer: students});
    else
      res.status(404).json({message: "Students Not Found!"})
  });
});

app.get("/api/students", (req, res, next) => {
  const batch = req.query.batch;
  console.log(batch);
  // console.log(db.collections);
  Student.find({year: batch})
  .then(students => {
    if(students)
      res.status(200).json({message: "successful", answer: students});
    else
      res.status(404).json({message: "Students Not Found!"})
  });
});

app.get("/api/students/:id", (req, res, next) => {
  console.log(req.params.id);
  Student.findById(req.params.id).then(student => {
    if (student) {
      res.status(200).json(student);
      console.log(student);
    } else {
      res.status(404).json({ message: "Student not found!" });
    }
  });
});


app.get("/api/courses/:id", (req, res, next) => {

  console.log("req came");
  console.log(req.params.id);
  Student_Course.find({studentId: req.params.id})
    .populate('courseId')
    .then( courses => {
      if(courses){
        const answer = [];
        const cgpa = [];
        const id = [];
        courses.forEach(element => {
          answer.push(element.courseId);
          cgpa.push(element.cgpa);
          id.push(element._id);
        })
        res.status(200).json({'allcourses': answer, 'cgpa': cgpa, 'id': id});
        console.log(answer, cgpa);
      }
      else{
        res.status(404).json({message: "Not Found"});
      }
    } );
});

app.get("/api/students_year/:year", (req, res, next) => {
  Student.find({year: req.params.year}).select('registration')
  .then(data => {
    if(data){
      res.status(200).json({students: data});
    }
    else{
      res.status(404).json({message: "Not Found"});
    }
  });
});

app.get("/api/courses_year/:year", (req, res, next) => {
  Course.find({year: req.params.year}).select({'courseId': 1, 'courseTitle': 1})
  .then(data => {
    if(data){
      res.status(200).json({courses: data});
    }
    else{
      res.status(404).json({message: "Not Found"});
    }
  });
});


// all post end points

app.post( "/api/student_year", (req, res) => {

    // console.log(req.body.studentId);
    // console.log(req.body.cgpa);
    // console.log(req.body.courseId);

    student_course.findOne({studentId: req.body.studentId, courseId: req.body.courseId})
    .then( (result) => {
      
      if(result == null){
        const student_course = new Student_Course({
          studentId: req.body.studentId,
          courseId: req.body.courseId,
          cgpa: req.body.cgpa
        });
        student_course.save().then(createdRecord => {
          res.status(201).json({
            message: "Data added successfully"
            // data: {
            //   ...createdRecord,
            //   id: createdRecord._id
            // }
          });
        });
      }
      else{
        res.status(200).json({
          message: "unsuccessful"});
      }

    });
    
});

app.put("/api/student_course/:id", (req, res) => {
  student_course.updateOne({ _id: req.params.id }, {cgpa: req.body.gpa})
  .then(() => {
    res.status(201).json({message: "Updated successfully!"});
  })

  res.json({message: "gpa updated successfully!"});
})

app.delete("/api/student_course/:id", (req, res) => {
  student_course.deleteOne({ _id: req.params.id})
  .then( () => {
    res.status(200).json({message: "Successfully deleted!"});
  } );
})


module.exports = app;