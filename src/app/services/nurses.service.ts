import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { nurseResponse } from '../types/nurse-response.type';

@Injectable({
  providedIn: 'root'
})
export class NursesService {

  apiUrl = 'https://backend-plus.vercel.app'

  constructor(private httpClient: HttpClient) { }

  getNurses(): Observable<nurseResponse[]> {
    return this.httpClient.get<nurseResponse[]>(this.apiUrl + '/nurse');
  }

  getNurseById(id : string): Observable<nurseResponse[]> {
    return this.httpClient.post<nurseResponse[]>(this.apiUrl + '/nurse-info', {id});
  }

  register(name: string, birthday: string, cpf : string, coren : string, adress : string, phone : string, email : string, pix : string) {
    return this.httpClient.post(this.apiUrl + "/nurse" , { name, birthday, cpf, coren, adress, phone, email, pix})
  }

  update(id: string, name: string, birthday: string, cpf : string, coren : string, adress : string, phone : string, email : string, pix : string, worked : string, receive : number) {
    return this.httpClient.put(this.apiUrl + "/nurse-update" , { id, name, birthday, cpf, coren, adress, phone, email, pix, worked, receive})
  }
}
