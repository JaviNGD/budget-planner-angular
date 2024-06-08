import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throws } from 'assert';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  constructor(private fb: FormBuilder, private router: Router) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    this.selectedMonth = currentMonth;
  }

  todoForm: any;
  selectedMonth: any;
  monthSelected: boolean = false;

  expenses: { month: string, amount: number, completed: boolean}[] = [
    {month: 'January', amount: 500, completed: false},
    {month: 'February', amount: 1000, completed: false},
    {month: 'March', amount: 1500, completed: false},
    {month: 'April', amount: 2000, completed: false},
  ]

  januaryExpenses: { item: string, amount: number, completed: boolean}[] = [
    {item: 'Groceries', amount: 200, completed: false},
    {item: 'Rent', amount: 300, completed: false},
  ]

  februaryExpenses: { item: string, amount: number, completed: boolean}[] = [
    {item: 'Groceries', amount: 300, completed: false},
    {item: 'Rent', amount: 700, completed: false},
  ]

  marchExpenses: { item: string, amount: number, completed: boolean}[] = [
    {item: 'Groceries', amount: 400, completed: false},
    {item: 'Rent', amount: 1100, completed: false},
  ]

  aprilExpenses: { item: string, amount: number, completed: boolean}[] = [
    {item: 'Pay Rent', amount: 1250, completed: true},
    {item: 'Pay Electricity Bill', amount: 500, completed: false},
    {item: 'Pay Internet Bill', amount: 100, completed: false},
    {item: 'Pay Water Bill', amount: 75, completed: false},
    {item: 'Pay Phone Bill', amount: 75, completed: true},
  ]

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      item: ['', Validators.required],
      amount: ['', Validators.required],
      completed: [false]
    })
  }

  onSubmitTodo() {
    if (this.todoForm.valid) {
      const newTodo = this.todoForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryExpenses.push(newTodo);
          break;
        case 'February':
          this.februaryExpenses.push(newTodo);
          break;
        case 'March':
          this.marchExpenses.push(newTodo);
          break;
        case 'April':
          this.aprilExpenses.push(newTodo);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({month: this.selectedMonth, item: '', amount: '', completed: false});
    }
  }

  onChangeTodo(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredToDos();
  }

  getFilteredToDos() {
    let filteredToDos: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredToDos = [...this.januaryExpenses];
        break;
      case 'February':
        filteredToDos = [...this.februaryExpenses];
        break;
      case 'March':
        filteredToDos = [...this.marchExpenses];
        break;
      case 'April':
        filteredToDos = [...this.aprilExpenses];
        break;
      default:
        break;
    }
    return filteredToDos;
  }

  calculateTotalTodoTrans(month: string): number {
    let totalToDos = 0;
    for (const todo of this.getToDosForMonth(month)) {
      totalToDos += todo.amount;
    }
    return totalToDos;
  }

  getToDosForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryExpenses;
      case 'February':
        return this.februaryExpenses;
      case 'March':
        return this.marchExpenses;
      case 'April':
        return this.aprilExpenses;
      default:
        return [];
    }
  }

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredToDos();
    }
  }

  toggleSelection(todo: any) {
    todo.completed = !todo.completed;
  }

  saveForm() {
    console.log('Form saved');
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
