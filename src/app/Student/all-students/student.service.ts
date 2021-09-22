import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";


import { Student } from './student.model';
import { Subject } from 'rxjs';
import { Course } from './Course.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  [x: string]: any;

  constructor(private http: HttpClient, private router: Router) { }

  private students: Student[] = [];
  private studentsUpdated = new Subject<{ students: Student[] }>();

  
  
  // All get methods

  getStudents(batch: string) {
    const queryParams = `?batch=${batch}`;

    this.http.get<{message: string, answer: any}>('http://localhost:3000/api/students' + queryParams)
    .pipe(
      map(studentsData => {
        return {
          students: studentsData.answer.map( (student: { registration: string; name: string; _id: string; cgpa: string; totalcredit: string}) => {
            return {
              _id: student._id,
              registration: student.registration,
              name: student.name,
              totalcredit: student.totalcredit,
              cgpa: student.cgpa,
            };
          })
        };
      })
    )
    .subscribe(transformedstudentData => {
      this.students = transformedstudentData.students;
      this.studentsUpdated.next({
        students: [...this.students],
      });
    });
  }

  getStudentsUpdateListener() {
    return this.studentsUpdated.asObservable();
  }

  getStudent(id: string){
    return this.http.get<{
      _id: string;
      registration: string;
      name: string;
      totalcredit: string;
      cgpa: string;
      year: string;
    }>("http://localhost:3000/api/students/" + id);
  }

  getCourses(id: string){
    return this.http.get<{allcourses: Course[], cgpa: string[], id: string}>("http://localhost:3000/api/courses/" + id);
  }

  getStudentsbyYear(year: string){
    return this.http.get<{students: any}>("http://localhost:3000/api/students_year/"+year);
  }

  getCoursesbyYear(year: string){
    return this.http.get<{courses: any}>("http://localhost:3000/api/courses_year/"+year);
  }


  // Post Methods

  postCGPA(studentId: string, courseId: string, cgpa: string){
    const postData = {
      'studentId': studentId,
      'courseId': courseId,
      'cgpa': cgpa
    }
    console.log(postData);
    return this.http
      .post<{ message: string; data: any }>( "http://localhost:3000/api/student_year", postData);
  }


  //patch request

  patchGPA(id: string, data: {gpa: string}){
    return this.http.put<{message: string}>("http://localhost:3000/api/student_course/" + id, data);
  }

  deleteCourseGPA(id: string){
    return this.http.delete<{message: string}>("http://localhost:3000/api/student_course/" + id);
  }

}
