import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  activeForm: 'login' | 'register' = 'login';

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      this.snackBar.open('Invalid email or password', 'Close', { duration: 2000 });
    }
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      this.snackBar.open('An error has occurred, please try again', 'Close', { duration: 2000 });
    }
  }
}
