import { Component, OnInit } from '@angular/core';
import { EmployeeApiService } from '../services/employee-api.service';
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  allEmployeeList: any = [];
  constructor(private empService: EmployeeApiService) { }
  // void is not mandatory
  ngOnInit() {
    console.log('inside ngoninit');
    this.getAllMethods()
  }
  getAllMethods() {
    this.empService.getAllEmployeeApi().subscribe({
      next: (res) => {
        console.log("all employee", res);
        this.allEmployeeList = res;
      },
      error: (res) => {
        console.log(res);

      }
    })
  }
  deleteEmployee(id: any) {
    this.empService.deleteEmployeeApi(id).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          title: 'Woow!',
          text: `successfully deleted`,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.getAllMethods()
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
  sortById() {
    // alert('sort by id')
    this.allEmployeeList.sort((a: any, b: any) => a.id - b.id)
  }
  sortByName() {
    // alert('sort by anme')
    this.allEmployeeList.sort((a: any, b: any) => a.username.localeCompare(b.username))
  }
  searchKey = '';
  genertepdf() {
    const pdf = new jsPDF();
    let head = [['ID', 'Employee Name', 'Email', 'Status']];
    let body: any = [];
    this.allEmployeeList.forEach((item: any) => {
      if(item.id !== 1){
        body.push([item.id, item.username, item.email, item.status])
      }
    })
    pdf.setFontSize(16);
    pdf.text('Employee Details', 10,10);
    autoTable(pdf,{head:head,body:body});
    pdf.save('employee_list.pdf')
  }
  p: number = 1;
  // this.allEmployeeList:any[]=someArrayOfThings;
}
