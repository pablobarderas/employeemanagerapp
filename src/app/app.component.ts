import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public employees: Employee[] = [];
  public updateEmployee: Employee | undefined ;
  public deleteEmployee?: Employee;
  
  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees)
      }
    )
  }

  // ADD EMPLOYEE
  public onAddEmployee(addForm: NgForm): void {
    // Close modal
    document.getElementById('add-employee-form')?.click();
    // Send json representation of form
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      }
    )
  }

// UPDATE EMPLOYEE
public onUpdateEmployee(employee: Employee): void {
  // Send json representation of form
  this.employeeService.updateEmployee(employee).subscribe(
    (response: Employee) => {
      console.log(response);
      this.getEmployees();
    },
  )
}

// DELETE EMPLOYEE
public onDeleteEmployee(employeeId: number): void {
  // Send json representation of form
  this.employeeService.deleteEmployee(employeeId).subscribe(
    (response: void) => {
      console.log(response);
      this.getEmployees();
    },
  )
}

  public searchEmployees(key: string): void{
    const results: Employee[] = [];
    for (const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee | undefined, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    // Check what button has been pressed
    if (mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    
    if (mode === 'edit'){
      this.updateEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete'){
      if(employee!= undefined){
        this.deleteEmployee = employee;
      }
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    // Add button to container
    container?.appendChild(button);
    button.click();

  }

}
