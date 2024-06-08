import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  expensesForm: any;
  selectedMonth: string = '';
  monthSelected: boolean = false;

  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1000 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 3000 },
    { month: 'April', expenseAmount: 4000 }
  ];

  januaryExpense: any[] = [
    {expenseType: 'Groceries', expenseAmount: 100},
    {expenseType: 'Rent', expenseAmount: 500},
    {expenseType: 'Utilities', expenseAmount: 100},
    {expenseType: 'Transportation', expenseAmount: 100},
    {expenseType: 'Entertainment', expenseAmount: 100},
    {expenseType: 'Health', expenseAmount: 100}
  ];

  februaryExpense: any[] = [
    {expenseType: 'Groceries', expenseAmount: 200},
    {expenseType: 'Rent', expenseAmount: 1000},
    {expenseType: 'Utilities', expenseAmount: 200},
    {expenseType: 'Transportation', expenseAmount: 200},
    {expenseType: 'Entertainment', expenseAmount: 200},
    {expenseType: 'Health', expenseAmount: 200}
  ];
  
  marchExpense: any[] = [
    {expenseType: 'Groceries', expenseAmount: 300},
    {expenseType: 'Rent', expenseAmount: 1500},
    {expenseType: 'Utilities', expenseAmount: 300},
    {expenseType: 'Transportation', expenseAmount: 300},
    {expenseType: 'Entertainment', expenseAmount: 300},
    {expenseType: 'Health', expenseAmount: 300}
  ];

  aprilExpense: any[] = [
    {expenseType: 'Groceries', expenseAmount: 400},
    {expenseType: 'Rent', expenseAmount: 2000},
    {expenseType: 'Utilities', expenseAmount: 400},
    {expenseType: 'Transportation', expenseAmount: 400},
    {expenseType: 'Entertainment', expenseAmount: 400},
    {expenseType: 'Health', expenseAmount: 400}
  ];

  ngOnInit(): void {
    this.expensesForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expensesForm.valid) {
      const newExpense = this.expensesForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expensesForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      case 'April':
        return this.aprilExpense;
      default:
        return [];
    }
  }

  calculateTotalExpenses(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  saveForm() {
    console.log('Expense saved');
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
