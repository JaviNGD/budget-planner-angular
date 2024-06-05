import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSlideOut = true;
  constructor(private router: Router) { }

  toggleSidebar() {
    this.isSlideOut = !this.isSlideOut;
    console.log('toggleSidebar', this.isSlideOut);
  }

  onDashboard() {
    console.log('onDashboard');
    this.router.navigate(['/budget-planner/dashboard']);
  }

  onProfile() {
    console.log('onProfile');
    this.router.navigate(['/budget-planner/profile']);
  }

  onHistory() {
    console.log('onHistory');
    this.router.navigate(['/budget-planner/history']);
  }

  onLogout() {
    console.log('onLogout');
    this.router.navigate(['/budget-planner/login']);
  }

}
