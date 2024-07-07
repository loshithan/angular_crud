import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DashboardComponent, AddEmployeeComponent,MatButtonModule]
})
export class AppComponent {
  title = 'my-angular-app2';
}
