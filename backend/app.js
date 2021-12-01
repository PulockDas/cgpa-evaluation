const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/check-auth");

const Course = require("./models/course");
const Student = require("./models/student");
const Student_Course = require("./models/student_course");
const Teacher = require("./models/teacher");
const User = require("./models/user");

const mongoose = require('mongoose');
const student_course = require("./models/student_course");
const app = express();

mongoose.connect("mongodb+srv://max:ddEG5tU5ZsobiBLA@cluster0.70221.mongodb.net/cgpaDataBase?retryWrites=true&w=majority")
  .then(() => {
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
  Course.find({ year: batch })
    .then(students => {
      if (students)
        res.status(200).json({ message: "successful", answer: students });
      else
        res.status(404).json({ message: "Students Not Found!" })
    });
});

app.get("/api/students", (req, res, next) => {
  const batch = req.query.batch;
  console.log(batch);
  // console.log(db.collections);
  Student.find({ year: batch })
    .then(students => {
      if (students)
        res.status(200).json({ message: "successful", answer: students });
      else
        res.status(404).json({ message: "Students Not Found!" })
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
  Student_Course.find({ studentId: req.params.id })
    .populate('courseId')
    .then(courses => {
      if (courses) {
        const answer = [];
        const cgpa = [];
        const id = [];
        courses.forEach(element => {
          answer.push(element.courseId);
          cgpa.push(element.cgpa);
          id.push(element._id);
        })
        res.status(200).json({ 'allcourses': answer, 'cgpa': cgpa, 'id': id });
        console.log(answer, cgpa);
      }
      else {
        res.status(404).json({ message: "Not Found" });
      }
    });
});

app.get("/api/students_year/:year", (req, res, next) => {
  Student.find({ year: req.params.year }).select('registration')
    .then(data => {
      if (data) {
        res.status(200).json({ students: data });
      }
      else {
        res.status(404).json({ message: "Not Found" });
      }
    });
});

app.get("/api/courses_year/:year", (req, res, next) => {
  Course.find({ year: req.params.year }).select({ 'courseId': 1, 'courseTitle': 1 })
    .then(data => {
      if (data) {
        res.status(200).json({ courses: data });
      }
      else {
        res.status(404).json({ message: "Not Found" });
      }
    });
});


// all post end points

app.post("/api/student_year", checkAuth, (req, res) => {

  // console.log(req.body.studentId);
  // console.log(req.body.cgpa);
  // console.log(req.body.courseId);

  student_course.findOne({ studentId: req.body.studentId, courseId: req.body.courseId })
    .then((result) => {

      if (result == null) {
        const student_course = new Student_Course({
          studentId: req.body.studentId,
          courseId: req.body.courseId,
          cgpa: req.body.cgpa
        });
        student_course.save().then(createdRecord => {

          // new code
          Student.findById(req.body.studentId).then(student => {
            if (student) {

              let cgpa = parseFloat(student.cgpa);
              let totalcredit = parseFloat(student.totalcredit);

              Course.findById(req.body.courseId).then(course => {
                if(course){
                  let credit = parseFloat(course.credit);
                  let updatedCGPA = (totalcredit*cgpa + credit*parseFloat(req.body.cgpa))/(totalcredit+credit);
                  
                  updatedCGPA = updatedCGPA.toString();
                  totalcredit += credit;
                  totalcredit = totalcredit.toString();

                  Student.updateOne({ _id:req.body.studentId }, { cgpa: updatedCGPA, totalcredit: totalcredit }).then(() => {
                    console.log("Congrats!");
                    res.status(201).json({ message: "Data Added and Updated successfully!" });
                  });
                }
                else{
                  res.status(404).json({ message: "Student found but Course not found! Course_STudent added." });
                }
              })

              // res.status(200).json(student);
              // console.log(student);
            } else {
              res.status(404).json({ message: "Student not found! Course_Student added." });
            }
          });



          // res.status(201).json({
          //   message: "Data added successfully"
          //   // data: {
          //   //   ...createdRecord,
          //   //   id: createdRecord._id
          //   // }
          // });
        });
      }
      else {
        res.status(200).json({
          message: "unsuccessful"
        });
      }

    });

});

app.put("/api/student_course/:id", checkAuth, (req, res) => {

  console.log("asche");
  student_course.findOneAndUpdate({ _id: req.params.id }, { cgpa: req.body.gpa })
    .then((data) => {

      console.log("The data "+data);
      // new code
          Student.findById(data.studentId).then(student => {
            if (student) {

              let cgpa = parseFloat(student.cgpa);
              let totalcredit = parseFloat(student.totalcredit);

              Course.findById(data.courseId).then(course => {
                if(course){
                  let credit = parseFloat(course.credit);
                  let updatedCGPA = (totalcredit*cgpa + credit*parseFloat(data.cgpa))/(totalcredit+credit);
                  
                  updatedCGPA = updatedCGPA.toString();
                  totalcredit += credit;
                  totalcredit = totalcredit.toString();

                  Student.updateOne({ _id:data.studentId }, { cgpa: updatedCGPA, totalcredit: totalcredit }).then(() => {
                    console.log("Congrats!");
                    res.status(201).json({ message: "Data updated and Other entities Updated successfully!" });
                  });
                }
                else{
                  res.status(404).json({ message: "Student found but Course not found! Data updated." });
                }
              })

              // res.status(200).json(student);
              // console.log(student);
            } else {
              res.status(404).json({ message: "Student not found! Data updated." });
            }
          });


      // res.status(201).json({ message: "Updated successfully!" });
    })

  // res.json({ message: "gpa updated successfully!" });
})

app.delete("/api/student_course/:id", checkAuth, (req, res) => {
  student_course.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Successfully deleted!" });
    });
})

app.get("/api/teacher/:id", (req, res) => {
  Course.find({"teacherId": req.params.id})
    .populate('teacherId').select({"_id": 0})
    .then(data => {
      if(data){
        const courses = [];

        data.forEach(element => {
          courses.push(element.courseTitle);
        });

        const teacher = data[0].teacherId;

        res.status(200).json({teacher: teacher, courses: courses});
      }
      else{
        res.status(404).json({teacher: "Not Found", courses: "Not Found"});
      }
    });
});

app.post("/api/user/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

    user.save()
      .then(result => {
        res.status(201).json({
          message: "User Created",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      })
  });
})

app.post("/api/user/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user){
        return res.status(401).json({
          message: "Auth Failed"
        });
      }

      fetchedUser = user;
      return bcrypt.compare(req.body.password, fetchedUser.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
})

module.exports = app;