import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Authentication/auth/auth.service';
import { StudentService } from 'src/app/Student/all-students/student.service';

@Component({
  selector: 'app-add-cgpa',
  templateUrl: './add-cgpa.component.html',
  styleUrls: ['./add-cgpa.component.css']
})
export class AddCGPAComponent implements OnInit {

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if(paramMap.has("yearId")){
        this.year = paramMap.get("yearId");
        
        this.studentService.getStudentsbyYear(this.year).subscribe(data => {
          this.allowedStudents = data.students;
        });
        
        this.studentService.getCoursesbyYear(this.year).subscribe(data => {
          this.allowedCourses = data.courses;
        });

      }
    });
  }

  isLoading = false;
  year: any;
  allowedStudents: any = [];
  allowedCourses: any = [];
  reg: any = ''; cours: any = '';

  constructor(public authService: AuthService, 
              public activatedRoute: ActivatedRoute, 
              public studentService: StudentService, 
              public router: Router,
              private _snackBar: MatSnackBar) {}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(form.value);
    this.studentService.postCGPA(form.value.reg, form.value.cours, form.value.cgpa)
    .subscribe(responseData => {
      if(responseData.message != "unsuccessful"){
        this.router.navigate(["/"]);
      }
      else{
        const snackBarRef = this._snackBar.open(responseData.message, "OK");

        snackBarRef.onAction().subscribe(() => {
          this.isLoading = false;
        })
      }
    });
    // this.authService.login(form.value.email, form.value.password);
  }

}
