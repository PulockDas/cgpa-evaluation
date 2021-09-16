import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string) {
    // const authData: AuthData = { email: email, password: password };
    // this.http
    //   .post<{ token: string }>("http://localhost:3000/api/user/login", authData)
    //   .subscribe(response => {
    //     const token = response.token;
    //     this.token = token;
    //     if (token) {
    //       this.isAuthenticated = true;
    //       this.authStatusListener.next(true);
    //       this.router.navigate(['/']);
    //     }
    //   });
  }
}
