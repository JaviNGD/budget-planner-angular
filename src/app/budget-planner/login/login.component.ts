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
      const user = this.loginForm.value;
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      const existingUser = registeredUsers.find((u: any) => u.email === user.email && u.password === user.password);

      if (existingUser) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/budget-planner/dashboard']);
      } else {
        this.snackBar.open('User not registered or incorrect password', 'Close', { duration: 2000 });
      }
    } else {
      this.snackBar.open('Invalid email or password', 'Close', { duration: 2000 });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      const existingUser = registeredUsers.find((u: any) => u.email === user.email);

      if (existingUser) {
        this.snackBar.open('User already registered', 'Close', { duration: 2000 });
      } else {
        registeredUsers.push(user);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/budget-planner/dashboard']);
      }
    } else {
      this.snackBar.open('Invalid data', 'Close', { duration: 2000 });
    }
  }
}
