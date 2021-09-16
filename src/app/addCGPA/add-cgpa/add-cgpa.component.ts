import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Authentication/auth/auth.service';

@Component({
  selector: 'app-add-cgpa',
  templateUrl: './add-cgpa.component.html',
  styleUrls: ['./add-cgpa.component.css']
})
export class AddCGPAComponent implements OnInit {

  ngOnInit(): void {
  }

  isLoading = false;
  year: any;

  constructor(public authService: AuthService) {}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

}
