import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private httpClinet:HttpClient) { }
  server_url = "http://localhost:4000";
  // login admin
  adminAuthorization(){
    return this.httpClinet.get(`${this.server_url}/employee/1`)
  }
  // update admin
  updateAdmin(admin:any){
    return this.httpClinet.put(`${this.server_url}/employee/1`, admin)
  }
  // 1) creating an object of behavior subject
  public sharedData = new BehaviorSubject(false);

  // 2) create a method to update the value of behavior subject
  updateSharedData(data:any){
    this.sharedData.next(data)
  }
}
