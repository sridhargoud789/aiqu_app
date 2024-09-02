import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = { email: '', password: '' };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  login() {
    this.authService.login(this.credentials);
    if (this.authService.isLoggedIn()) {
      this.authService.autoLogout();
      this.router.navigate(['dashboard']);
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
