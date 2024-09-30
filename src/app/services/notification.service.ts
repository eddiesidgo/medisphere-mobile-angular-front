import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private pacienteAgregadoSource = new Subject<void>();
  pacienteAgregado$ = this.pacienteAgregadoSource.asObservable();

  notifyPacienteAgregado() {
    this.pacienteAgregadoSource.next();
  }
}
