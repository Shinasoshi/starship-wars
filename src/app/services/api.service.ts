import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiBase = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStarships() {
    return this.http.get(`${this.apiBase}/starships`);
  }

}
