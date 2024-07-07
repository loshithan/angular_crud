import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { EmployeeItemComponent } from '../employee-item/employee-item.component';
import { MatCardModule } from '@angular/material/card';
import { IEmployee } from '../../models/Employee';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EmployeeItemComponent,CommonModule,MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {
  employees: IEmployee[] = [];
  error = "";
  constructor(private employeeService:EmployeeService){}

  ngOnInit(): void {
    this.refreshEmployees();
  }

  refreshEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: data => {
        this.employees = data;
      },
      error: error => {
        this.error = 'There was an error fetching the items';
        console.error(error);
      },
      complete: () => {
        console.log('Data fetch complete');
      }
    });
  }

  onDeleteComplete(): void {
    this.refreshEmployees(); // Refresh the employee list after deletion
  }

}
