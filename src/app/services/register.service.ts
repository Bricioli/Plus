import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = 'https://backend-plus.vercel.app'
  constructor(private httpClient : HttpClient) { }

  register(name: string, login: string, password : string) {
    return this.httpClient.post(this.apiUrl + "/user" , { name, login, password})
  }
}
