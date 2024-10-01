import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  private apiUrl = 'http://127.0.0.1:8000/api/doctores';

  constructor(private http: HttpClient) { }

  // Obtener todos los doctores
  getDoctores() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo doctor
  createDoctor(doctor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${'create'}`, doctor);
  }

  // Actualizar un doctor existente
  updateDoctor(id: number, doctor: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Indicamos que estamos enviando JSON
      'Accept': 'application/json'         // Indicamos que esperamos recibir JSON
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, doctor, {headers});
  }

  // Eliminar un doctor
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }




}
