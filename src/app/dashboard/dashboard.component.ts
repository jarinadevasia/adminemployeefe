import { Component, OnInit } from '@angular/core';
import { EmployeeApiService } from '../services/employee-api.service';
import { AdminApiService } from '../services/admin-api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeeCount = 0;
  adminName: any = ''
  adminPwd: any = ''
  constructor(private empService: EmployeeApiService, private adminservice: AdminApiService) { }
  ngOnInit(): void {
    this.getAdminDetails();
    if (sessionStorage.getItem('username')) {
      this.adminName = sessionStorage.getItem('username')
    }
    if (sessionStorage.getItem('password')) {
      this.adminPwd = sessionStorage.getItem('password')
    }
    this.getAllEmployees()
  }
  getAllEmployees() {
    this.empService.getAllEmployeeApi().subscribe({
      next: (res: any) => {
        console.log('all employees in dashboard', res);
        this.employeeCount = res.length - 1;
      },
      error: (res) => {
        console.log(res);
      }
    })
  }
  selected: Date | null = new Date();
  profileImg = './assets/profile1.png';
  editAdminStatus = false;
  editAdmin() {
    // alert('hiii')
    this.editAdminStatus = !this.editAdminStatus;
    this.adminName=sessionStorage.getItem('username');
    this.adminPwd =sessionStorage.getItem('password')
  }
  getFile(data: any) {
    // alert('hiii')
    let fileDetails = data.target.files[0];
    // alert(fileDetails)
    // next we need to convert it into a URL
    // fileReader is used for that
    let fr = new FileReader();
    fr.readAsDataURL(fileDetails);
    fr.onload = (event: any) => {
      this.profileImg = event.target.result;
    }
  }
  getAdminDetails() {
    this.adminservice.adminAuthorization().subscribe({
      next: (res: any) => {
        this.adminDetails = res;
        if (res.profilePic) {
          this.profileImg = res.profilePic;
        }
      },
      error: (res) => {
        console.log(res);

      }
    })
  }
  adminDetails: any = {};
  updateAdmin() {
    this.adminDetails.username = this.adminName;
    this.adminDetails.password = this.adminPwd;
    this.adminDetails.profilePic = this.profileImg;
    this.adminservice.updateAdmin(this.adminDetails).subscribe({
      next: (res: any) => {
        alert('updated succesfuly')
        this.editAdminStatus = false;
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('password', res.password);
        this.adminName=res.username;
        this.adminPwd=''
      },
      error: (res) => {
        // console.log(res);
        alert('something went wrong')
      }
    })
  }
  cancelUpdate(){
    this.adminName=sessionStorage.getItem('username');
    this.adminPwd=sessionStorage.getItem('password');
    this.profileImg=this.adminDetails.profilePic;
  }
}
