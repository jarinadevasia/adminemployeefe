import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  empEmail: string = '';
  empPassword: string = '';
  // injecting using constructor
  constructor(private adminService: AdminApiService , private router:Router) { }
  login() {
    // alert('hiiiiii');
    if (!this.empEmail || !this.empPassword) {
      // alert("please fill the form completely")
      Swal.fire({
        title: 'Oops!',
        text: 'please fill the form completely',
        icon: 'error',
        confirmButtonText: 'Go back !!'
      })
      
    }
    else {
      this.adminService.adminAuthorization().subscribe({
        next: (res: any) => {
          const { email, password } = res;
          if (email === this.empEmail && password === this.empPassword) {
            console.log('admin logged in successfully');
            console.log(res);
            this.adminService.updateSharedData(true);
            sessionStorage.setItem("username",res.username)
            sessionStorage.setItem("password",res.password)
            Swal.fire({
              title: "  Woow!",
              text: "Logged in successfully!",
              icon: "success"
            });
            this.router.navigateByUrl('dashboard')
          }
          else{
            Swal.fire({
              title: 'Error!',
              text: 'Invalid Email or Password',
              icon: 'error',
              // confirmButtonText: ''
            })
          }
        },
        error: (res: any) => {
          console.log(res);

        }
      })
      
    }
  }
}
