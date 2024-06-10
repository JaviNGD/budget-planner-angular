import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadUserData();
  }

  loadUserData() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser) {
        this.profileForm.patchValue({
          name: currentUser.name,
          lastName: currentUser.lastName,
          email: currentUser.email
        });
      }
    }
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(this.profileForm.value));
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 2000
        });
      }
    } else {
      this.snackBar.open('Please fill in all the required fields!', 'Close', {
        duration: 2000
      });
    }
  }
}
