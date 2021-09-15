import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllStudentsComponent } from './Student/all-students/all-students.component';
import { PerStudentComponent } from './Student/all-students/perStudent/per-student/per-student.component';
import { AuthComponent } from './Authentication/auth/auth.component';
import { AddCGPAComponent } from './addCGPA/add-cgpa/add-cgpa.component';

@NgModule({
  declarations: [
    AppComponent,
    AllStudentsComponent,
    PerStudentComponent,
    AuthComponent,
    AddCGPAComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
