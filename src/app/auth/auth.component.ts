import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService , AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isloading = false;
  error: string = null;
  constructor(private authService: AuthService,private router:Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isloading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs!: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs=this.authService.signin(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe({
      next: (response) => {
        this.isloading = false;
        this.router.navigate(['/recipes'])
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isloading = false;
      },
    });
    form.reset(); 
  }
}
