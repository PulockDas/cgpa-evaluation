import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading: boolean = false;
  isLogin: boolean = false;
  isSignup: boolean = false;

  constructor(public authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.url.subscribe(url => {
      const auth = url[0].path;
      if(auth == 'login'){
        this.isLogin = true;
      } else if(auth == 'signup'){
        this.isSignup = true;
      }
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    if(this.isSignup){
      this.authService.signup(form.value.email, form.value.password);
    }
    else if(this.isLogin){
      this.authService.login(form.value.email, form.value.password);
    }
  }

}
