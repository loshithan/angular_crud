import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7085/api/Employee';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  editEmployee(id: number,employee:IEmployee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`,employee);
  }
  addEmployee(employee:IEmployee): Observable<any> {
    return this.http.post(`${this.apiUrl}`,employee);
  }
  getEmployeeById(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
