import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  constructor(private fb:FormBuilder, private router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {month: 'long'});
  }

  incomeForm: any;
  selectedMonth: string = '';

  januaryIncomes: any[] = [
    {source: 'Salary', amount: 2000, investments: 'Stocks'},
    {source: 'Freelance', amount: 0, investments: ''},
  ]

  FebruaryIncomes: any[] = [
    {source: 'Salary', amount: 2000, investments: 'Stocks'},
    {source: 'Freelance', amount: 1000, investments: 'Real Estate'},
  ]

  MarchIncomes: any[] = [
    {source: 'Salary', amount: 2000, investments: 'Stocks'},
    {source: 'Freelance', amount: 2000, investments: 'Real Estate'},
  ]

  AprilIncomes: any[] = [
    {source: 'Salary', amount: 2000, investments: 'Stocks'},
    {source: 'Freelance', amount: 3000, investments: 'Real Estate'},
  ]

  monthSelected: boolean = false;

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      investments: ['', Validators.required],
    });
  }

  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch(this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes = [...this.FebruaryIncomes]
        break;
      case 'March':
        filteredIncomes = [...this.MarchIncomes]
        break;
      case 'April':
        filteredIncomes = [...this.AprilIncomes]
        break;
      default:
        break;
    }
    return filteredIncomes;
  }

  getIncomesForMonth(month: string): any[] {
    switch(month) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.FebruaryIncomes;
      case 'March':
        return this.MarchIncomes;
      case 'April':
        return this.AprilIncomes;
      default:
        return [];
    }
  }

  calculatedTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncomes();
  }

  onSubmit() {
    if (this.incomeForm.valid){
      const newIncome = this.incomeForm.value;
      switch(this.selectedMonth) {
        case 'January':
          this.januaryIncomes.push(newIncome);
          break;
        case 'February':
          this.FebruaryIncomes.push(newIncome);
          break;
        case 'March':
          this.MarchIncomes.push(newIncome);
          break;
        case 'April':
          this.AprilIncomes.push(newIncome);
          break;
        default:
          break;
    }
    this.incomeForm.reset();
    this.incomeForm.patchValue({ month: this.selectedMonth, source : '', amount: '', investments: ''});
    }
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  saveForm() {
    console.log('Form saved');
  }
}
