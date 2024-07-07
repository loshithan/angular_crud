import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee } from '../../models/Employee';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-employee-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, FlexLayoutModule],
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css'],
  animations: [
    trigger('hoverAnimation', [
      state(
        'default',
        style({
          transform: 'scale(1)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        })
      ),
      state(
        'hover',
        style({
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        })
      ),
      transition('default <=> hover', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class EmployeeItemComponent {
  @Input() employee: IEmployee | undefined;
  @Output() deletionComplete: EventEmitter<any> = new EventEmitter();
  @Output() editComplete: EventEmitter<any> = new EventEmitter();

  cardState = 'default';

  onMouseEnter() {
    this.cardState = 'hover';
  }

  onMouseLeave() {
    this.cardState = 'default';
  }

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  deleteEmployee(employeeId: number) {
    // Call your service to delete the employee
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      // Emit event after successful deletion
      this.deletionComplete.emit();
    });
  }
  editEmployee(employeeId: number, employee: IEmployee) {
    this.employeeService.editEmployee(employeeId, employee).subscribe(() => {
      this.editComplete.emit();
    });
  }
  navigate(id: number): void {
    console.log('navigate click');
    this.router.navigate(['edit', id]);
  }
}
