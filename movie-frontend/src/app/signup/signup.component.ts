import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  signup() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.http.post('http://localhost:3000/user/signup', userData).subscribe(
      (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        alert(`Signup error: ${error.error.message}`);
        console.error('Signup error', error);
      }
    );
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
