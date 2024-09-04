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
}
