import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'sidebar', component:SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetPlannerRoutingModule { }
