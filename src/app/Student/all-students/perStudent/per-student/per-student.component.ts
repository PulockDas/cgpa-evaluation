import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../student.model';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-per-student',
  templateUrl: './per-student.component.html',
  styleUrls: ['./per-student.component.css']
})
export class PerStudentComponent implements OnInit {

  courses = [
    {
      id: "SWE 221",
      title: "Data Structure",
      year: "1st Year",
      credit: '3',
      teacherId: "sayma1",
      teacherName: "Sayma Sultana Chowdhury",
      dept: "SWE",
      cgpa: '3.75'
    },
    {
      id: "SWE 221",
      title: "Data Structure",
      year: "1st Year",
      credit: '3',
      teacherId: "sayma1",
      teacherName: "Sayma Sultana Chowdhury",
      dept: "SWE",
      cgpa: '3.75'
    },
    {
      id: "SWE 221",
      title: "Data Structure",
      year: "1st Year",
      credit: '3',
      teacherId: "sayma1",
      teacherName: "Sayma Sultana Chowdhury",
      dept: "SWE",
      cgpa: '3.75'
    }
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
      }
    })
  }

}
