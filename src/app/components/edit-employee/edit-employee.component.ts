import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from '../../models/Employee';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule, // Add CommonModule to imports
  ],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editForm: FormGroup;
  employeeId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = Number(params.get('id'));
      if (this.employeeId) {
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      console.log(employee,"employee");
      this.editForm.patchValue(employee);

      // this.editForm.patchValue({name:employee.name,age:employee.age});
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.employeeId) {
      const updatedEmployee: IEmployee = {
        id: this.employeeId,
        ...this.editForm.value
      };      this.updateEmployee(this.employeeId, updatedEmployee);
    } else {
      console.warn('Form is invalid');
    }
  }

  updateEmployee(id: number, employee: IEmployee): void {
    this.employeeService.editEmployee(id, employee).subscribe(() => {
      console.log('Employee updated successfully');
      this.router.navigate(['dashboard']);

      // You can add further actions here, like navigation or showing a success message
    });
  }
}
