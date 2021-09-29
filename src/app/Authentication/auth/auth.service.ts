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
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);

          this.saveAuthData(token, expirationDate);
          this.setAuthTimer(expiresIn);
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

  autoAuthUser(){
    const authInformation = this.getAuthData();

    if(!authInformation){
      return;
    }
    
    const now = new Date();

    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }

  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000);
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");

    if(!token || !expirationDate){
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
