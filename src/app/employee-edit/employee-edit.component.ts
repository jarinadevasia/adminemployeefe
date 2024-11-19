import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from '../services/employee-api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeDetailsById: any = {};
  empId:any;
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const { id } = res;
      this.empId=id;
      this.getEmployeeDetailsById(id)
    })
  }
  // ActivatedRoute class is used to extract params from url path
  constructor(private route: ActivatedRoute, private empService: EmployeeApiService,private router:Router) { }
  getEmployeeDetailsById(empid: any) {
    this.empService.getEmployeeByIdApi(empid).subscribe({
      next: (res) => {
        console.log(res);
        this.employeeDetailsById = res;
      },
      error: (res) => {
        console.log(res);
      }
    })
  }
  updateEmployee(){
    this.employeeDetailsById.id = Number(this.employeeDetailsById.id);
    this.employeeDetailsById.status= Number(this.employeeDetailsById.status);
    console.log('on update',this.employeeDetailsById);
    this.empService.updateEmployeeApi(this.empId,this.employeeDetailsById).subscribe({
      next: (res) => {
        console.log('updated response',res);
        Swal.fire({
          title: 'Great!',
          text: `${this.employeeDetailsById.username} successfully updated`,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.router.navigateByUrl('employees')
      },
      error: (res) => {
        console.log(res);
        Swal.fire({
          title: 'Error!!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Go back !!'
        })
      }
    })
  }
  cancel(){
     this.router.navigateByUrl('employees');
  }
}
