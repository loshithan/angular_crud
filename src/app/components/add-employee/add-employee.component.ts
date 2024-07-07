import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IEmployee } from '../../models/Employee';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  checkoutForm: FormGroup;
  @Output() addComplete: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,private router:Router) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const employee: IEmployee = this.checkoutForm.value;
      this.createEmployee(employee);
    } else {
      console.warn('Form is invalid');
    }
  }

  createEmployee(employee: IEmployee): void {
    this.employeeService.addEmployee(employee).subscribe(() => {
      this.addComplete.emit();
      this.checkoutForm.reset();
      this.router.navigate(['dashboard']);
    });
  }
}
