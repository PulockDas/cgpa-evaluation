import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../Course.model';
import { Student } from '../../student.model';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-per-student',
  templateUrl: './per-student.component.html',
  styleUrls: ['./per-student.component.css']
})
export class PerStudentComponent implements OnInit {

  courses: Course[] = [
    // {
    //   _id: "SWE 221",
    //   courseId: "SWE 221",
    //   courseTitle: "Data Structure",
    //   credit: "3",
    //   teacherId: "sayma1",
    //   year: '1st',
    // },
    // {
    //   _id: "SWE 221",
    //   courseId: "SWE 221",
    //   courseTitle: "Data Structure",
    //   credit: "3",
    //   teacherId: "sayma1",
    //   year: '1st',
    // },
    // {
    //   _id: "SWE 221",
    //   courseId: "SWE 221",
    //   courseTitle: "Data Structure",
    //   credit: "3",
    //   teacherId: "sayma1",
    //   year: '1st',
    // }
  ];

  gpa: any=[
    // '4.0', '3.5', '3.75'
  ];

  studentId: any;
  isLoading: any;
  student: Student = {
    registration: "2017831047",
    name: "bala",
    totalCredit: "120",
    cgpa: "3.45",
    year: "3rd"
  };

  constructor(public route: ActivatedRoute, public studentService: StudentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("studentId")) {
        this.studentId = paramMap.get("studentId");
        this.isLoading = true;
        this.studentService.getStudent(this.studentId).subscribe(studentData => {

          if (studentData) {
            this.isLoading = false;
            this.student = {
              registration: studentData.registration,
              name: studentData.name,
              totalCredit: studentData.totalcredit,
              cgpa: studentData.cgpa,
              year: studentData.year
            };

            console.log(this.student);
          }
        });

        this.studentService.getCourses(this.studentId)
        .subscribe(courseData => {

          if (courseData) {
            this.courses = courseData.allcourses;
            this.gpa = courseData.cgpa;

            console.log(this.courses);
          }
        });

      }
    });
  }

}
