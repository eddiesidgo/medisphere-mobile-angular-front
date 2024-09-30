import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private apiUrl = 'http://127.0.0.1:8000/api/pacientes';

  constructor(private http: HttpClient) { }

  // Obtener todos los pacientes
  getPacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo paciente
  createPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${'create'}`, paciente);
  }

  // Actualizar un paciente existente
  updatePaciente(id: number, paciente: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Indicamos que estamos enviando JSON
      'Accept': 'application/json'         // Indicamos que esperamos recibir JSON
    });

    return this.http.put<any>(`${this.apiUrl}/${id}`, paciente, { headers });
  }

  // Eliminar un paciente
  deletePaciente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
