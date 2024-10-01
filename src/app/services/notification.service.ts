import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private pacienteAgregadoSource = new Subject<void>();
  pacienteAgregado$ = this.pacienteAgregadoSource.asObservable();

  private doctorAgregadoSource = new Subject<void>();
  doctorAgregado$ = this.doctorAgregadoSource.asObservable();

  notifyPacienteAgregado() {
    this.pacienteAgregadoSource.next();
  }

  notifyDoctorAgregado() {
    this.doctorAgregadoSource.next();
  }
}
