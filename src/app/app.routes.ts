import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add', component: AddEmployeeComponent },
    { path: 'edit/:id', component: EditEmployeeComponent }
  ];