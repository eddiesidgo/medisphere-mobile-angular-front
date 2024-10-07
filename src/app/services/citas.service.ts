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

  // Crear una nueva cita
  createCita(citaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${'create'}`, citaData);
  }

  // Actualizar una cita existente
  updateCita(id: number, cita: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cita);
  }
}
