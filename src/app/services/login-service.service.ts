import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  //
  private apiUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
