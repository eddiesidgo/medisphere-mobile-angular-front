import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ConfigurationService  {

  private apiUrl = 'http://127.0.0.1:8000/api/logout';

  constructor(private http: HttpClient) { }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
