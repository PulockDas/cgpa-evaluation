import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-student',
  templateUrl: './per-student.component.html',
  styleUrls: ['./per-student.component.css']
})
export class PerStudentComponent implements OnInit {

  courses = [
    {
      id : "SWE 221",
      title: "Data Structure",
      year: "1st Year",
      credit: '3',
      teacherId: "sayma1",
      teacherName: "Sayma Sultana Chowdhury",
      dept: "SWE",
      cgpa: '3.75'
    },
    {
      id : "SWE 221",
      title: "Data Structure",
      year: "1st Year",
      credit: '3',
      teacherId: "sayma1",
      teacherName: "Sayma Sultana Chowdhury",
      dept: "SWE",
      cgpa: '3.75'
    },
    {
      id : "SWE 221",
      title: "Data Structure",
      year: "1st Year",
      credit: '3',
      teacherId: "sayma1",
      teacherName: "Sayma Sultana Chowdhury",
      dept: "SWE",
      cgpa: '3.75'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
