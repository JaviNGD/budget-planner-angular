import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // Income data
  lastMonthsIncome = [
    {
      month: 'January',
      income: '$2000'
    },
    {
      month: 'February',
      income: '$3000'
    },
    {
      month: 'March',
      income: '$4000'
    }
  ];

  currentMonthIncome = { month: 'April', income: '$5000'};

  // Expenses data
  lastMonthsExpenses = [
    {
      month: 'January',
      expenses: '$1000'
    },
    {
      month: 'February',
      expenses: '$2000'
    },
    {
      month: 'March',
      expenses: '$3000'
    }
  ];

  currentMonthExpenses = { month: 'April', expenses: '$4000'};

  // To Do Transactions 
  toDoTransactions = [
      { title: 'Pay Rent', completed: true},
      { title: 'Pay Electricity Bill', completed: false},
      { title: 'Pay Internet Bill', completed: false},
      { title: 'Pay Water Bill', completed: false},
      { title: 'Pay Phone Bill', completed: true},
  ];

  // Total

  getCurrentMonthTotal(): number {
    return parseInt(this.currentMonthIncome.income.slice(1)) - parseInt(this.currentMonthExpenses.expenses.slice(1));
  }

  constructor(private router: Router) {}

  onIncome() {
    console.log('View Income');
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense() {
    console.log('View Expense');
    this.router.navigate(['/budget-planner/expense']);
  }

  onToDo() {
    console.log('View To Do');
    this.router.navigate(['/budget-planner/to-do']);
  }
}
