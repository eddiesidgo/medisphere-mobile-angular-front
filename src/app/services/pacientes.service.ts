import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.put<any>(`${this.apiUrl}/${id}`, paciente);
  }

  // Eliminar un paciente
  deletePaciente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
