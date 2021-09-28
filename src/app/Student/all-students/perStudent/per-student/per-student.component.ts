import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Authentication/auth/auth.service';
import { Course } from '../../Course.model';
import { Student } from '../../student.model';
import { StudentService } from '../../student.service';
import { BottomSheetOverviewExampleSheet } from './Bottom Sheet/BottomSheetOverviewExampleSheet.component';
import { DialogOverviewExampleDialog } from './dialog_box/dialog-overview-example.component';

@Component({
  selector: 'app-per-student',
  templateUrl: './per-student.component.html',
  styleUrls: ['./per-student.component.css']
})
export class PerStudentComponent implements OnInit, OnDestroy {

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

  showdetails: boolean = false;

  gpa: any = [
    // '4.0', '3.5', '3.75'
  ];

  id: any = [];

  studentId: any;
  isLoading: any;
  student: Student = {
    registration: "2017831047",
    name: "bala",
    totalcredit: "120",
    cgpa: "3.45",
    year: "3rd"
  };

  updatedgpa: string = '';
  private sub: any;
  public userIsAuthenticated: boolean = false;

  constructor(public route: ActivatedRoute,
    public studentService: StudentService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
    private authService: AuthService) { }

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
              totalcredit: studentData.totalcredit,
              cgpa: studentData.cgpa,
              year: studentData.year
            };

            // console.log(this.student);
          }
        });

        this.studentService.getCourses(this.studentId)
          .subscribe(courseData => {

            if (courseData) {
              this.courses = courseData.allcourses;
              this.gpa = courseData.cgpa;
              this.id = courseData.id;

              // console.log(this.courses);
            }
          });
      }
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { gpa: this.updatedgpa }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updatedgpa = result;

      console.log(this.updatedgpa);

      if (this.updatedgpa) {
        this.studentService.patchGPA(id, { gpa: this.updatedgpa })
          .subscribe((response) => {
            console.log("successfull");

            window.location.reload();
          });
      }
    });
  }

  openWarnDialog(id: string): void {
    const snackbarRef = this._snackBar.open("Are you sure?", "Yes");

    snackbarRef.onAction().subscribe(() => {
      this.studentService.deleteCourseGPA(id).subscribe(
        res => {
          console.log(res.message);
          window.location.reload();
        }
      );
    });
  }

  teacherDetails(id: string) {
    this.studentService.getTeacherDetails(id)
      .subscribe(data => {
        if (data) {
          this.showdetails = true;
          this._bottomSheet.open(BottomSheetOverviewExampleSheet, { data: { teacher: data.teacher, courses: data.courses } });
          console.log(data);
        }
      });
  }

  ngOnDestroy() {
  }

}
