import { Component, OnInit } from '@angular/core';
import { Batch } from './batch.model';
import { StudentService } from './student.service';
import { Student } from './student.model';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  batches = [
    {title: "1st" , description: 'It\'s the 19th batch of SWE'},
    {title: "2nd" , description: 'It\'s the 18th batch of SWE'},
    {title: "3rd" , description: 'It\'s the 17th batch of SWE'},
    {title: "4th" , description: 'It\'s the 16th batch of SWE'},
  ];

  isLoading: boolean = true;
  studentsSub: any;

  // ELEMENT_DATA = [
  //   {registration: '2017831001', name: 'Hydrogen', totalCredit: 1.0079, cgpa: 3.9},
  //   {registration: '2017831002', name: 'Helium', totalCredit: 4.0026, cgpa: 3.9},
  //   {registration: '2017831003', name: 'Lithium', totalCredit: 6.941, cgpa: 3.85},
  //   {registration: '2017831004', name: 'Beryllium', totalCredit: 9.0122, cgpa: 3.85},
  //   {registration: '2017831005', name: 'Boron', totalCredit: 10.811, cgpa: 3.85},
  //   {registration: '2017831006', name: 'Carbon', totalCredit: 12.0107, cgpa: 3.85},
  //   {registration: '2017831007', name: 'Nitrogen', totalCredit: 14.0067, cgpa: 3.85},
  //   {registration: '2017831008', name: 'Oxygen', totalCredit: 15.9994, cgpa: 3.85},
  //   {registration: '2017831009', name: 'Fluorine', totalCredit: 18.9984, cgpa: 3.85},
  //   {registration: '2017831010', name: 'Neon', totalCredit: 20.1797, cgpa: 3.85},
  // ];

  students: Student[] = [
    {registration: '2017831001', name: 'Hydrogen', totalCredit: "1.0079", cgpa: '3.9'},
    {registration: '2017831002', name: 'Helium', totalCredit: "1.0079", cgpa: '3.9'},
    {registration: '2017831003', name: 'Lithium', totalCredit: "1.0079", cgpa: '3.85'},
    {registration: '2017831004', name: 'Beryllium', totalCredit: "9.0122", cgpa: '3.85'},
  ];

  displayedColumns: string[] = ['registration', 'name', 'totalCredit', 'cgpa'];

  constructor(public studentService: StudentService) { }

  ngOnInit(): void {

  }

  showDetails(reg: string){
    console.log(reg);
  }

  fetch(batch: string) {
    console.log("hello");
    this.isLoading = true;
    this.students = this.students.splice(0, this.students.length);
    this.studentService.getStudents(batch);

    this.studentsSub = this.studentService.getStudentsUpdateListener()
    .subscribe((studentData: { students: Student[]}) => {
      this.isLoading = false;
      this.students = studentData.students;
    });
  }

}
