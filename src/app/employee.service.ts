import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Employee } from "./employee";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private apiServerUrl='http://localhost:8080';

  constructor(private http: HttpClient){ }

  // GET ALL EMPLOYEES
  public getEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  // ADD EMPLOYEE
  public addEmployee(employee: Employee): Observable<Employee> {
      return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  // UPDATE EMPLOYEE
  public updateEmployee(employee: Employee): Observable<Employee> {
      return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  // DELETE EMPLOYEE
  public deleteEmployee(employeeId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }



}