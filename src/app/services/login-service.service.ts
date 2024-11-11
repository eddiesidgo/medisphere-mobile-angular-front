import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular'; 


@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  private apiUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient,private storage: Storage) { 
    this.storage.create(); 
  }
 


  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      map((response: any) => {
        if (response && response.token && response.name) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', response.name); 
        }
        return response;
      })
    );
  }
  

// LoginService (si devuelve una promesa)
// LoginService
getUsername(): string | null {
  return localStorage.getItem('name');
}


  async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get('token');  
    return !!token;
  }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(this.apiUrl, { email, password }).pipe(
  //     map((response: any) => {
  //       if (response && response.token && response.name) {
  //         console.log('Token:', response.token);  // Verifica el token
  //         console.log('Name:', response.name);    // Verifica el nombre
  //         localStorage.setItem('token', response.token);
  //         localStorage.setItem('name', response.name); // Guarda el nombre
  //       }
  //       return response;
  //     })
  //   );
  // }
  
  // getUsername(): string | null {
  //   return localStorage.getItem('name');
  // }
  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('token');
  // }
}
