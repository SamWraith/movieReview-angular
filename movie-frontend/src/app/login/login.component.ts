import { HttpClient } from '@angular/common/http';
import * as UserActions from '../user/user.actions';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { selectUser } from '../user/user.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<any>,
    private router: Router
  ) {}
  user$: Observable<any> = this.store.pipe(select(selectUser));

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log('User in redux:', user);
    });
  }

  login() {
    const user: User = { email: this.email, password: this.password };
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        this.store.dispatch(UserActions.login({ user: response }));
        this.router.navigate(['/movie']);
      },
      (error) => {
        alert(`Login error: ${error.error.message}`);
        console.error('Login error', error);
        this.store.dispatch(UserActions.loadUserFailure({ error }));
      }
    );
  }
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
