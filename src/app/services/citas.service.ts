import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = 'http://127.0.0.1:8000/api/citas';

  constructor(private http: HttpClient) { }

  // Obtener todas las citas
  getCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
