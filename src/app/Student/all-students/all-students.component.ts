import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Batch } from './batch.model';
import { StdentService } from './stdent.service';
import { Student } from './student.model';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  batches = [
    {title: "1st Year" , description: 'It\'s the 19th batch of SWE'},
    {title: "2nd Year" , description: 'It\'s the 18th batch of SWE'},
    {title: "3rd Year" , description: 'It\'s the 17th batch of SWE'},
    {title: "4th Year" , description: 'It\'s the 16th batch of SWE'},
  ];

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
    // {registration: '2017831001', name: 'Hydrogen', totalCredit: "1.0079", cgpa: '3.9'},
    // {registration: '2017831002', name: 'Helium', totalCredit: "1.0079", cgpa: '3.9'},
    // {registration: '2017831003', name: 'Lithium', totalCredit: "1.0079", cgpa: '3.85'},
    // {registration: '2017831004', name: 'Beryllium', totalCredit: "9.0122", cgpa: '3.85'},
  ];
  private studentSub: Subscription = new Subscription();

  displayedColumns: string[] = ['registration', 'name', 'totalCredit', 'cgpa'];

  constructor(public studentService: StdentService) { }

  ngOnInit(): void {
    this.studentService.getStudents();
    this.studentSub = this.studentService.getStudentUpdateListener()
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }

  showDetails(reg: string){

  }

}
