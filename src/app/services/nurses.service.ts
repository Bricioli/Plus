import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NursesService {

  apiUrl = 'https://backend-plus.vercel.app'

  constructor(private httpClient: HttpClient) { }

  nurses(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/nurse');
  }
}
