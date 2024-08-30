import { RegisterRespose } from './../types/register-response.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { }

  register(name: string, login: string, password : string) {
    return this.httpClient.post<RegisterRespose>("http://localhost:8000/user" , { name, login, password})
  }
}
