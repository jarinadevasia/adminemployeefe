import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApiService } from '../services/admin-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged = false;
  constructor(private router: Router, private adminService: AdminApiService) {
    this.adminService.sharedData.subscribe((data) => {
      // alert(data)
      this.isLogged = data;
    })
    if(sessionStorage.getItem("username")){
      this.isLogged=true;
    }
  }
  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    this.router.navigateByUrl('')
    this.isLogged=false;
  }
}
