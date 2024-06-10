import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  historyForm: any;
  selectedMonth: string;
  monthSelected: boolean = false;
  
  transactions: { month: string; totalAmount: number }[] = [
    { month: 'September', totalAmount: 1000 },
    { month: 'October', totalAmount: 1500 },
    { month: 'November', totalAmount: 2000 },
    { month: 'December', totalAmount: 2500 }
  ];

  septemberTransactions: { transaction: string; amount: number }[] = [
    { transaction: 'Rent', amount: 500 },
    { transaction: 'Groceries', amount: 300 },
    { transaction: 'Utilities', amount: 200 }
  ];

  octoberTransactions: { transaction: string; amount: number }[] = [
    { transaction: 'Rent', amount: 500 },
    { transaction: 'Groceries', amount: 300 },
    { transaction: 'Utilities', amount: 200 },
    { transaction: 'Entertainment', amount: 1000 }
  ];

  novemberTransactions: { transaction: string; amount: number }[] = [
    { transaction: 'Rent', amount: 500 },
    { transaction: 'Groceries', amount: 300 },
    { transaction: 'Utilities', amount: 200 },
    { transaction: 'Entertainment', amount: 1000 },
    { transaction: 'Miscellaneous', amount: 200 }
  ];

  decemberTransactions: { transaction: string; amount: number }[] = [
    { transaction: 'Rent', amount: 500 },
    { transaction: 'Groceries', amount: 300 },
    { transaction: 'Utilities', amount: 200 },
    { transaction: 'Entertainment', amount: 1000 },
    { transaction: 'Miscellaneous', amount: 200 },
    { transaction: 'Savings', amount: 1000 },
    { transaction: 'Investments', amount: 800 },
    { transaction: 'Insurance', amount: 200 }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = '';
  }

  ngOnInit(): void {
    this.historyForm = this.fb.group({
      month: ['', Validators.required],
      transaction: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.historyForm.valid) {
      const newTransaction = this.historyForm.value;
      this.getFilteredTransactions().push(newTransaction);
      this.historyForm.reset();
    }
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredTransactions();
  }

  getFilteredTransactions() {
    switch (this.selectedMonth) {
      case 'September':
        return this.septemberTransactions;
      case 'October':
        return this.octoberTransactions;
      case 'November':
        return this.novemberTransactions;
      case 'December':
        return this.decemberTransactions;
      default:
        return [];
    }
  }

  calculateTotalAmount(month: string): number {
    return this.getFilteredTransactions().reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
