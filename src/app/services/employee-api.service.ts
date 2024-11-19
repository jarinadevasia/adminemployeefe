import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private httpClient: HttpClient) { }
  server_url = "http://localhost:4000";
  // add a new employee
  addEmployeeApi(employeeDetails: any) {
    return this.httpClient.post(`${this.server_url}/employee`, employeeDetails)
  }
  // get all employee
  getAllEmployeeApi() {
    return this.httpClient.get(`${this.server_url}/employee`)
  }
  // delete an employee
  deleteEmployeeApi(empId: any) {
    return this.httpClient.delete(`${this.server_url}/employee/${empId}`)
  }
  // getting an employee details in update page
  getEmployeeByIdApi(empId: any) {
    return this.httpClient.get(`${this.server_url}/employee/${empId}`)
  }
  // update an employee
  updateEmployeeApi(empId: any,employeeDetails:any) {
    return this.httpClient.put(`${this.server_url}/employee/${empId}`,employeeDetails)
  }
}
