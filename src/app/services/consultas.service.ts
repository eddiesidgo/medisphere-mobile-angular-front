import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  createConsulta(data: any) {
    return this.http.post(`${this.apiUrl}/consultas`, data);
  }

  getConsulta(id: number) {
    return this.http.get(`${this.apiUrl}/consultas/${id}`);
  }

  updateConsulta(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/consultas/${id}`, data);
  }

  createReceta(data: any) {
    return this.http.post(`${this.apiUrl}/recetas`, data);
  }

  createExamen(data: any) {
    return this.http.post(`${this.apiUrl}/examenes`, data);
  }
}
