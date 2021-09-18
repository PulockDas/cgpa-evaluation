import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCGPAComponent } from './addCGPA/add-cgpa/add-cgpa.component';
import { AuthComponent } from './Authentication/auth/auth.component';
import { AllStudentsComponent } from './Student/all-students/all-students.component';
import { PerStudentComponent } from './Student/all-students/perStudent/per-student/per-student.component';

const routes: Routes = [
  { path: "", component: AllStudentsComponent },
  { path: "create", component: AddCGPAComponent },
  { path: "edit/:id", component: AddCGPAComponent },
  { path: ":studentId", component: PerStudentComponent },
  { path: "login", component: AuthComponent },
  { path: "signup", component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
