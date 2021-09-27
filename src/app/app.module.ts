import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllStudentsComponent } from './Student/all-students/all-students.component';
import { PerStudentComponent } from './Student/all-students/perStudent/per-student/per-student.component';
import { AuthComponent } from './Authentication/auth/auth.component';
import { AddCGPAComponent } from './addCGPA/add-cgpa/add-cgpa.component';
import { DialogOverviewExampleDialog } from './Student/all-students/perStudent/per-student/dialog_box/dialog-overview-example.component'

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheet } from './Student/all-students/perStudent/per-student/Bottom Sheet/BottomSheetOverviewExampleSheet.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    AllStudentsComponent,
    PerStudentComponent,
    AuthComponent,
    AddCGPAComponent,
    HeaderComponent,
    DialogOverviewExampleDialog,
    BottomSheetOverviewExampleSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
