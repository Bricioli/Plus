import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRespose } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(login: string, password: string) {
    return this.httpClient.post<LoginRespose>("http://localhost:8000/login", { login, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("name", value.name)
        sessionStorage.setItem("type", value.type)
      })
    )
  }
}
