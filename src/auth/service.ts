import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:5000/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  signup(userData: any) {
    return this.http
      .post(AUTH_API + `register`, userData, httpOptions)
      .subscribe({
        next: (response: any) => {
          this.setSession(response.token);
        },
        error: (error) => {
          return { statuscode: 400, message: error.error.message };
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  login(credentials: any) {
    return this.http
      .post(AUTH_API + `login`, credentials, httpOptions)
      .subscribe({
        next: (response: any) => {
          debugger;
          this.setSession(response.token);
        },
        error: (error) => {
          debugger;
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['login']);
  }

  private setSession(token: string) {
    const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // 8 hours from now
    localStorage.setItem(this.tokenKey, JSON.stringify({ token, expiresAt }));
  }

  isLoggedIn(): boolean {
    const session = this.getSession();
    if (!session) return false;
    return Date.now() < session.expiresAt;
  }

  getSession() {
    const session = localStorage.getItem(this.tokenKey);
    return session ? JSON.parse(session) : null;
  }

  autoLogout() {
    setTimeout(() => {
      this.logout();
    }, 8 * 60 * 60 * 1000); // Logout after 8 hours
  }
}
