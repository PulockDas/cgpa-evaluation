import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const expiresIn = response.expiresIn;
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresIn * 1000)
          this.router.navigate(['/']);
        }
      });
  }

  signup(email: string, password: string){
    this.http.post("http://localhost:3000/api/user/signup", {email: email, password: password})
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
  }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
}
