import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { EmployeeApiService } from '../services/employee-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  // creating an object
  employee: any = {
    id: '',
    username: '',
    email: '',
    status: '1'
  }
  constructor(private empService: EmployeeApiService, private router:Router) { }
  clearField() {
    this.employee = {
      status: 1
    }
  }
  addEmployee() {
    // alert('inside add employee')
    if (!this.employee.id || !this.employee.username || !this.employee.email || !this.employee.status) {
      Swal.fire({
        title: 'Oops!',
        text: 'please fill the form completely',
        icon: 'error',
        confirmButtonText: 'Go back !!'
      })
    }
    else {
      //for converting string to number
      // Number() and parseInt() can be used to convert string to integer
      this.employee.id=Number(this.employee.id) 
      this.employee.status = parseInt(this.employee.status)
      this.empService.addEmployeeApi(this.employee).subscribe({
        next: (res) => {
          // console.log("add employee response", res);
          Swal.fire({
            title: 'Great!',
            text: `${this.employee.username} successfully added`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.clearField()
          this.router.navigateByUrl('employees')
        },
        error: (res) => {
          // console.log(res);
          Swal.fire({
            title: 'Error!!',
            text: 'Something went wrong',
            icon: 'error',
            // confirmButtonText: 'Go back !!'
          })
        }
      })
    }
  }
}
