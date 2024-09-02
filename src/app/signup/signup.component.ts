import { Component } from '@angular/core';
import { AuthService } from '../../auth/service';

import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    const resp = this.authService.signup(this.user);
    debugger;
    if (this.authService.isLoggedIn()) {
      this.authService.autoLogout();
      this.router.navigate(['dashboard']);
    }
  }
}
